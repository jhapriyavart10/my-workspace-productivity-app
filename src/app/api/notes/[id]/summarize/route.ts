import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();
    
    const note = await Note.findOne({ _id: id, userId: session.user.id });
    
    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    let aiSummary = '';

    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `You are a helpful assistant that summarizes notes. Provide a concise summary in 2-3 sentences.

Please summarize this note:

Title: ${note.title}

Content: ${note.content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiSummary = response.text() || 'Unable to generate summary';
      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
        aiSummary = 'AI summarization is currently unavailable. Please check your Gemini API key configuration.';
      }
    } else {
      // Mock AI response for demonstration
      const wordCount = note.content.split(' ').length;
      aiSummary = `This note contains ${wordCount} words about "${note.title}". It covers the main topics discussed in the content and provides key insights. This is a mock summary since no Gemini API key is configured.`;
    }

    // Update the note with the AI summary
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { aiSummary },
      { new: true }
    );

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Error summarizing note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

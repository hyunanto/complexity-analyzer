import { NextResponse } from 'next/server';
import { analyzeCodeComplexity } from '@/src/app/utils/anthropicApi';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const analysis: string = await analyzeCodeComplexity(code);
    const parsedAnalysis: object = typeof analysis === 'string' ? JSON.parse(analysis) : analysis;
    return NextResponse.json(parsedAnalysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze code' }, { status: 500 });
  }
}

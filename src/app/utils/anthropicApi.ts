import Anthropic from '@anthropic-ai/sdk';
import { Message } from '@anthropic-ai/sdk/resources';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not defined in environment variables');
}

const anthropic: Anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export const analyzeCodeComplexity: (code: string) => Promise<string> = async (code: string) => {
  try {
    const message: Message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a senior software engineer with a handful of experiences tasked with evaluating a given piece of code for its complexity and providing suggestions for improvement. Your analysis should be thorough yet simple to understand.
        
        Your task is to analyze the following code:
        ${code}

        Please follow these steps to analyze the code and provide your insights:
        1. Read through the code carefully.
        2. Analyze the code's complexity and provide:
            - Cyclomatic complexity
            - Cognitive complexity
            - Suggestions for improvement
        3. After your analysis, format your response as a JSON object with the following structure:
        {
          "cyclomatic_complexity": number,
          "cognitive_complexity": number,
          "analysis": {
            "cyclomatic_explanation": "string",
            "cognitive_explanation": "string"
          },
          "suggestions": [
            {
              "type": "string",
              "description": "string"
            }
          ],
          "current_strengths": ["string"]
        }`
        }
      ]
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
};

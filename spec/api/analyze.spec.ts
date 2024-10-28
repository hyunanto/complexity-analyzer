import { POST } from '@/src/app/api/analyze/route';
import * as anthropicApi from '@/src/app/utils/anthropicApi';

describe('Analyze API Route', () => {
  let mockAnalyzeCodeComplexity: jasmine.Spy;

  beforeEach(() => {
    mockAnalyzeCodeComplexity = spyOn(anthropicApi, 'analyzeCodeComplexity');
  });

  it('should return 400 when no code is provided', async () => {
    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Code is required');
  });

  it('should return analysis result when code is provided', async () => {
    const mockResult = {
      cyclomatic_complexity: 1,
      cognitive_complexity: 1,
      analysis: {
        cyclomatic_explanation: 'Test',
        cognitive_explanation: 'Test'
      },
      suggestions: [],
      current_strengths: []
    };

    mockAnalyzeCodeComplexity.and.returnValue(Promise.resolve(mockResult));

    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ code: 'test code' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockResult);
    expect(mockAnalyzeCodeComplexity).toHaveBeenCalledWith('test code');
  });
});

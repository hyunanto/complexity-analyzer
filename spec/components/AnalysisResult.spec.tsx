import React from 'react';
import { render } from '@testing-library/react';
import { AnalysisResult } from '@/src/app/components/AnalysisResult';

describe('AnalysisResult', () => {
  const mockAnalysisData = {
    cyclomatic_complexity: 5,
    cognitive_complexity: 3,
    analysis: {
      cyclomatic_explanation: "Test cyclomatic explanation",
      cognitive_explanation: "Test cognitive explanation"
    },
    suggestions: [
      {
        type: "readability",
        description: "Test suggestion"
      }
    ],
    current_strengths: [
      "Test strength"
    ]
  };

  it('should display all sections of the analysis', () => {
    const { getByText } = render(<AnalysisResult {...mockAnalysisData} />);

    // Check complexity metrics
    expect(getByText('5')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();

    // Check explanations
    expect(getByText('Test cyclomatic explanation')).toBeTruthy();
    expect(getByText('Test cognitive explanation')).toBeTruthy();

    // Check suggestions
    expect(getByText('Test suggestion')).toBeTruthy();
    expect(getByText('readability')).toBeTruthy();

    // Check strengths
    expect(getByText('Test strength')).toBeTruthy();
  });

  it('should apply correct badge classes for suggestion types', () => {
    const { getByText } = render(<AnalysisResult {...mockAnalysisData} />);
    
    const badge = getByText('readability');
    expect(badge.classList.contains('bg-primary')).toBe(true);
    expect(badge.classList.contains('text-white')).toBe(true);
  });
});

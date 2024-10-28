import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CodeInput } from '@/src/app/components/CodeInput';

describe('CodeInput', () => {
  let mockOnAnalyze: jasmine.Spy;

  beforeEach(() => {
    mockOnAnalyze = jasmine.createSpy('onAnalyze');
  });

  it('should render textarea and button', () => {
    const { getByPlaceholderText, getByRole } = render(
      <CodeInput onAnalyze={mockOnAnalyze} isLoading={false} />
    );

    const textarea = getByPlaceholderText('Paste your code here...');
    const button = getByRole('button');

    expect(textarea).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('should disable inputs when loading', () => {
    const { getByPlaceholderText, getByRole } = render(
      <CodeInput onAnalyze={mockOnAnalyze} isLoading={true} />
    );

    const textarea = getByPlaceholderText('Paste your code here...');
    const button = getByRole('button');

    expect(textarea.hasAttribute('disabled')).toBe(true);
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.textContent).toContain('Analyzing...');
  });

  it('should show loading spinner when loading', () => {
    const { container } = render(
      <CodeInput onAnalyze={mockOnAnalyze} isLoading={true} />
    );

    const spinner = container.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
  });

  it('should disable button when textarea is empty', () => {
    const { getByRole } = render(
      <CodeInput onAnalyze={mockOnAnalyze} isLoading={false} />
    );

    const button = getByRole('button', { name: /analyze/i });
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('should enable button when textarea has content', () => {
    const { getByPlaceholderText, getByRole } = render(
      <CodeInput onAnalyze={mockOnAnalyze} isLoading={false} />
    );

    const textarea = getByPlaceholderText('Paste your code here...');
    const button = getByRole('button', { name: /analyze/i });

    fireEvent.change(textarea, { target: { value: 'test code' } });
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('should call onAnalyze with textarea content when submitted', () => {
    const { getByPlaceholderText, getByRole } = render(
      <CodeInput onAnalyze={mockOnAnalyze} isLoading={false} />
    );

    const textarea = getByPlaceholderText('Paste your code here...');
    const button = getByRole('button', { name: /analyze/i });

    fireEvent.change(textarea, { target: { value: 'test code' } });
    fireEvent.click(button);

    expect(mockOnAnalyze).toHaveBeenCalledWith('test code');
  });
});

'use client';

import { useState } from 'react';
import { CodeInput } from '@/src/app/components/CodeInput';
import { AnalysisResult } from '@/src/app/components/AnalysisResult';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const analyzeCode: (code: string) => Promise<void> = async (code: string) => {
    try {
      setLoading(true);
      setError('');
      setResult(null);

      const response: Response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data: string = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-light py-5">
      <div className="container">
        <h1 className="text-center mb-5">Code Complexity Analyzer</h1>

        <CodeInput onAnalyze={analyzeCode} isLoading={loading} />

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Analyzing your code...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        )}

        {result && <AnalysisResult {...result} />}
      </div>
    </main>
  );
}

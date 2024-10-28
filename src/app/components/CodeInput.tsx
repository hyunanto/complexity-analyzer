import React, { useState } from 'react';

interface CodeInputProps {
  onAnalyze: (code: string) => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ onAnalyze, isLoading }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onAnalyze(code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="mb-4">
        <textarea
          className="form-control font-monospace"
          style={{
            height: '50vh',
            minHeight: '200px',
            padding: '1.5rem',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          spellCheck="false"
          rows={10}
          disabled={isLoading}
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          disabled={!code.trim() || isLoading}
          className="btn btn-primary btn-lg"
          style={{
            minWidth: '400px',
            padding: '1rem 3rem',
            fontSize: '1.25rem',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center">
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Analyzing...
            </div>
          ) : (
            'Analyze Code'
          )}
        </button>
      </div>
    </form>
  );
};

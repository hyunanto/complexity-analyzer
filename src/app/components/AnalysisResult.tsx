import React from 'react';

interface Suggestion {
  type: string;
  description: string;
}

export interface AnalysisResponse {
  cyclomatic_complexity: number;
  cognitive_complexity: number;
  analysis: {
    cyclomatic_explanation: string;
    cognitive_explanation: string;
  };
  suggestions: Array<Suggestion>;
  current_strengths: Array<string>;
}

export const AnalysisResult: React.FC<AnalysisResponse> = (result) => {
  const getSuggestionBadgeClass: (type: string) => string = (type: string): string => {
    switch (type) {
      case 'readability':
        return 'bg-primary text-white';
      case 'validation':
        return 'bg-warning text-dark';
      case 'naming':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title h4 mb-4">Analysis Result</h2>

          {/* Complexity Metrics */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="h5">Cyclomatic Complexity</h3>
                  <p className="display-4 text-primary">{result.cyclomatic_complexity}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="h5">Cognitive Complexity</h3>
                  <p className="display-4 text-success">{result.cognitive_complexity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Explanations */}
          <div className="mb-4">
            <h3 className="h5 mb-3">Analysis Explanation</h3>
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="h6 text-muted">Cyclomatic:</h4>
                <p>{result.analysis.cyclomatic_explanation}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h4 className="h6 text-muted">Cognitive:</h4>
                <p>{result.analysis.cognitive_explanation}</p>
              </div>
            </div>
          </div>

          {/* Current Strengths */}
          <div className="mb-4">
            <h3 className="h5 mb-3">Current Strengths</h3>
            <ul className="list-group">
              {result.current_strengths.map((strength, index) => (
                <li key={index} className="list-group-item text-success">
                  <i className="bi bi-check-circle me-2"></i>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="h5 mb-3">Suggestions for Improvement</h3>
            <div className="accordion" id="suggestionsAccordion">
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <span className={`badge ${getSuggestionBadgeClass(suggestion.type)} me-2`}>{suggestion.type}</span>
                    </div>
                    <p className="mb-0">{suggestion.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

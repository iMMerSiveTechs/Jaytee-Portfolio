import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--theme-bg0)' }}>
          <div className="max-w-md text-center">
            <div
              className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-xl"
              style={{ background: 'rgba(251,113,133,0.08)', border: '1px solid rgba(251,113,133,0.2)' }}
            >
              <span style={{ color: '#fb7185', fontSize: '1.25rem' }}>!</span>
            </div>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--theme-text)' }}>Something went wrong</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--theme-text-subtle)' }}>
              An unexpected error occurred. This has been logged. You can try refreshing the page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{
                  background: 'var(--theme-surface-hover)',
                  border: '1px solid var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              >
                Try again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{
                  background: 'var(--theme-text)',
                  color: 'var(--theme-bg0)',
                }}
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

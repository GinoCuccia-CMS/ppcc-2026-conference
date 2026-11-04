import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

// Shows a readable error on the stage instead of a blank screen when a scene crashes.
export class ErrorBoundary extends Component<{ children: ReactNode; onReset: () => void }, { error?: Error }> {
  state: { error?: Error } = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Scene crashed', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40, boxSizing: 'border-box', textAlign: 'center' }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: '#a8305a' }}>GAME OVER… (something broke)</div>
        <div role="alert" style={{ fontSize: 16, fontWeight: 700, maxWidth: 700 }}>{error.message}</div>
        <button type="button" className="btn pill" style={{ position: 'static' }}
          onClick={() => { this.setState({ error: undefined }); this.props.onReset(); }}>
          Back to start
        </button>
      </div>
    );
  }
}

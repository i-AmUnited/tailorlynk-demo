import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
            <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">
              Something went wrong. We're working on it.
            </p>
            <button
              className="mt-6 p-2 px-4 bg-blue-600 text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

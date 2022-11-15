import React from 'react';

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component {
  public readonly state: State = {
    hasError: false,
  };

  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary componentDidCatch', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

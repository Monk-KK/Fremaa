import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthContextProvider } from "context";
import { MaterialUIControllerProvider } from "context";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <AuthContextProvider>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </AuthContextProvider>
    </ErrorBoundary>
  </BrowserRouter>
);

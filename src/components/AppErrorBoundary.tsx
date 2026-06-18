import { Component, ErrorInfo, ReactNode } from "react";
import { AppFallback } from "./AppFallback";
import { isStaleAssetError, recoverFromStaleAssets } from "@/lib/staleAssetRecovery";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  error: Error | null;
  isRecovering: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    error: null,
    isRecovering: false,
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      error,
      isRecovering: isStaleAssetError(error) && recoverFromStaleAssets(),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (!isStaleAssetError(error)) {
      console.error("CentrLP route render error", error, errorInfo);
    }
  }

  render() {
    if (this.state.isRecovering) {
      return <AppFallback kind="recovering" />;
    }

    if (this.state.error) {
      return <AppFallback kind="error" />;
    }

    return this.props.children;
  }
}

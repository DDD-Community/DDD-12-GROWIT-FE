interface Window {
  /**
   * React Native WebView에서 주입하는 객체
   */
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}

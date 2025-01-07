self.onmessage = (event: MessageEvent) => {
  const code = event.data;
  try {
    const result = new Function(code)();
    self.postMessage({ success: true, result });
  } catch (error) {
    self.postMessage({ success: false, error: (error as Error).message });
  }
};

export default self;

export const formatErrorMessage = (file: string, method: string, error: Error) => {
    return `[${file}::${method}] ${error.name} - ${error.message}`;
  };
  
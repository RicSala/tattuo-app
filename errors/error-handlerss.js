// FRONTEND ERROR HANDLING
export const handleFrontendError = (error, showToast) => {
  // Log the error to your logging service
  // logErrorToService(error);

  // Display a user-friendly error message
  showToast(error);
};

// DB SERVICES ERROR HANDLING
export function withTryCatch(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(`Error in ${fn.name}:`, error);
      throw error;
    }
  };
}

// API ROUTES ERROR HANDLING - ON TOP OF DB SERVICES ERROR HANDLING

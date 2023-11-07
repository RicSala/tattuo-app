// handleError.js
export const handleError = (error, showToast) => {
  // Log the error to your logging service
  // logErrorToService(error);

  console.log("HERE", error.logMessage, error);

  // Display a user-friendly error message
  showToast(error);
};

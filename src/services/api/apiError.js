export function getApiErrorMessage(error) {
  if (error.response) {
    return (
      error.response.data?.message ||
      'Something went wrong. Please try again.'
    )
  }

  if (error.request) {
    return 'Unable to connect to the server. Please check your connection.'
  }

  return error.message || 'An unexpected error occurred.'
}
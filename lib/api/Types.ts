type ApiResponseSuccess<T> = {
  success: true;
  data: T;
};

type ApiResponseError = {
  success: false;
  errors?: string[];
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

/**
 * Typegoard function to check if response is success
 */
export const isResponseSuccess = <T>(response: ApiResponse<T>): response is ApiResponseSuccess<T> => {
  return response.success === true;
};

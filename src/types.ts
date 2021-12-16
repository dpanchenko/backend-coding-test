export interface IErrorResponse {
  error_code: string;
  message: string;
}

export interface IValidationResult {
  valid: boolean;
  message?: string;
}

type HttpStatusCode = 200 | 400 | 401 | 404 | 500; // Extend as needed

interface ApiError {
  code?: string; // Application-specific error code
  message?: string;
  details?: any; // Optional detailed error information
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface ApiResponse<T, E = ApiError> {
  statusCode: HttpStatusCode;
  message?: string;
  data?: T;
  error?: E;
  meta?: any; // Additional metadata
  pagination?: PaginationInfo;
}

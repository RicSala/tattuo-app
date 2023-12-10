import { UseFormReturn } from "react-hook-form";

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

export interface inviteFormData {
  studioId: string;
  invites: {
    label: string;
    value: string;
    id: string;
  }[];
}

// T with U
type WithProperty<T, K extends PropertyKey, V> = T & { [P in K]: V };

export type UserFormReturnType = UseFormReturn<any, any, undefined>;

type searchParams = {
  cityId?: string;
  name?: string;
  userId?: string;
  slug?: string;
  id?: string;
  style?: string;
  freeSearch?: string;
  city?: string;
  unclaimed?: string;
  styles?: string;
};

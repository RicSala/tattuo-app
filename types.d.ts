import {
  ArtistProfile,
  BodyPart,
  Style,
  Tag,
  TaggedTattoo,
  Tattoo,
} from "@prisma/client";
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

export interface ApiResponse<
  T = undefined,
  A = "CREATE" | "UPDATE" | "DELETE" | "INVITE" | "EXIT",
  E = ApiError,
> {
  statusCode: HttpStatusCode;
  message?: string;
  data: T | undefined;
  ok: boolean;
  error?: E;
  meta?: any; // Additional metadata
  pagination?: PaginationInfo;
}

export type ApiRequestBody<
  T = undefined,
  A = "CREATE" | "UPDATE" | "DELETE" | "INVITE" | "EXIT",
> = {
  data?: T;
  action?: A;
};

export interface inviteFormBody {
  studioId: string;
  invites: {
    label: string;
    value: string;
    id: string;
  }[];
}

export interface InviteFormBody {
  inviteId: string;
}

export interface ExitFormBody {
  artistId: string;
  studioId: string;
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

export type PageType = "ARTIST" | "STUDIO" | "CITY" | "STYLE" | "CONTENT";

export type TTattooWDTagsWStylesWBodyPartWArtistProfile = WithProperty<
  WithProperty<
    WithProperty<
      WithProperty<Tattoo, "tags", WithProperty<TaggedTattoo, "tag", Tag>[]>,
      "styles",
      Style[]
    >,
    "bodyPart",
    BodyPart
  >,
  "artistProfile",
  ArtistProfile
>;

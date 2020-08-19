export interface IHomeState {
  userDetails: IUserDetails[];
  isLoading: boolean;
  userPhotos: IUserPhotos[];
}

export interface IUserDetails {
  firstName: null | string;
  first_name: null | string;
  profile_image: IProfileImage;
  location: null | string;
  username: string;
}

export interface IUserPhotos {
  id: string;
  urls: IUrls;
}

export interface IUrls {
  raw: string;
  full: string;
  regular: string;
}

export interface IProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface IResponse {
  total: number;
  totalPages: number;
  results: IResults;
}

export interface IResults {
  first_name: string;
  last_name: string;
  profile_image: string;
  location: string;
}

export interface IRequest {
  search: string;
}

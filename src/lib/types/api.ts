/**
 * API request and response interfaces
 */

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  message: string;
  refresh_token: string;
  user: {
    id: number;
    is_moderator: boolean;
    name: string;
  };
}

export interface AddObservationRequest {
  // TODO add file
  comet_id: number;
  declination: string;
  rightAscension: string;
}

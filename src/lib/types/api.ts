/**
 * API request and response interfaces
 */

export interface RegisterRequest {
  username?: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Credentials {
  username?: string;
  email: string;
  password: string;
}

export interface AddObservationRequest {
  // TODO add file
  comet_id: number;
  declination: string;
  rightAscension: string;
}

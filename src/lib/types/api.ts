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

export interface AddObservationRequest {
  // TODO add file
  comet_id: number;
  declination: string;
  rightAscension: string;
}

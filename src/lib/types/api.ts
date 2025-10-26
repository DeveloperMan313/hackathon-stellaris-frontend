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

export interface ObservationData {
  declination: number;
  rightAscension: number;
  timestamp: number;
  photo: string;
}

export interface CometData {
  id: number;
  name: string;
  observations: Array<ObservationData>;
}

export interface CometsResponse {
  comets: Array<CometData>;
}

export interface CreateCometRequest {
  name: string;
  observations: Array<ObservationData>;
}

export interface GetCometRequest {
  id: number;
}

export type GetCometResponse = CometData;

export interface AddObservationRequest {
  // TODO add file
  comet_id: number;
  declination: string;
  rightAscension: string;
}

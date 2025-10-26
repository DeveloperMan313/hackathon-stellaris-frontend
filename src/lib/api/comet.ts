import type {
  CometsResponse,
  CreateCometRequest,
  GetCometRequest,
  GetCometResponse,
} from "$lib/types";
import { ApiClient } from "./client";

export const CometApi = {
  /**
   * Create comet
   * @param {CreateCometRequest} request - request object
   * @returns {Promise<object>} - API response
   */
  async create(request: CreateCometRequest): Promise<object> {
    return ApiClient.fetchJSON(
      "/comets",
      {
        method: "POST",
        body: JSON.stringify(request),
      },
      true,
    );
  },

  /**
   * Get all comets
   * @returns {Promise<CometsResponse>} - API response
   */
  async getAll(): Promise<CometsResponse> {
    return ApiClient.fetchJSON(
      "/comets",
      {
        method: "GET",
        headers: {},
      },
      true,
    );
  },

  /**
   * Get comet by id
   * @param {GetCometRequest} request - request object
   * @returns {Promise<GetCometResponse>} - API response
   */
  async getComet(request: GetCometRequest): Promise<GetCometResponse> {
    return ApiClient.fetchJSON(
      `/comets/${request.id}`,
      {
        method: "GET",
        headers: {},
      },
      true,
    );
  },
};

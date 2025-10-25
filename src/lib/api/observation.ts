import type { AddObservationRequest } from "$lib/types";
import { ApiClient } from "./client";

export const ObservationApi = {
  /**
   * Add observation to comet
   * @param {AddObservationRequest} request - request object
   * @returns {Promise<object>} - API response
   */
  async addObservation(request: AddObservationRequest): Promise<object> {
    return ApiClient.fetchJSON("/observation", {
      method: "POST",
      body: JSON.stringify(request),
    });
  },
};

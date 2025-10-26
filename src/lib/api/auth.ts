import { ApiClient } from "./client";
import type { RegisterRequest, LoginRequest, LoginResponse } from "$lib/types";

export const AuthApi = {
  /**
   * Get auth info
   * @returns {Promise<object>} - API response
   */
  async getAuth(): Promise<object> {
    return ApiClient.fetchJSON(
      "/users",
      {
        method: "GET",
        headers: {},
      },
      true,
    );
  },

  /**
   * Register a new user
   * @param {RegisterRequest} request - request object
   * @returns {Promise<object>} - API response
   */
  async register(request: RegisterRequest): Promise<object> {
    return ApiClient.fetchJSON("/users/register", {
      method: "POST",
      body: JSON.stringify(request),
    });
  },

  /**
   * Log in to user account
   * @param {LoginRequest} request - request object
   * @returns {Promise<LoginResponse>} - API response with tokens
   */
  async logIn(request: LoginRequest): Promise<LoginResponse> {
    const response = await ApiClient.fetchJSON("/users/login", {
      method: "POST",
      body: JSON.stringify(request),
    });

    if (response.access_token && response.refresh_token) {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
    }

    return response;
  },

  /**
   * Log out of user account
   * @returns {Promise<object>} - API response
   */
  async logOut(): Promise<object> {
    // Clear tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    return ApiClient.fetchJSON(
      "/users/logout",
      {
        method: "POST",
        headers: {},
      },
      true,
    );
  },
};

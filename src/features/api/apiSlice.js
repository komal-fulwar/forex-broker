import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// On 401, clear auth state — ProtectedRoute will redirect to /auth automatically
const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthCheck,
  tagTypes: ["TradingAccounts", "Profile", "KycStep1"],
  endpoints: (builder) => ({
    // Global endpoints go here.
    // Feature-specific endpoints will be injected in their respective slices
  }),
});

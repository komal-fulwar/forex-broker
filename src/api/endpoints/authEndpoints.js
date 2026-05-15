/**
 * Auth endpoint definitions.
 * Imported and injected into the RTK Query apiSlice via authApi.js.
 */

export const authEndpointDefs = (builder) => ({
  login: builder.mutation({
    query: (credentials) => ({
      url: "/users/auth/login",
      method: "POST",
      body: credentials,
    }),
  }),

  // Step 1: submit registration form → triggers OTP email
  registerRequest: builder.mutation({
    query: (body) => ({
      url: "/users/auth/register-request",
      method: "POST",
      body,
    }),
  }),

  // Step 2: verify OTP token sent to email
  verifyOtp: builder.mutation({
    query: ({ token }) => ({
      url: `/users/auth/verify?token=${token}`,
      method: "GET",
    }),
  }),
});

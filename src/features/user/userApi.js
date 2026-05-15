import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/users/user-profile/profile",
      providesTags: ["Profile"],
    }),

    // KYC Step 1 — check if contact is already verified
    getKycStep1Status: builder.query({
      query: () => "/users/user-profile/kyc/step1-status",
      providesTags: ["KycStep1"],
    }),

    // KYC Step 1 — submit email + phone → triggers OTP email
    submitKycContact: builder.mutation({
      query: (body) => ({
        url: "/users/user-profile/kyc/submit-contact",
        method: "POST",
        body,
      }),
    }),

    // KYC Step 1 — verify OTP
    verifyKycContact: builder.mutation({
      query: (body) => ({
        url: "/users/user-profile/kyc/verify-contact",
        method: "POST",
        body,
      }),
      invalidatesTags: ["KycStep1", "Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetKycStep1StatusQuery,
  useSubmitKycContactMutation,
  useVerifyKycContactMutation,
} = userApi;

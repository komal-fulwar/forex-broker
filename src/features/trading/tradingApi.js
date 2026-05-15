import { apiSlice } from "../api/apiSlice";

export const tradingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/users/plans/all",
    }),
    getMyAccounts: builder.query({
      query: () => "/users/trading/my-accounts",
      providesTags: ["TradingAccounts"],
    }),
    createTradingAccount: builder.mutation({
      query: (body) => ({
        url: "/users/trading/create-account",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TradingAccounts"],
    }),
    updateTradingPassword: builder.mutation({
      query: (body) => ({
        url: "/users/trading/update-password",
        method: "PATCH",
        body,
      }),
    }),
    updateNickname: builder.mutation({
      query: (body) => ({
        url: "/users/trading/update-nickname",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TradingAccounts"],
    }),
    updateLeverage: builder.mutation({
      query: (body) => ({
        url: "/users/trading/update-leverage",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TradingAccounts"],
    }),
    toggleArchive: builder.mutation({
      query: (body) => ({
        url: "/users/trading/archive",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TradingAccounts"],
    }),
    resetDemoFunds: builder.mutation({
      query: (body) => ({
        url: "/users/trading/demo/reset-funds",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TradingAccounts"],
    }),
    updateDemoFunds: builder.mutation({
      query: (body) => ({
        url: "/users/trading/demo/update-funds",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TradingAccounts"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetMyAccountsQuery,
  useCreateTradingAccountMutation,
  useUpdateTradingPasswordMutation,
  useUpdateNicknameMutation,
  useUpdateLeverageMutation,
  useToggleArchiveMutation,
  useResetDemoFundsMutation,
  useUpdateDemoFundsMutation,
} = tradingApi;

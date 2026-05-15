import { apiSlice } from "../api/apiSlice";
import { authEndpointDefs } from "../../api/endpoints/authEndpoints";
import { setCredentials } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    const defs = authEndpointDefs(builder);

    return {
      login: {
        ...defs.login,
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(
              setCredentials({
                user: data.user,
                accessToken: data.tokens.access.token,
                refreshToken: data.tokens.refresh.token,
              }),
            );
          } catch {
            // errors handled by the component
          }
        },
      },

      registerRequest: defs.registerRequest,
      verifyOtp: defs.verifyOtp,
    };
  },
});

export const {
  useLoginMutation,
  useRegisterRequestMutation,
  useVerifyOtpMutation,
} = authApi;

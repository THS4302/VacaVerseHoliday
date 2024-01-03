interface AuthState {
  user: {
    // Define the structure of your 'user' object here
  } | null;
  isFetching: boolean;
  error: boolean;
}

const AuthReducer = (
  state: AuthState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    // case "FOLLOW":
    //   return {
    //     ...state,
    //     user: {
    //       ...(state.user as any),
    //       followings: [...(state.user?.followings || []), action.payload],
    //     },
    //   };
    // case "UNFOLLOW":
    //   return {
    //     ...state,
    //     user: {
    //       ...(state.user as any),
    //       followings: (state.user?.followings || []).filter(
    //         (following) => following !== action.payload
    //       ),
    //     },
    //   };
    default:
      return state;
  }
};

export default AuthReducer;

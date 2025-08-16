import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const res = await axios.post("/api/auth/register", userData, {
      withCredentials: true, // important for HttpOnly cookie
    });
    dispatch(
      loginSuccess({
        user: res.data.user,
        accessToken: res.data.accessToken,
      })
    );
  } catch (err) {
    dispatch(loginFailure(err.response?.data?.error || "Registration failed"));
  }
};

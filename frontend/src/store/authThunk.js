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

export const loginUser = ({ email, password }) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const res = await axios.post(
            "/api/auth/login",
            { email, password },
            { withCredentials: true }
        );
        if (res?.data?.accessToken) {
            const userRes = await axios.get("/api/auth/getLoggedInUser", {
                headers: { Authorization: `Bearer ${res?.data?.accessToken}` },
                withCredentials: true,
            });
            dispatch(
                loginSuccess({
                    user: userRes.data,
                    accessToken: res?.data?.accessToken,
                })
            );
        }
    } catch (err) {
    }
};

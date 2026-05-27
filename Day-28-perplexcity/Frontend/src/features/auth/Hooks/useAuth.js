import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../services/auth.api";
import {
  setUser,
  setLoading,
  setError,
  setAuthChecked,
  clearError,
} from "../auth.slice";
import toast from "react-hot-toast";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    try {
      dispatch(setLoading(true));
      await register({ username, email, password });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      dispatch(setAuthChecked(true));
      toast.success("Logged in successfully");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setUser(null));
      dispatch(
        setError(error.response?.data?.message || "failed to fetch user"),
      );
    } finally {
      dispatch(setAuthChecked(true));
      dispatch(setLoading(false));
    }
  }

  async function handleLogout(params) {
    try {
      await logout();
      toast.success("Logged out");
    } catch (err) {
        toast.error(error.response?.data?.message || "Logout failed");
        console.error("Logout failed:", err);
    } finally {
      dispatch(setUser(null));
      // dispatch(setAuthChecked(false))
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
}

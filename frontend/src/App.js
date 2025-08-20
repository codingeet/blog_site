import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import WriteBlog from "./pages/WriteBlog";
import DetailBlog from "./pages/DetailBlog";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, refreshAccessToken } from "./store/authSlice.js";
import axios from "axios";




function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    const reloadUser = async () => {
      try {
     const accessToken = await dispatch(refreshAccessToken()).unwrap();
      // 2. Get user info using new access token
      const userRes = await axios.get("/api/auth/getLoggedInUser", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
       // 3. Save user + token into Redux
      dispatch(
        loginSuccess({
          user: userRes.data,
          accessToken,
        })
      );
      } catch (err) {
        console.error("Reload failed:", err);
        dispatch(logout());
      }
    };
    reloadUser();
  }, [dispatch]);



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/login" element={<Login />} />
        {/* Optional: Dynamic route */}
        <Route path="/blogs/:id" element={<DetailBlog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

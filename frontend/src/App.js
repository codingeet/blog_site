import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import WriteBlog from "./pages/WriteBlog";
import DetailBlog from "./pages/DetailBlog";
import Login from "./pages/Login";




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/login" element={<Login/>} />
        {/* Optional: Dynamic route */}
        <Route path="/blogs/:id" element={<DetailBlog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

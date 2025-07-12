import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";

function App() {
  return (
  <BrowserRouter>
      <Header/>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          {/* Optional: Dynamic route */}
          {/* <Route path="/blogs/:id" element={<BlogDetail />} /> */}
        </Routes>
      <Footer/>
   </BrowserRouter>
  );
}

export default App;

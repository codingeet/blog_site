import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
  <BrowserRouter>
      <Header/>
      <Home />
      <Footer/>
   </BrowserRouter>
  );
}

export default App;

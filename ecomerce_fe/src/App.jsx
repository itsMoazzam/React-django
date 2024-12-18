import Navbar from "./Component/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
// import "bootstrap/dist/css/bootstrap.min.css";
import Electronics from "./Component/categories/category/Electronics";
import Category from "./Component/Category";
import Products from "./Component/categories/Products";
import Beaut from "./Component/categories/category/Beaut";
import Sports from "./Component/categories/category/Sports";
import Clothes from "./Component/categories/category/Clothes";
import "./App.css";
import LoginPage from "./Component/LoginPage";
import Banner from "./Component/Banner";
import Footer from "./Component/Footer";
function App() {
  return (
    <>
      <Navbar />

      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/beauty" element={<Beaut />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

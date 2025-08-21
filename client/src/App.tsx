import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/shared/Navbar";
import { Toaster } from "./components/ui/sonner";
import Orders from "./pages/Orders"; 
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
const App = () => {
  // return <div>Hello Client</div>;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} /> 
        <Route path="/products/:category" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App

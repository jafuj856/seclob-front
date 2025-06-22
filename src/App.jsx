import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegisterPage from "./auth/RegisterPage";
import Login from "./auth/Login";
import TopBar from "./components/navbar/TopBar";
import Home from "./pages/home/Home";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/productDetail" element={<ProductDetailPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

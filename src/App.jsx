import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ProductPage from "./pages/products/ProductPage";
import ProductsDetails from "./pages/productsDetails/ProductsDetails";
import { Navigate } from "react-router-dom";
import Spinner from "./ui/Spinner/Spinner";
import ErrorPage from "./ui/Errorpage/ErrorPage";
import AddProductPage from "./pages/AddProduct/AddProductPage";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/error" element={<ErrorPage />} /> */}
        {/* <Route path="/spinner" element={<Spinner />} /> */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductsDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

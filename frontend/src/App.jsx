import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import MyProductsPage from "./pages/MyProductsPage"
import CreatePage from "./pages/CreatePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { useColorModeValue } from "@/components/ui/color-mode"
import { Toaster } from "@/components/ui/toaster"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useEffect } from "react";
import { useUserStore } from "@/store/user";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageProducts from "./pages/ManageProducts";

function App() {
  const checkAuth = useUserStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Box minH="100vh" px={4} bg={useColorModeValue("gray.100", "gray.900") }>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-products" element={<ProtectedRoute><MyProductsPage /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute requiredRole="admin"><ManageProducts /></ProtectedRoute>} />
        </Routes>        
        <Footer />
      </Box>
    </>
  )
}

export default App

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Notification from "./components/Notification";
import BackendStatus from "./components/BackendStatus";
import DemoLogin from "./components/DemoLogin";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Impact from "./components/Impact";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import Dashboard from "./dashboard/Dashboard";
import BrowseItems from "./dashboard/pages/BrowseItems";
import MyItems from "./dashboard/pages/MyItems";
import AddItem from "./dashboard/pages/AddItem";
import MySwaps from "./dashboard/pages/MySwaps";
import Messages from "./dashboard/pages/Messages";
import Profile from "./dashboard/pages/Profile";
import ItemDetails from "./dashboard/pages/ItemDetails";
import ProtectedRoute from "./dashboard/components/ProtectedRoute";
import AIDashboard from "./components/AIDashboard";

const LandingPage = () => (
  <div className="text-gray-800">
    <Navbar />
    <main>
      <Hero />
      <About />
      <HowItWorks />
      <Impact />
      <Testimonials />
    </main>
    <Footer />
  </div>
);

export default function App() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/browse" element={
            <ProtectedRoute>
              <BrowseItems />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/my-items" element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/add-item" element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/my-swaps" element={
            <ProtectedRoute>
              <MySwaps />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/item/:id" element={
            <ProtectedRoute>
              <ItemDetails />
            </ProtectedRoute>
          } />
          <Route path="/ai-dashboard" element={<AIDashboard />} />
        </Routes>
        
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-modal space-y-2">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>
        
        {/* Backend Status */}
        <BackendStatus />
        
        {/* Demo Login */}
        <DemoLogin />
      </Router>
    </AuthProvider>
  );
}
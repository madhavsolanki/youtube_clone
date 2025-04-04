import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetail from "./components/VideoDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "./components/auth/AuthForm";
import ProtectedRoute from "./components/auth/ProtectedRoute ";
import Dashboard from "./components/auth/Dashboard";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-full">
        <ToastContainer position="top-right" autoClose={2000}/>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute> } />
        <Route path="/searchResult/:searchQuery" element={<ProtectedRoute><SearchResult /></ProtectedRoute> } />
        <Route path="/video/:id" element={ <ProtectedRoute><VideoDetail /></ProtectedRoute>} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
    </div>
  );
}

export default App;

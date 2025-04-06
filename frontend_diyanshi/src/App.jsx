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
import EditProfilePage from "./pages/EditProfilePage";
import CustomizeChannelPage from "./pages/CustomizeChannelPage";
import ProfilePage1 from "./pages/ProfilePage1";
import ShortsPage from "./pages/shorts";



import ChannelOverview from "./pages/ChannelOverview";



function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-full">
         <ToastContainer position="top-right" autoClose={2000}/>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>  } />
        <Route path="/searchResult/:searchQuery" element={<ProtectedRoute><SearchResult /> </ProtectedRoute>} />
        <Route path="/video/:id" element={ <ProtectedRoute> <VideoDetail /></ProtectedRoute> } />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        <Route path="/channel" element={<ProtectedRoute><CustomizeChannelPage/></ProtectedRoute>}/> 
      <Route path="/profile" element={<ProtectedRoute><ProfilePage1/></ProtectedRoute>}/> 
      <Route path="/shorts" element={<ProtectedRoute><ShortsPage/></ProtectedRoute>}/>
      <Route path="/dummy" element={<ChannelOverview/>}/>


      {/* Auth route */}
      <Route path="/register" element={<AuthForm />} />
      </Routes>  
   

      
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Upload from "../pages/Upload";
import Summary from "../pages/Summary";
import Diversity from "../pages/diversity";
import TAT from "../pages/TAT";
import OfferDropped from "../pages/OfferDropped";
import Joined from "../pages/Joined";
import DecisionIntelligence from "../pages/DecisionIntelligence";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
<Route
  path="/upload"
  element={
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  }
/>

<Route
  path="/summary"
  element={
    <ProtectedRoute>
      <Summary />
    </ProtectedRoute>
  }
/>
<Route
  path="/diversity"
  element={
    <ProtectedRoute>
      <Diversity />
    </ProtectedRoute>
  }
/>
<Route
  path="/tat"
  element={
    <ProtectedRoute>
      <TAT />
    </ProtectedRoute>
  }
/>
<Route
  path="/offer-dropped"
  element={
    <ProtectedRoute>
      <OfferDropped />
    </ProtectedRoute>
  }
/>    
   <Route
  path="/joined"
  element={
    <ProtectedRoute>
      <Joined />
    </ProtectedRoute>
  }
/>       
<Route
  path="/decision-intelligence"
  element={
    <ProtectedRoute>
      <DecisionIntelligence />
    </ProtectedRoute>
  }
/> 
        </Routes>
    </BrowserRouter>
  );
}
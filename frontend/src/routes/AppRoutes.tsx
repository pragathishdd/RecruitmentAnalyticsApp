import { BrowserRouter, Routes, Route } from "react-router-dom";

import Upload from "../pages/Upload";
import Summary from "../pages/Summary";
import Diversity from "../pages/diversity";
import TAT from "../pages/TAT";
import OfferDropped from "../pages/OfferDropped";
import Joined from "../pages/Joined";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/diversity" element={<Diversity />}/>
        <Route path="/tat" element={<TAT />} />
        <Route path="/offer-dropped" element={<OfferDropped />} />
        <Route path="/joined" element={<Joined />} />
      </Routes>
    </BrowserRouter>
  );
}
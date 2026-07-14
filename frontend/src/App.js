import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Detect from "./pages/Detect";
import Dashboard from "./pages/Dashboard";
import ExplainAI from "./pages/ExplainAI";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/detect" element={<Detect />} />

        <Route path="/dashboard" element={<Dashboard />} />

   

        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<History />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
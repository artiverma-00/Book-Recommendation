import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:isbn" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
// import ProductPage from "./routes/ProductPage";
import Navbar from "./components/ui/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/product/:slug" element={<ProductPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

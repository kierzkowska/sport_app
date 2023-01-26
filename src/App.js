import "./App.css";
import MainApp from "./components/MainApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subpage from "../src/components/subpage/Subpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/step" element={<MainApp />} />
        <Route path="/" element={<MainApp />} />
        <Route path="/:id/*" element={<Subpage />} />
      </Routes>
    </Router>
  );
}

export default App;

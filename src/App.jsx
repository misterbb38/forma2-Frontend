import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Assurez-vous que le chemin correspond à l'emplacement de votre fichier Home.jsx
import List from "./pages/List"; // Assurez-vous que le chemin correspond à l'emplacement de votre fichier List.jsx

function App() {
  return (
    <Router>
      <div className="min-h-screen ">
        <Routes>
          {/* Route principale qui affiche la page Home */}
          <Route path="/" element={<Home />} />

          {/* Route pour afficher la page List */}
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

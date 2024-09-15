// import { Link, useLocation } from "react-router-dom";

// const Navigation = () => {
//   const location = useLocation();

//   return (
//     <div className="flex justify-center mt-4">
//       <div className="flex space-x-4 bg-gray-200 p-2 rounded-full">
//         <Link
//           to="/"
//           className={`px-4 py-2 rounded-full ${
//             location.pathname === "/"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-300 text-black"
//           }`}
//         >
//           Home
//         </Link>
//         <Link
//           to="/list"
//           className={`px-4 py-2 rounded-full ${
//             location.pathname === "/list"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-300 text-black"
//           }`}
//         >
//           Liste
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navigation;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleListClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = "77557755"; // Mot de passe attendu

    if (password === correctPassword) {
      setShowPasswordModal(false);
      navigate("/list"); // Rediriger vers la page Liste si le mot de passe est correct
    } else {
      setErrorMessage("Mot de passe incorrect");
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="flex space-x-4 bg-gray-200 p-2 rounded-full">
        <Link
          to="/"
          className={`px-4 py-2 rounded-full ${
            location.pathname === "/"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Форма
        </Link>
        <button
          className={`px-4 py-2 rounded-full ${
            location.pathname === "/list"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={handleListClick}
        >
          Лист
        </button>
      </div>

      {/* Modal pour demander le mot de passe */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Saisir le mot de passe</h2>
            <input
              type="password"
              className="input input-bordered w-full mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            />
            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}
            <button
              className="btn btn-primary mr-2"
              onClick={handlePasswordSubmit}
            >
              Valider
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPasswordModal(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;

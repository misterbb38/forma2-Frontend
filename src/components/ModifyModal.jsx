import { useState } from "react";
import PropTypes from "prop-types"; // Import de PropTypes pour la validation des props

const ModifyModal = ({ form, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...form });
  const [passportFile, setPassportFile] = useState(null); // Nouveau state pour le fichier passport
  const [registrationFile, setRegistrationFile] = useState(null); // Nouveau state pour le fichier registration
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "passport") {
      setPassportFile(e.target.files[0]);
    } else if (e.target.name === "registration") {
      setRegistrationFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("prenom", formData.prenom);
    data.append("surnom", formData.surnom);
    data.append("telephone", formData.telephone);
    data.append("email", formData.email);
    if (passportFile) {
      data.append("passport", passportFile); // Ajouter le fichier passport
    }
    if (registrationFile) {
      data.append("registration", registrationFile); // Ajouter le fichier registration
    }

    try {
      await fetch(`${apiUrl}/api/forms/${form._id}`, {
        method: "PUT",
        body: data,
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Изменить форму</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="surnom">Surnom</label>
            <input
              type="text"
              name="surnom"
              value={formData.surnom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="passport">Passport</label>
            <input
              type="file"
              name="passport"
              onChange={handleFileChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="registration">Registration</label>
            <input
              type="file"
              name="registration"
              onChange={handleFileChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Сохранить изменения
            </button>
            <button onClick={onClose} className="btn">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Validation des props avec PropTypes
ModifyModal.propTypes = {
  form: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nom: PropTypes.string,
    prenom: PropTypes.string,
    surnom: PropTypes.string,
    telephone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired, // Validation de l'objet form et ses propriétés
  onClose: PropTypes.func.isRequired, // Validation que onClose est une fonction
  onUpdate: PropTypes.func.isRequired, // Validation que onUpdate est une fonction
};

export default ModifyModal;

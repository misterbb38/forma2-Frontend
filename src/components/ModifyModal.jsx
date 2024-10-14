// import { useState } from "react";
// import PropTypes from "prop-types"; // Import de PropTypes pour la validation des props

// const ModifyModal = ({ form, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({ ...form });
//   const [passportFile, setPassportFile] = useState(null); // Nouveau state pour le fichier passport
//   const [registrationFile, setRegistrationFile] = useState(null); // Nouveau state pour le fichier registration
//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.name === "passport") {
//       setPassportFile(e.target.files[0]);
//     } else if (e.target.name === "registration") {
//       setRegistrationFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("nom", formData.nom);
//     data.append("prenom", formData.prenom);
//     data.append("surnom", formData.surnom);
//     data.append("telephone", formData.telephone);
//     data.append("email", formData.email);
//     if (passportFile) {
//       data.append("passport", passportFile); // Ajouter le fichier passport
//     }
//     if (registrationFile) {
//       data.append("registration", registrationFile); // Ajouter le fichier registration
//     }

//     try {
//       await fetch(`${apiUrl}/api/forms/${form._id}`, {
//         method: "PUT",
//         body: data,
//       });
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error("Error updating form:", error);
//     }
//   };

//   return (
//     <div className="modal modal-open">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">Изменить форму</h3>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="nom">Nom</label>
//             <input
//               type="text"
//               name="nom"
//               value={formData.nom}
//               onChange={handleInputChange}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="prenom">Prénom</label>
//             <input
//               type="text"
//               name="prenom"
//               value={formData.prenom}
//               onChange={handleInputChange}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="surnom">Surnom</label>
//             <input
//               type="text"
//               name="surnom"
//               value={formData.surnom}
//               onChange={handleInputChange}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="telephone">Téléphone</label>
//             <input
//               type="text"
//               name="telephone"
//               value={formData.telephone}
//               onChange={handleInputChange}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="passport">Passport</label>
//             <input
//               type="file"
//               name="passport"
//               onChange={handleFileChange}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label htmlFor="registration">Registration</label>
//             <input
//               type="file"
//               name="registration"
//               onChange={handleFileChange}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div className="modal-action">
//             <button type="submit" className="btn btn-primary">
//               Сохранить изменения
//             </button>
//             <button onClick={onClose} className="btn">
//               Отмена
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Validation des props avec PropTypes
// ModifyModal.propTypes = {
//   form: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     nom: PropTypes.string,
//     prenom: PropTypes.string,
//     surnom: PropTypes.string,
//     telephone: PropTypes.string,
//     email: PropTypes.string,
//   }).isRequired, // Validation de l'objet form et ses propriétés
//   onClose: PropTypes.func.isRequired, // Validation que onClose est une fonction
//   onUpdate: PropTypes.func.isRequired, // Validation que onUpdate est une fonction
// };

// export default ModifyModal;

import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import de PropTypes pour la validation des props

const ModifyModal = ({ form, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...form });
  const [files, setFiles] = useState({
    passport: null,
    registration: null,
    translationPassport: null,
    visa: null,
    migrationCard: null,
    registrationPages: null,
    patent: null,
    greenCard: null,
    inn: null,
    snils: null,
  });

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  // Effect pour synchroniser formData lorsque le form change
  useEffect(() => {
    setFormData({ ...form });
  }, [form]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("prenom", formData.prenom);
    data.append("surnom", formData.surnom);
    data.append("telephone", formData.telephone);
    data.append("email", formData.email);

    // Ajouter les fichiers requis et optionnels
    data.append("nationality", formData.nationality);

    // Fichiers requis pour tous
    if (files.passport) {
      data.append("passport", files.passport);
    }

    if (formData.nationality === "russe") {
      if (files.registration) {
        data.append("registration", files.registration);
      }
    } else if (formData.nationality === "etranger") {
      if (files.translationPassport) {
        data.append("translationPassport", files.translationPassport);
      }
      if (files.migrationCard) {
        data.append("migrationCard", files.migrationCard);
      }
      if (files.registrationPages) {
        data.append("registrationPages", files.registrationPages);
      }

      // Fichiers optionnels
      if (files.visa) {
        data.append("visa", files.visa);
      }
      if (files.patent) {
        data.append("patent", files.patent);
      }
      if (files.greenCard) {
        data.append("greenCard", files.greenCard);
      }

      if (files.inn) {
        data.append("greenCard", files.inn);
      }
      if (files.snils) {
        data.append("greenCard", files.snils);
      }
    }

    try {
      const response = await fetch(`${apiUrl}/api/forms/${form._id}`, {
        method: "PUT",
        body: data,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Erreur de l'API :", errorMessage);
        alert(`Erreur: ${errorMessage}`);
        return;
      }

      const result = await response.json();
      console.log("Форма успешно обновлена:", result);

      setFormData({
        nationality: "",
        nom: "",
        prenom: "",
        surnom: "",
        telephone: "",
        email: "",
        passport: null,
        registration: null,
        translationPassport: null,
        visa: null,
        migrationCard: null,
        registrationPages: null,
        patent: null,
        greenCard: null,
        inn: null,
        snils: null,
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      alert("Ошибка при отправке формы");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Изменить форму</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sélection de la nationalité */}
          <div>
            <label className="block mb-1">Гражданство *</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="nationality"
                  value="russe"
                  checked={formData.nationality === "russe"}
                  onChange={handleInputChange}
                  required
                  className="mr-2"
                />
                Россиянин
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="nationality"
                  value="etranger"
                  checked={formData.nationality === "etranger"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Иностранец
              </label>
            </div>
          </div>

          {/* Champs communs */}
          <div>
            <label htmlFor="nom" className="block mb-1">
              Фамилия *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Фамилия *"
              required
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block mb-1">
              Имя *
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Имя *"
              required
            />
          </div>
          <div>
            <label htmlFor="surnom" className="block mb-1">
              Отчество
            </label>
            <input
              type="text"
              name="surnom"
              value={formData.surnom}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Отчество"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block mb-1">
              Телефон *
            </label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Телефон *"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Эл. почта"
            />
          </div>

          {/* Champs spécifiques en fonction de la nationalité */}
          {formData.nationality === "russe" && (
            <>
              <div>
                <label htmlFor="passport" className="block mb-1">
                  Паспорт (2 и 3 страница) *
                </label>
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
              <div>
                <label htmlFor="registration" className="block mb-1">
                  Страница паспорта с пропиской *
                </label>
                <input
                  type="file"
                  name="registration"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
            </>
          )}

          {formData.nationality === "etranger" && (
            <>
              <div>
                <label htmlFor="passport" className="block mb-1">
                  Паспорт *
                </label>
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
              <div>
                <label htmlFor="translationPassport" className="block mb-1">
                  Перевод паспорта *
                </label>
                <input
                  type="file"
                  name="translationPassport"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
              <div>
                <label htmlFor="migrationCard" className="block mb-1">
                  Миграционная карта *
                </label>
                <input
                  type="file"
                  name="migrationCard"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
              <div>
                <label htmlFor="registrationPages" className="block mb-1">
                  Регистрация 1-2 сторона *
                </label>
                <input
                  type="file"
                  name="registrationPages"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
              <div>
                <label htmlFor="visa" className="block mb-1">
                  Виза (если есть)
                </label>
                <input
                  type="file"
                  name="visa"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
              <div>
                <label htmlFor="patent" className="block mb-1">
                  Патент
                </label>
                <input
                  type="file"
                  name="patent"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
              <div>
                <label htmlFor="greenCard" className="block mb-1">
                  Зеленая карта (отпечатки пальцев)
                </label>
                <input
                  type="file"
                  name="greenCard"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>

              <div>
                <label htmlFor="inn" className="block mb-1">
                  ИНН
                </label>
                <input
                  type="file"
                  name="inn"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>

              <div>
                <label htmlFor="snils" className="block mb-1">
                  СНИЛС
                </label>
                <input
                  type="file"
                  name="snils"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,image/*"
                />
              </div>
            </>
          )}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Сохранить изменения
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
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
    nationality: PropTypes.oneOf(["russe", "etranger"]).isRequired,
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    surnom: PropTypes.string,
    telephone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    passport: PropTypes.string,
    registration: PropTypes.string,
    translationPassport: PropTypes.string,
    visa: PropTypes.string,
    migrationCard: PropTypes.string,
    registrationPages: PropTypes.string,
    patent: PropTypes.string,
    greenCard: PropTypes.string,
  }).isRequired, // Validation de l'objet form et ses propriétés
  onClose: PropTypes.func.isRequired, // Validation que onClose est une fonction
  onUpdate: PropTypes.func.isRequired, // Validation que onUpdate est une fonction
};

export default ModifyModal;

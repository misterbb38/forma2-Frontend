// // import { useState } from "react";
// // import Navigation from "../components/Navigation";

// // const Home = () => {
// //   const [formData, setFormData] = useState({
// //     nom: "",
// //     prenom: "",
// //     surnom: "",
// //     telephone: "",
// //     email: "",
// //     passport: null,
// //     registration: null,
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [toast, setToast] = useState({ success: false, error: false });
// //   const [consentChecked, setConsentChecked] = useState(false); // Nouvel état pour le consentement

// //   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleFileChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.files[0],
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     const data = new FormData();
// //     data.append("nom", formData.nom);
// //     data.append("prenom", formData.prenom);
// //     data.append("surnom", formData.surnom);
// //     data.append("telephone", formData.telephone);
// //     if (formData.email) data.append("email", formData.email);
// //     if (formData.passport) data.append("passport", formData.passport);
// //     if (formData.registration)
// //       data.append("registration", formData.registration);

// //     try {
// //       const response = await fetch(`${apiUrl}/api/forms`, {
// //         method: "POST",
// //         body: data,
// //       });

// //       if (!response.ok) {
// //         const errorMessage = await response.text();
// //         console.error("API response error:", errorMessage);
// //         throw new Error("Ошибка при отправке формы");
// //       }

// //       const result = await response.json();
// //       console.log("Форма успешно отправлена:", result);

// //       setToast({ success: true, error: false });

// //       setFormData({
// //         nom: "",
// //         prenom: "",
// //         surnom: "",
// //         telephone: "",
// //         email: "",
// //         passport: null,
// //         registration: null,
// //       });
// //     } catch (error) {
// //       console.error("Ошибка при отправке формы:", error);
// //       setToast({ success: false, error: true });
// //     } finally {
// //       setLoading(false);
// //     }

// //     setTimeout(() => {
// //       setToast({ success: false, error: false });
// //     }, 3000);
// //   };

// //   const handleConsentChange = () => {
// //     setConsentChecked(!consentChecked); // Toggle consent checked state
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen">
// //       <div className="container mx-auto w-96">
// //         <Navigation />
// //         <h1 className="text-2xl mb-4">Безопасная загрузка документов</h1>
// //         <h3>
// //           Для проверки документов службой безопасности, просим Вас загрузить
// //           скан 2-3 и 5 страницы паспорта.
// //         </h3>

// //         {/* Toast messages */}
// //         <div className="toast toast-top toast-start">
// //           {toast.success && (
// //             <div className="alert alert-success">
// //               <span>Форма успешно отправлена.</span>
// //             </div>
// //           )}
// //           {toast.error && (
// //             <div className="alert alert-error">
// //               <span>Ошибка при отправке формы.</span>
// //             </div>
// //           )}
// //         </div>

// //         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
// //           <div>
// //             <label htmlFor="nom"></label>
// //             <input
// //               type="text"
// //               name="nom"
// //               value={formData.nom}
// //               onChange={handleInputChange}
// //               className="input input-bordered input-primary w-full max-w-xs"
// //               placeholder="Фамилия *"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="text"
// //               name="prenom"
// //               value={formData.prenom}
// //               onChange={handleInputChange}
// //               className="input input-bordered input-primary w-full max-w-xs"
// //               placeholder="Имя *"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="text"
// //               name="surnom"
// //               value={formData.surnom}
// //               onChange={handleInputChange}
// //               className="input input-bordered input-primary w-full max-w-xs"
// //               placeholder="Отчество"
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="text"
// //               name="telephone"
// //               value={formData.telephone}
// //               onChange={handleInputChange}
// //               className="input input-bordered input-primary w-full max-w-xs"
// //               placeholder="Телефон *"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleInputChange}
// //               className="input input-bordered input-primary w-full max-w-xs"
// //               placeholder="Эл. почта"
// //             />
// //           </div>
// //           <div>
// //             <label>2 и 3 страница паспорта *</label>
// //             <br />
// //             <input
// //               type="file"
// //               name="passport"
// //               onChange={handleFileChange}
// //               className="file-input file-input-bordered file-input-primary w-full max-w-xs"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label>Страница паспорта с пропиской *</label>
// //             <br />
// //             <input
// //               type="file"
// //               name="registration"
// //               onChange={handleFileChange}
// //               className="file-input file-input-bordered file-input-primary w-full max-w-xs"
// //               required
// //             />
// //           </div>

// //           {/* Checkbox for consent */}
// //           <div className="form-control">
// //             <label className="label cursor-pointer">
// //               <input
// //                 type="checkbox"
// //                 className="checkbox checkbox-primary"
// //                 checked={consentChecked}
// //                 onChange={handleConsentChange}
// //                 required
// //               />
// //               <span className="label-text ml-2">
// //                 Нажимая кнопку «Отправить», я даю свое согласие на обработку
// //                 моих персональных данных...
// //               </span>
// //             </label>
// //           </div>

// //           <button
// //             type="submit"
// //             className="btn btn-primary mt-4 w-full max-w-xs mb-2"
// //             disabled={loading || !consentChecked} // Button disabled if not checked
// //           >
// //             {loading ? (
// //               <span className="loading loading-spinner text-primary"></span>
// //             ) : (
// //               "Отправить"
// //             )}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;

// import { useState } from "react";
// import Navigation from "../components/Navigation";

// const Home = () => {
//   const [formData, setFormData] = useState({
//     nationality: "",
//     nom: "",
//     prenom: "",
//     surnom: "",
//     telephone: "",
//     email: "",
//     // Fichiers pour les Russes
//     passport: null,
//     registration: null,
//     // Fichiers pour les étrangers
//     passport_translation: null,
//     visa: null,
//     migration_card: null,
//     registration_pages: null,
//     patent: null,
//     green_card: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ success: false, error: false });
//   const [consentChecked, setConsentChecked] = useState(false);

//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData();
//     data.append("nationality", formData.nationality);
//     data.append("nom", formData.nom);
//     data.append("prenom", formData.prenom);
//     data.append("surnom", formData.surnom);
//     data.append("telephone", formData.telephone);
//     if (formData.email) data.append("email", formData.email);

//     if (formData.nationality === "russe") {
//       data.append("passport", formData.passport);
//       data.append("registration", formData.registration);
//     } else if (formData.nationality === "etranger") {
//       data.append("passport", formData.passport);
//       data.append("passport_translation", formData.passport_translation);
//       data.append("migration_card", formData.migration_card);
//       data.append("registration_pages", formData.registration_pages);
//       data.append("patent", formData.patent);
//       data.append("green_card", formData.green_card);
//       if (formData.visa) data.append("visa", formData.visa);
//     }

//     try {
//       const response = await fetch(`${apiUrl}/api/forms`, {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         console.error("Erreur de l'API :", errorMessage);
//         throw new Error("Ошибка при отправке формы");
//       }

//       const result = await response.json();
//       console.log("Форма успешно отправлена:", result);

//       setToast({ success: true, error: false });

//       // Réinitialisation du formulaire
//       setFormData({
//         nationality: "",
//         nom: "",
//         prenom: "",
//         surnom: "",
//         telephone: "",
//         email: "",
//         passport: null,
//         registration: null,
//         passport_translation: null,
//         visa: null,
//         migration_card: null,
//         registration_pages: null,
//         patent: null,
//         green_card: null,
//       });
//     } catch (error) {
//       console.error("Erreur lors de l'envoi du formulaire :", error);
//       setToast({ success: false, error: true });
//     } finally {
//       setLoading(false);
//     }

//     setTimeout(() => {
//       setToast({ success: false, error: false });
//     }, 3000);
//   };

//   const handleConsentChange = () => {
//     setConsentChecked(!consentChecked);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="container mx-auto w-96">
//         <Navigation />
//         <h1 className="text-2xl mb-4">Безопасная загрузка документов</h1>
//         <h3>
//           Для проверки документов службой безопасности, просим Вас загрузить
//           необходимые документы.
//         </h3>

//         {/* Messages Toast */}
//         <div className="toast toast-top toast-start">
//           {toast.success && (
//             <div className="alert alert-success">
//               <span>Форма успешно отправлена.</span>
//             </div>
//           )}
//           {toast.error && (
//             <div className="alert alert-error">
//               <span>Ошибка при отправке формы.</span>
//             </div>
//           )}
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//           {/* Sélection de la nationalité */}
//           <div>
//             <label>Гражданство *</label>
//             <div className="flex items-center">
//               <label className="mr-4">
//                 <input
//                   type="radio"
//                   name="nationality"
//                   value="russe"
//                   checked={formData.nationality === "russe"}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <span className="ml-2">Россиянин</span>
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="nationality"
//                   value="etranger"
//                   checked={formData.nationality === "etranger"}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2">Иностранец</span>
//               </label>
//             </div>
//           </div>

//           {/* Champs communs */}
//           <div>
//             <input
//               type="text"
//               name="nom"
//               value={formData.nom}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Фамилия *"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="prenom"
//               value={formData.prenom}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Имя *"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="surnom"
//               value={formData.surnom}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Отчество"
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="telephone"
//               value={formData.telephone}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Телефон *"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Эл. почта"
//             />
//           </div>

//           {/* Champs spécifiques en fonction de la nationalité */}
//           {formData.nationality === "russe" && (
//             <>
//               <div>
//                 <label>2 и 3 страница паспорта *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="passport"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Страница паспорта с пропиской *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="registration"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {formData.nationality === "etranger" && (
//             <>
//               <div>
//                 <label>Паспорт *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="passport"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Перевод паспорта *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="passport_translation"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Виза (если есть)</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="visa"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                 />
//               </div>
//               <div>
//                 <label>Миграционная карта *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="migration_card"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Регистрация 1-2 сторона *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="registration_pages"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Патент (если есть)</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="patent"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                 />
//               </div>
//               <div>
//                 <label>Зеленая карта (отпечатки пальцев) (если есть)</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="green_card"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                 />
//               </div>
//             </>
//           )}

//           {/* Checkbox pour le consentement */}
//           <div className="form-control">
//             <label className="label cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="checkbox checkbox-primary"
//                 checked={consentChecked}
//                 onChange={handleConsentChange}
//                 required
//               />
//               <span className="label-text ml-2">
//                 Нажимая кнопку «Отправить», я даю свое согласие на обработку
//                 моих персональных данных...
//               </span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary mt-4 w-full max-w-xs mb-2"
//             disabled={loading || !consentChecked}
//           >
//             {loading ? (
//               <span className="loading loading-spinner text-primary"></span>
//             ) : (
//               "Отправить"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import { useState } from "react";
// import Navigation from "../components/Navigation";

// const Home = () => {
//   const [formData, setFormData] = useState({
//     nationality: "",
//     nom: "",
//     prenom: "",
//     surnom: "",
//     telephone: "",
//     email: "",
//     // Fichiers pour les Russes
//     passport: null,
//     registration: null,
//     // Fichiers pour les étrangers
//     translationPassport: null,
//     visa: null,
//     migrationCard: null,
//     registrationPages: null,
//     patent: null,
//     greenCard: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ success: false, error: false });
//   const [consentChecked, setConsentChecked] = useState(false);

//   const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const data = new FormData();
//     data.append("nationality", formData.nationality);
//     data.append("nom", formData.nom);
//     data.append("prenom", formData.prenom);
//     data.append("surnom", formData.surnom);
//     data.append("telephone", formData.telephone);
//     if (formData.email) data.append("email", formData.email);

//     // Fichiers requis
//     if (formData.passport) data.append("passport", formData.passport);

//     if (formData.nationality === "russe") {
//       if (formData.registration)
//         data.append("registration", formData.registration);
//     } else if (formData.nationality === "etranger") {
//       if (formData.translationPassport)
//         data.append("translationPassport", formData.translationPassport);
//       if (formData.migrationCard)
//         data.append("migrationCard", formData.migrationCard);
//       if (formData.registrationPages)
//         data.append("registrationPages", formData.registrationPages);

//       // Fichiers optionnels
//       if (formData.visa) data.append("visa", formData.visa);
//       if (formData.patent) data.append("patent", formData.patent);
//       if (formData.greenCard) data.append("greenCard", formData.greenCard);
//     }

//     try {
//       const response = await fetch(`${apiUrl}/api/forms`, {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         console.error("Erreur de l'API :", errorMessage);
//         throw new Error("Ошибка при отправке формы");
//       }

//       const result = await response.json();
//       console.log("Форма успешно отправлена:", result);

//       setToast({ success: true, error: false });

//       // Réinitialisation du formulaire
//       setFormData({
//         nationality: "",
//         nom: "",
//         prenom: "",
//         surnom: "",
//         telephone: "",
//         email: "",
//         passport: null,
//         registration: null,
//         translationPassport: null,
//         visa: null,
//         migrationCard: null,
//         registrationPages: null,
//         patent: null,
//         greenCard: null,
//       });
//     } catch (error) {
//       console.error("Erreur lors de l'envoi du formulaire :", error);
//       setToast({ success: false, error: true });
//     } finally {
//       setLoading(false);
//     }

//     setTimeout(() => {
//       setToast({ success: false, error: false });
//     }, 3000);
//   };

//   const handleConsentChange = () => {
//     setConsentChecked(!consentChecked);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="container mx-auto w-96">
//         <Navigation />
//         <h1 className="text-2xl mb-4">Безопасная загрузка документов</h1>
//         <h3>
//           Для проверки документов службой безопасности, просим Вас загрузить
//           необходимые документы.
//         </h3>

//         {/* Messages Toast */}
//         <div className="toast toast-top toast-start">
//           {toast.success && (
//             <div className="alert alert-success">
//               <span>Форма успешно отправлена.</span>
//             </div>
//           )}
//           {toast.error && (
//             <div className="alert alert-error">
//               <span>Ошибка при отправке формы.</span>
//             </div>
//           )}
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//           {/* Sélection de la nationalité */}
//           <div>
//             <label>Гражданство *</label>
//             <div className="flex items-center">
//               <label className="mr-4">
//                 <input
//                   type="radio"
//                   name="nationality"
//                   value="russe"
//                   checked={formData.nationality === "russe"}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 <span className="ml-2">Россиянин</span>
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="nationality"
//                   value="etranger"
//                   checked={formData.nationality === "etranger"}
//                   onChange={handleInputChange}
//                 />
//                 <span className="ml-2">Иностранец</span>
//               </label>
//             </div>
//           </div>

//           {/* Champs communs */}
//           <div>
//             <input
//               type="text"
//               name="nom"
//               value={formData.nom}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Фамилия *"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="prenom"
//               value={formData.prenom}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Имя *"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="surnom"
//               value={formData.surnom}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Отчество"
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="telephone"
//               value={formData.telephone}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Телефон *"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="input input-bordered input-primary w-full max-w-xs"
//               placeholder="Эл. почта"
//             />
//           </div>

//           {/* Champs spécifiques en fonction de la nationalité */}
//           {formData.nationality === "russe" && (
//             <>
//               <div>
//                 <label>2 и 3 страница паспорта *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="passport"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Страница паспорта с пропиской *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="registration"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {formData.nationality === "etranger" && (
//             <>
//               <div>
//                 <label>Паспорт *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="passport"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Перевод паспорта *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="translationPassport"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Виза (если есть)</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="visa"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                 />
//               </div>
//               <div>
//                 <label>Миграционная карта *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="migrationCard"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Регистрация 1-2 сторона *</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="registrationPages"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Патент</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="patent"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                 />
//               </div>
//               <div>
//                 <label>Зеленая карта (отпечатки пальцев)</label>
//                 <br />
//                 <input
//                   type="file"
//                   name="greenCard"
//                   onChange={handleFileChange}
//                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"
//                 />
//               </div>
//             </>
//           )}

//           {/* Checkbox pour le consentement */}
//           <div className="form-control">
//             <label className="label cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="checkbox checkbox-primary"
//                 checked={consentChecked}
//                 onChange={handleConsentChange}
//                 required
//               />
//               <span className="label-text ml-2">
//                 Нажимая кнопку «Отправить», я даю свое согласие на обработку
//                 моих персональных данных...
//               </span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary mt-4 w-full max-w-xs mb-2"
//             disabled={loading || !consentChecked}
//           >
//             {loading ? (
//               <span className="loading loading-spinner text-primary"></span>
//             ) : (
//               "Отправить"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import Navigation from "../components/Navigation";

const Home = () => {
  const [formData, setFormData] = useState({
    nationality: "",
    nom: "",
    prenom: "",
    surnom: "",
    telephone: "",
    email: "",
    // Fichiers pour les Russes
    passport: null,
    registration: null,
    // Fichiers pour les étrangers
    translationPassport: null,
    visa: null,
    migrationCard: null,
    registrationPages: null,
    patent: null,
    greenCard: null,
    inn: null,
    snils: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ success: false, error: false });
  const [consentChecked, setConsentChecked] = useState(false);

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("nationality", formData.nationality);
    data.append("nom", formData.nom);
    data.append("prenom", formData.prenom);
    data.append("surnom", formData.surnom);
    data.append("telephone", formData.telephone);
    if (formData.email) data.append("email", formData.email);

    // Fichiers requis pour tous
    if (!formData.passport) {
      alert("Le fichier 'Паспорт' est requis.");
      setLoading(false);
      return;
    }
    data.append("passport", formData.passport);

    if (formData.nationality === "russe") {
      // Vérification des fichiers requis pour les Russes
      if (!formData.registration) {
        alert("Le fichier 'Страница паспорта с пропиской' est requis.");
        setLoading(false);
        return;
      }
      data.append("registration", formData.registration);
    } else if (formData.nationality === "etranger") {
      // Vérification des fichiers requis pour les étrangers
      if (
        !formData.translationPassport ||
        !formData.migrationCard ||
        !formData.registrationPages
      ) {
        alert(
          "Les fichiers 'Перевод паспорта', 'Миграционная карта', et 'Регистрация 1-2 сторона' sont requis."
        );
        setLoading(false);
        return;
      }
      data.append("translationPassport", formData.translationPassport);
      data.append("migrationCard", formData.migrationCard);
      data.append("registrationPages", formData.registrationPages);

      // Fichiers optionnels
      if (formData.visa) data.append("visa", formData.visa);
      if (formData.patent) data.append("patent", formData.patent);
      if (formData.greenCard) data.append("greenCard", formData.greenCard);
      if (formData.inn) data.append("inn", formData.inn);
      if (formData.snils) data.append("snils", formData.snils);
    }

    try {
      const response = await fetch(`${apiUrl}/api/forms`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Erreur de l'API :", errorMessage);
        throw new Error("Ошибка при отправке формы");
      }

      const result = await response.json();
      console.log("Форма успешно отправлена:", result);

      setToast({ success: true, error: false });

      // Réinitialisation du formulaire
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
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setToast({ success: false, error: true });
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setToast({ success: false, error: false });
    }, 3000);
  };

  const handleConsentChange = () => {
    setConsentChecked(!consentChecked);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto w-96">
        <Navigation />
        <h1 className="text-2xl mb-4">Безопасная загрузка документов</h1>
        <h3>
          Для проверки документов службой безопасности, просим Вас загрузить
          необходимые документы.
        </h3>

        {/* Messages Toast */}
        <div className="toast toast-top toast-start">
          {toast.success && (
            <div className="alert alert-success">
              <span>Форма успешно отправлена.</span>
            </div>
          )}
          {toast.error && (
            <div className="alert alert-error">
              <span>Ошибка при отправке формы.</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Sélection de la nationalité */}
          <div>
            <label>Гражданство *</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="nationality"
                  value="russe"
                  checked={formData.nationality === "russe"}
                  onChange={handleInputChange}
                  required
                />
                <span className="ml-2">Россиянин</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="nationality"
                  value="etranger"
                  checked={formData.nationality === "etranger"}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Иностранец</span>
              </label>
            </div>
          </div>

          {/* Champs communs */}
          <div>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Фамилия *"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Имя *"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="surnom"
              value={formData.surnom}
              onChange={handleInputChange}
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Отчество"
            />
          </div>
          <div>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Телефон *"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered input-primary w-full max-w-xs"
              placeholder="Эл. почта"
            />
          </div>

          {/* Champs spécifiques en fonction de la nationalité */}
          {formData.nationality === "russe" && (
            <>
              <div>
                <label>2 и 3 страница паспорта *</label>
                <br />
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div>
                <label>Страница паспорта с пропиской *</label>
                <br />
                <input
                  type="file"
                  name="registration"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  required
                />
              </div>
            </>
          )}

          {formData.nationality === "etranger" && (
            <>
              <div>
                <label>Паспорт *</label>
                <br />
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div>
                <label>Перевод паспорта *</label>
                <br />
                <input
                  type="file"
                  name="translationPassport"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div>
                <label>Миграционная карта *</label>
                <br />
                <input
                  type="file"
                  name="migrationCard"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div>
                <label>Регистрация 1-2 сторона *</label>
                <br />
                <input
                  type="file"
                  name="registrationPages"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div>
                <label>Виза (если есть)</label>
                <br />
                <input
                  type="file"
                  name="visa"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
              </div>
              <div>
                <label>
                  Патент (для Граждан Узбекистана и Таджикистана Патент
                  обязательно)
                </label>

                <br />
                <input
                  type="file"
                  name="patent"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
              </div>
              <div>
                <label>Зеленая карта (отпечатки пальцев)</label>
                <br />
                <input
                  type="file"
                  name="greenCard"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
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
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
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
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  accept=".pdf,image/*"
                />
              </div>
            </>
          )}

          {/* Checkbox pour le consentement */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={consentChecked}
                onChange={handleConsentChange}
                required
              />
              <span className="label-text ml-2">
                Нажимая кнопку «Отправить», я даю свое согласие на обработку
                моих персональных данных...
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4 w-full max-w-xs mb-2"
            disabled={loading || !consentChecked}
          >
            {loading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              "Отправить"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;

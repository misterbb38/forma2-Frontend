import { useState } from "react";
import Navigation from "../components/Navigation";

const Home = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    surnom: "",
    telephone: "",
    email: "",
    passport: null,
    registration: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ success: false, error: false });
  const [consentChecked, setConsentChecked] = useState(false); // Nouvel état pour le consentement

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
    data.append("nom", formData.nom);
    data.append("prenom", formData.prenom);
    data.append("surnom", formData.surnom);
    data.append("telephone", formData.telephone);
    if (formData.email) data.append("email", formData.email);
    if (formData.passport) data.append("passport", formData.passport);
    if (formData.registration)
      data.append("registration", formData.registration);

    try {
      const response = await fetch(`${apiUrl}/api/forms`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("API response error:", errorMessage);
        throw new Error("Ошибка при отправке формы");
      }

      const result = await response.json();
      console.log("Форма успешно отправлена:", result);

      setToast({ success: true, error: false });

      setFormData({
        nom: "",
        prenom: "",
        surnom: "",
        telephone: "",
        email: "",
        passport: null,
        registration: null,
      });
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setToast({ success: false, error: true });
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setToast({ success: false, error: false });
    }, 3000);
  };

  const handleConsentChange = () => {
    setConsentChecked(!consentChecked); // Toggle consent checked state
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto w-96">
        <Navigation />
        <h1 className="text-2xl mb-4">Безопасная загрузка документов</h1>
        <h3>
          Для проверки документов службой безопасности, просим Вас загрузить
          скан 2-3 и 5 страницы паспорта.
        </h3>

        {/* Toast messages */}
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
          <div>
            <label htmlFor="nom"></label>
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

          {/* Checkbox for consent */}
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
            disabled={loading || !consentChecked} // Button disabled if not checked
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

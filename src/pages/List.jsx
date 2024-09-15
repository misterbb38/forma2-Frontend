import { useState, useEffect, useCallback } from "react";
import ModifyModal from "../components/ModifyModal";
import * as XLSX from "xlsx";
import Navigation from "../components/Navigation";
import { SquarePen, Trash2 } from "lucide-react";

const List = () => {
  const [forms, setForms] = useState([]); // Init with empty array
  const [filter, setFilter] = useState("");
  const [filteredForms, setFilteredForms] = useState([]); // Init with empty array
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [startDate, setStartDate] = useState(""); // For date filter
  const [endDate, setEndDate] = useState(""); // For date filter

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const fetchForms = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${apiUrl}/api/forms`);
      const data = await response.json();

      // Ensure success is true and data is an array
      if (data.success && Array.isArray(data.data)) {
        setForms(data.data);
        setFilteredForms(data.data);
      } else {
        console.error(
          "Полученные данные не являются массивом или неудача:",
          data
        );
        setForms([]);
        setFilteredForms([]);
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      setForms([]); // Handle the error by resetting the form list
      setFilteredForms([]);
    }
    setLoading(false); // End loading
  }, [apiUrl]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    const filtered = forms.filter((form) =>
      form.nom.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredForms(filtered);
  };

  const handleDateFilterChange = () => {
    let filtered = forms;

    if (startDate) {
      filtered = filtered.filter(
        (form) => new Date(form.createdAt) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (form) => new Date(form.createdAt) <= new Date(endDate)
      );
    }

    setFilteredForms(filtered);
  };

  const handleDownloadExcel = () => {
    const filteredData = filteredForms.map((form) => ({
      Дата: new Date(form.createdAt).toLocaleDateString(),
      Имя: form.nom,
      Фамилия: form.prenom,
      Отчество: form.surnom,
      Телефон: form.telephone,
      Почта: form.email,
      Паспорт: form.passport ? form.passport : "Не доступен",
      Регистрация: form.registration ? form.registration : "Не доступен",
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Формы");

    XLSX.writeFile(
      workbook,
      `forms_${startDate || "all"}_${endDate || "all"}.xlsx`
    );
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loading when deletings
    try {
      await fetch(`${apiUrl}/api/forms/${id}`, { method: "DELETE" });
      fetchForms(); // Refresh forms after deletion
    } catch (error) {
      console.error("Ошибка при удалении формы:", error);
    }
    setLoading(false); // End loading
  };

  return (
    <div className="container mx-auto p-8">
      <Navigation />
      <h1 className="text-2xl mb-4">Список форм</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Фильтр по имени"
          value={filter}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered"
        />
        <button onClick={handleDateFilterChange} className="btn btn-primary">
          Фильтр по дате
        </button>
        <button onClick={handleDownloadExcel} className="btn btn-success">
          Скачать в Excel
        </button>
      </div>

      {loading ? (
        // Show spinner when loading
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        <>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Отчество</th>
                <th>Телефон</th>
                <th>Почта</th>
                <th>Паспорт</th>
                <th>Регистрация</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredForms) && filteredForms.length > 0 ? (
                filteredForms.map((form) => (
                  <tr key={form._id}>
                    <td>{new Date(form.createdAt).toLocaleDateString()}</td>
                    <td>{form.nom}</td>
                    <td>{form.prenom}</td>
                    <td>{form.surnom}</td>
                    <td>{form.telephone}</td>
                    <td>{form.email}</td>
                    <td>
                      {form.passport ? (
                        <a
                          href={form.passport}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Посмотреть паспорт
                        </a>
                      ) : (
                        "Не доступен"
                      )}
                    </td>
                    <td>
                      {form.registration ? (
                        <a
                          href={form.registration}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Посмотреть регистрацию
                        </a>
                      ) : (
                        "Не доступен"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => setSelectedForm(form)}
                      >
                        <SquarePen size={22} />
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => handleDelete(form._id)}
                      >
                        <Trash2 size={22} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    Формы не найдены.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {selectedForm && (
            <ModifyModal
              form={selectedForm}
              onClose={() => setSelectedForm(null)}
              onUpdate={fetchForms}
            />
          )}
        </>
      )}
    </div>
  );
};

export default List;

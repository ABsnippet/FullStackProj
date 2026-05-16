import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const fetchNotes = async () => {
    try {

      const res = await API.get("/notes");

      setNotes(res.data);

    } catch (error) {

      navigate("/login");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();

    try {

      await API.post("/notes", form);

      setForm({
        title: "",
        content: "",
      });

      fetchNotes();

    } catch (error) {

      console.log(error.response.data);
    }
  };

  const deleteNote = async (id) => {
    try {

      await API.delete(`/notes/${id}`);

      fetchNotes();

    } catch (error) {

      console.log(error.response.data);
    }
  };

  const logout = async () => {
    try {

      await API.post("/auth/logout");

      navigate("/login");

    } catch (error) {

      console.log(error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Create Note
          </h2>

          <form
            onSubmit={createNote}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <textarea
              name="content"
              placeholder="Content"
              value={form.content}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
              rows="4"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Add Note
            </button>

          </form>

        </div>

        <div className="space-y-4">

          {
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-5 rounded-2xl shadow"
              >

                <h3 className="text-2xl font-semibold">
                  {note.title}
                </h3>

                <p className="text-gray-700 mt-2">
                  {note.content}
                </p>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/tempregister";
import Login from "./pages/templogin";
import Dashboard from "./pages/tempdashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import AppLayout from "./components/AppLayout/AppLayout.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LibraryPage from "./pages/LibraryPage/LibraryPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/recommended" replace />} />
      <Route path="/register" element={<RestrictedRoute><RegisterPage /></RestrictedRoute>} />
      <Route path="/login" element={<RestrictedRoute><LoginPage /></RestrictedRoute>} />
      <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route path="/recommended" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

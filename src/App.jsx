import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import AppLayout from "./components/AppLayout/AppLayout.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LibraryPage from "./pages/LibraryPage/LibraryPage.jsx";
import ReadingPage from "./pages/ReadingPage/ReadingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { refreshUser } from "./redux/auth/operations.js";
import { selectToken } from "./redux/auth/selectors.js";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [isChecking, setIsChecking] = useState(Boolean(token));

  useEffect(() => {
    if (!isChecking) return;
    dispatch(refreshUser()).finally(() => setIsChecking(false));
  }, [dispatch, isChecking]);

  if (isChecking) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/recommended" replace />} />
      <Route
        path="/register"
        element={
          <RestrictedRoute>
            <RegisterPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute>
            <LoginPage />
          </RestrictedRoute>
        }
      />
      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/recommended" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading" element={<ReadingPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

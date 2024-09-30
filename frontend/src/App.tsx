import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import AppContainer from "./components/custom/AppContainer";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/email/verify/:code" element={<VerifyEmailPage />} />
      <Route path="/password/forgot" element={<ForgotPasswordPage />} />
      <Route path="/password/reset" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;

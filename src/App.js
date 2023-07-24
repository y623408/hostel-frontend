import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import HomePage from "./Pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./Pages/AdminLogin";
import AdminHomePage from "./Pages/AdminHomePage";
import Footer from "./Pages/Footer";
import LinkUpPage from "./Pages/LinkUpPage";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<LinkUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/adminHome" element={<AdminHomePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/home/*" element={<HomePage />}>
          <Route path=":topics" element={<HomePage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

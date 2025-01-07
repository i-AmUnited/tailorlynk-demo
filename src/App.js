import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Structure from "./pages/pageStructure";
import SignIn from "./pages/auth pages/signin";
import CreateAccount from "./pages/auth pages/createAccount";
import ResetPassword from "./pages/auth pages/resetPassword";
import ErrorPage from "./pages/errorPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <>
      <ToastContainer
      bodyClassName={() => "flex items-center text-xs "}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Structure />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      </>
    </div>
  );
}

export default App;

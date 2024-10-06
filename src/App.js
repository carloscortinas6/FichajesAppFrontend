import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./layouts/Navigation";
import User from "./pages/User";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignIn from "./pages/SignIn";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { Provider } from "react-redux";
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import ProtectedRoute  from "./utils/ProtectedRoute";
import './css/App.css'; 
import UserDashboard from "./components/UserDashboard";
import CompleteRegistration from "./components/forms/CompleteRegistration";
import RegistrationSuccess from "./components/RegistrationSuccess";
import ForgotPassword from "./components/forms/ForgotPassword";
import ResetPassword from './components/forms/ResetPassword';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

checkForToken();

function MainContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && (
        <div className="full-height d-flex align-items-center justify-content-center">
          <div className="container-custom text-center">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="hero-text">La gestión de tu organización importa.</div>
                <div className="sub-text">Timp te facilita un sistema de fichaje sencillo</div>
                <button className="btn btn-orange mt-4">Solicita información</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
      <div className="app-container container-fluid d-flex flex-column">
      <h3 className="app-title">TIMP</h3>
          <Navigation />
        <MainContent />
        <Container fluid className="flex-grow-1">
          <Routes>
            <Route path="/" />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/user-dashboard" element={<PrivateRoute />}>
              <Route path="" element={<UserDashboard />} />
            </Route>
            <Route path="/fichaje" element={<PrivateRoute />}>
              <Route path="" element={<User />} />
            </Route>
            <Route path="/complete-registration" element={
    <ProtectedRoute>
        <CompleteRegistration />
    </ProtectedRoute>
} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/registro-exitoso" element={
    <ProtectedRoute>
        <RegistrationSuccess />
    </ProtectedRoute>
} />
<Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Container>
        </div>
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
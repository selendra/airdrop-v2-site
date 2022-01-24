import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ProtectedRoute } from "./helper/routes";
import Home from "./pages/home";
import Login from "./pages/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
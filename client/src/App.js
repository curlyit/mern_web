import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layouts/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";
import Designer from "./views/Designer";
import DetailProduct from "./views/DetailProduct";
import Manage from "./views/Manage";
import Trash from "./views/Trash";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />

            <Route
              path="/dashboard"
              element={<ProtectedRoute element={Dashboard} />}
            />
            <Route path="/about" element={<ProtectedRoute element={About} />} />
            <Route
              path="/manage"
              element={<ProtectedRoute element={Manage} />}
            />
            <Route path="/trash" element={<ProtectedRoute element={Trash} />} />
            <Route
              path="/designer"
              element={<ProtectedRoute element={Designer} />}
            />
            <Route
              path="/detail/:id"
              element={<ProtectedRoute element={DetailProduct} />}
            />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import EditBook from "./components/Dashboard/EditBook";
import { useState } from "react";
import { useEffect } from "react";
import NewBookList from "./components/New/NewBook/NewBookList";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <>
      <header>
        <Header isAuthenticated={isAuthenticated} token={token} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            exact
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : navigate("/")}
          />

          <Route exact path="/new" element={<NewBookList />} />
          <Route exact path="/dashboard/edit" element={<EditBook />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

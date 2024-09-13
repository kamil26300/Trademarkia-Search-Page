import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Routes>
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<Navigate to="/search" replace />} />
    </Routes>
  );
};

export default App;

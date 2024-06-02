import SellerPage from "./page/SellerPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sellpage" element={<SellerPage />} />
    </Routes>
  );
}

export default App;

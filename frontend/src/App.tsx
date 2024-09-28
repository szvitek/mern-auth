import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";

const Home = () => {
  return <div className="text-3xl font-bold underline">Home</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

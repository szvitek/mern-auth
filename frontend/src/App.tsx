import { Route, Routes } from "react-router-dom";

const Home = () => {
  return <div className="text-3xl font-bold underline">Home</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

 import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeCompiler from "./pages/codecompiler/CodeCompiler";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<CodeCompiler/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

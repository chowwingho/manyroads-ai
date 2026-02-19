import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import FieldworkV1 from "./FieldworkV1";
import ManyroadsV2 from "./ManyroadsV2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/v1" element={<FieldworkV1 />} />
        <Route path="/v2" element={<ManyroadsV2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import FieldworkV1 from "./FieldworkV1"; // V1 — legacy architecture firm template
import ManyroadsV2 from "./ManyroadsV2";
import DesignSystemPage from "./pages/DesignSystemPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/v1" element={<FieldworkV1 />} />
        <Route path="/v2" element={<ManyroadsV2 />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

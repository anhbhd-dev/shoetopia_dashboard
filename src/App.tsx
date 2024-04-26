import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarWithHeader from "./layouts/layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarWithHeader />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

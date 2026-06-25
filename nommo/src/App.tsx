import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Forge from "./pages/Forge";
import Docs from "./pages/Docs";
import Dao from "./pages/Dao";
import Token from "./pages/Token";
import Vessel from "./pages/Vessel";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/forge" element={<Forge />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/dao" element={<Dao />} />
        <Route path="/token" element={<Token />} />
        <Route path="/vessel/:variant" element={<Vessel />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

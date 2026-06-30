import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portal from "./pages/Portal";
import Staking from "./pages/Staking";
import Governance from "./pages/Governance";
import Token from "./pages/Token";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="portal" element={<Portal />} />
        <Route path="staking" element={<Staking />} />
        <Route path="governance" element={<Governance />} />
        <Route path="token" element={<Token />} />
      </Route>
    </Routes>
  );
}

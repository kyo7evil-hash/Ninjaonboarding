import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Hub from "./components/Hub.jsx";
import Walkthrough from "./components/Walkthrough.jsx";
import { MODULES } from "./data/modules.js";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/module/it-policy" element={<Walkthrough moduleId="it-policy" />} />
        {/* Unknown module ids fall back to the hub. */}
        {MODULES.filter((m) => m.id !== "it-policy").map((m) => (
          <Route key={m.id} path={`/module/${m.id}`} element={<Navigate to="/" replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

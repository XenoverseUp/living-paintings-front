import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import DashboardLayout from "./views/dashboard-layout.tsx";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index path="/" element={<App />} />
        <Route path="/queue" element={<App />} />
        <Route path="/create" element={<App />} />
      </Route>
      <Route path="/vr/:id" element={<App />} />
    </Routes>
  </BrowserRouter>,
);

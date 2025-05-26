import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Gallery from "./views/gallery.tsx";
import DashboardLayout from "./views/dashboard-layout.tsx";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index path="/" element={<Gallery />} />
        <Route path="/queue" element={<Gallery />} />
        <Route path="/create" element={<Gallery />} />
      </Route>
      <Route path="/vr/:id" element={<Gallery />} />
    </Routes>
  </BrowserRouter>,
);

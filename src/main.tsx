import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { AboutUs, Create, DashboardLayout, Gallery, Queue } from "@/views";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index path="/" element={<Gallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/create" element={<Create />} />
      </Route>
      <Route path="/vr/:id" element={<Gallery />} />
    </Routes>
  </BrowserRouter>,
);

import "@/index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { AboutUs, Create, Layout, Gallery, Queue, XRPlayground } from "@/views";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Gallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/create" element={<Create />} />
      </Route>
      <Route path="/xr-playground/:id" element={<XRPlayground />} />
    </Routes>
  </BrowserRouter>,
);

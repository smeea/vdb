import { registerSW } from "virtual:pwa-register";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "@/assets/css/style.css";
import router from "@/router";

if ("serviceWorker" in navigator) {
  registerSW({ immediate: true });
}

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

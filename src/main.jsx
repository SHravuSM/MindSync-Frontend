import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FullscreenProvider } from "./context/FullscreenContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FullscreenProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </FullscreenProvider>
  </BrowserRouter>
);

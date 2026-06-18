import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installStaleAssetRecovery } from "./lib/staleAssetRecovery";

installStaleAssetRecovery();
createRoot(document.getElementById("root")!).render(<App />);

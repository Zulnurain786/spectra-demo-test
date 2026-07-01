import { useState, type ReactElement } from "react";
import { Login } from "./screens/Login.js";
import { Dashboard } from "./screens/Dashboard.js";

type Route = "login" | "dashboard";

export function App(): ReactElement {
  const [route, setRoute] = useState<Route>(
    typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard")
      ? "dashboard"
      : "login",
  );

  if (route === "dashboard") {
    return <Dashboard />;
  }
  return <Login onLoginSuccess={() => setRoute("dashboard")} />;
}

import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { MainLayout } from "./components/MainLayout";

// The app shows the main layout directly (demo mode — user is "Sarah")
export default function App() {
  const [_isAuthenticated] = useState(true);

  return (
    <>
      <MainLayout />
      <Toaster position="top-right" />
    </>
  );
}

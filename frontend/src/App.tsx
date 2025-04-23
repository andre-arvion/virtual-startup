import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ChatPage } from "@/pages/ChatPage";
import { WizardPage } from "@/pages/WizardPage";
import { MarkdownPage } from "@/pages/MarkdownPage";
import { PromptsPage } from "@/pages/PromptsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { NewProjectPage } from "@/pages/NewProjectPage";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import useStore from "@/store/useStore";
import { useEffect } from "react";

function App() {
  const { settings, currentProject, setCurrentProject } = useStore();

  // Set theme based on user settings
  useEffect(() => {
    if (settings.theme) {
      document.documentElement.setAttribute("data-theme", settings.theme);
      if (settings.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [settings.theme]);

  // Initialize with the default project
  useEffect(() => {
    if (!currentProject) {
      setCurrentProject("proj-123456");
    }
  }, [currentProject, setCurrentProject]);

  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider defaultTheme={settings.theme || "light"} storageKey="vsp-theme">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/documentation" element={<MarkdownPage />} />
            <Route path="/docs" element={<Navigate to="/documentation" replace />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/new-project" element={<NewProjectPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";
import { useEffect } from "react";

export function ThemeToggle() {
  const { settings, updateSettings } = useStore();

  const toggleTheme = () => {
    const newTheme = settings.theme === "dark" ? "light" : "dark";
    updateSettings({ theme: newTheme });
  };

  useEffect(() => {
    // Update the document class when theme changes
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(settings.theme);
  }, [settings.theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
      title={`Switch to ${settings.theme === "dark" ? "light" : "dark"} theme`}
    >
      {settings.theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 
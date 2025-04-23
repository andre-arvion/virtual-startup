import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  FileEdit,
  Settings,
  MenuSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Plus,
  Code,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";
import { SidebarFooter } from "./Layout";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({
  icon,
  label,
  href,
  isActive,
  collapsed,
}: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center py-2 px-3 rounded-lg text-sm group transition-colors",
        isActive
          ? "text-primary bg-primary-foreground"
          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
      )}
    >
      <div className="mr-2 h-5 w-5">{icon}</div>
      {!collapsed && <span className="line-clamp-1">{label}</span>}
      {collapsed && (
        <span className="sr-only line-clamp-1">{label}</span>
      )}
    </Link>
  );
};

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare
  },
  {
    name: "Wizard",
    href: "/wizard",
    icon: MenuSquare
  },
  {
    name: "Documentation",
    href: "/documentation",
    icon: FileText
  },
  {
    name: "Prompts",
    href: "/prompts",
    icon: FileEdit
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentProject = useStore((state) => state.currentProject);

  return (
    <div
      className={cn(
        "h-screen flex flex-col border-r bg-background transition-all duration-300 ease-in-out overflow-hidden",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex-1">
            <h2 className="font-semibold text-lg">Virtual Startup</h2>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {currentProject && (
        <div className={cn("px-3 py-2", collapsed ? "text-center" : "")}>
          <p className="text-xs text-muted-foreground uppercase">Current Project</p>
          <p className={cn("text-sm font-semibold truncate", collapsed ? "text-xs pt-1" : "")}>
            {collapsed ? currentProject.name.substring(0, 3) : currentProject.name}
          </p>
        </div>
      )}
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2 w-full"
          >
            <Link to="/new-project">
              <Plus className="h-4 w-4" />
              <span className={cn("flex-1", collapsed && "hidden")}>New Project</span>
            </Link>
          </Button>

          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.name}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className="justify-start gap-2 w-full"
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span className={cn("flex-1", collapsed && "hidden")}>{item.name}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>

      <SidebarFooter />
    </div>
  );
}

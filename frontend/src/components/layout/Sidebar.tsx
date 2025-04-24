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
  FolderKanban,
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

function SidebarItem({ icon, label, href, isActive, collapsed }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center py-2 px-4 text-sm font-medium rounded-lg transition-colors",
        "hover:bg-muted",
        isActive ? "bg-muted" : "transparent"
      )}
    >
      <span className="w-5 h-5">{icon}</span>
      {!collapsed && <span className="ml-3">{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { currentProject } = useStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <span className="font-semibold">Virtual Startup</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-2">
        <SidebarItem
          icon={<FolderKanban />}
          label="Projects"
          href="/projects"
          isActive={isActive("/projects")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<LayoutDashboard />}
          label="Dashboard"
          href="/dashboard"
          isActive={isActive("/dashboard")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<MessageSquare />}
          label="Chat"
          href="/chat"
          isActive={isActive("/chat")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<FileEdit />}
          label="Prompts"
          href="/prompts"
          isActive={isActive("/prompts")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<FileText />}
          label="Documentation"
          href="/documentation"
          isActive={isActive("/documentation")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Settings />}
          label="Settings"
          href="/settings"
          isActive={isActive("/settings")}
          collapsed={collapsed}
        />
      </div>
      <SidebarFooter />
    </div>
  );
}

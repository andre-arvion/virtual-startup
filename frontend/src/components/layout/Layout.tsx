import { ReactNode, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import useStore from "@/store/useStore";
import { Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "../theme/ThemeToggle";

interface LayoutProps {
  children: ReactNode;
  requiresAuth?: boolean;
  className?: string;
}

export function Layout({ children, requiresAuth = true, className }: LayoutProps) {
  const { isAuthenticated, fetchProjects } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated, fetchProjects]);

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!requiresAuth) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className={cn("container mx-auto py-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}

export function SidebarFooter() {
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <ThemeToggle />
      <UserNav />
    </div>
  );
}

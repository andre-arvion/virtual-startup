import { ReactNode, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import useStore from "@/store/useStore";
import { Navigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "../theme/ThemeToggle";

interface LayoutProps {
  children: ReactNode;
  requiresAuth?: boolean;
  className?: string;
  pageTitle?: string;
}

export function Layout({ children, requiresAuth = true, className, pageTitle }: LayoutProps) {
  const { isAuthenticated, fetchProjects } = useStore();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && requiresAuth) {
      fetchProjects().catch(() => {
        // If fetching projects fails, it might be due to an expired token
        // The 401 interceptor will handle the logout
      });
    }
  }, [isAuthenticated, fetchProjects, requiresAuth]);

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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

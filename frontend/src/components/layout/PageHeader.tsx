import { useLocation } from "react-router-dom";
import useStore from "@/store/useStore";

interface PageHeaderProps {
  pageTitle: string;
}

export function PageHeader({ pageTitle }: PageHeaderProps) {
  const { currentProject } = useStore();
  const location = useLocation();

  // Don't show project name on projects list or new project page
  const shouldShowProject = currentProject && 
    !location.pathname.match(/^\/projects$|^\/new-project$/);

  return (
    <div className="border-b mb-6">
      <div className="container mx-auto py-4">
        <div className="flex flex-col gap-1">
          {shouldShowProject && (
            <h2 className="text-lg font-medium text-muted-foreground">
              {currentProject.title}
            </h2>
          )}
          <h1 className="text-2xl font-bold">
            {pageTitle}
          </h1>
        </div>
      </div>
    </div>
  );
} 
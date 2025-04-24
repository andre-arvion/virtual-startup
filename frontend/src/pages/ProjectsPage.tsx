import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/useStore";
import { Project } from "@/types";
import api from "@/lib/api";

export function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { projects, setCurrentProject } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      await useStore.getState().fetchProjects();
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectSelect = async (projectId: string) => {
    try {
      await setCurrentProject(projectId);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error selecting project:', err);
    }
  };

  const handleCreateNew = () => {
    navigate('/new-project');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Projects">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-muted-foreground">Select a project to work on or create a new one</p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id}
              className="hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => handleProjectSelect(project.id)}
            >
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
                  <span>Status: {project.status}</span>
                  <span>
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {projects.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects found</p>
            <Button onClick={handleCreateNew}>Create your first project</Button>
          </div>
        )}
      </div>
    </Layout>
  );
} 
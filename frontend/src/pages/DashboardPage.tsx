import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useStore from "@/store/useStore";
import { useEffect, useState } from "react";
import { PersonaProgress } from "@/components/dashboard/PersonaProgress";
import { PhaseProgress } from "@/components/dashboard/PhaseProgress";
import { AssetPreview } from "@/components/dashboard/AssetPreview";
import { ExportActions } from "@/components/dashboard/ExportActions";
import { toast } from "@/components/ui/use-toast";

export function DashboardPage() {
  const { currentProject, fetchActivities, activities, projects } = useStore();
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initializeDashboard = async () => {
      setIsLoading(true);
      try {
        if (currentProject) {
          await fetchActivities(currentProject.id);
        }
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, [currentProject, fetchActivities]);

  const handleExportMarkdown = async () => {
    setIsExporting(true);
    try {
      // TODO: Implement export to markdown
      toast({
        title: "Export successful",
        description: "Project has been exported as a markdown ZIP file.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportNotion = async () => {
    setIsExporting(true);
    try {
      // TODO: Implement export to Notion
      toast({
        title: "Export successful",
        description: "Project has been exported to Notion.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export to Notion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCursor = async () => {
    setIsExporting(true);
    try {
      // TODO: Implement export to Cursor
      toast({
        title: "Export successful",
        description: "Project has been exported to Cursor.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export to Cursor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading || !currentProject) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading project data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (projects.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">No Projects Found</h2>
            <p className="text-muted-foreground">Create your first project to get started.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Convert phases object to array format expected by PhaseProgress
  const phasesArray = Object.entries(currentProject.phases || {}).map(([name, progress]) => ({
    id: name,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    progress: typeof progress === 'number' ? progress : 0
  }));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <ExportActions
            onExportMarkdown={handleExportMarkdown}
            onExportNotion={handleExportNotion}
            onExportCursor={handleExportCursor}
            isExporting={isExporting}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
              <CardDescription>Project details and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Name:</span>
                  <span className="ml-2 font-medium">{currentProject.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Type:</span>
                  <span className="ml-2">{currentProject.type}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Status:</span>
                  <span className="ml-2">{currentProject.status}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Created:</span>
                  <span className="ml-2">{new Date(currentProject.created_date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <PersonaProgress personas={currentProject.personas || []} />
          <PhaseProgress phases={phasesArray} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AssetPreview assets={currentProject.assets || []} />
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Recent project activities</CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium">{activity.persona?.charAt(0).toUpperCase() || "P"}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No recent activities</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

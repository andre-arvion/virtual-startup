import { Layout } from "@/components/layout/Layout";
import { MarkdownViewer } from "@/components/markdown/MarkdownViewer";
import useStore from "@/store/useStore";
import { useEffect, useState } from "react";

interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  path: string;
}

export function MarkdownPage() {
  const { currentProject } = useStore();
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdownFiles = async () => {
      if (!currentProject) return;

      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // Mock data for now
        const mockFiles = [
          {
            id: "1",
            name: "product_brief.md",
            path: "docs/product_brief.md",
            content: "# Product Brief\n\n## Overview\nThe Virtual Startup Platform is an AI-powered workspace..."
          },
          {
            id: "2",
            name: "user_flows.md",
            path: "docs/user_flows.md",
            content: "# User Flows\n\n## Authentication Flow\n1. User arrives at login page..."
          },
          {
            id: "3",
            name: "tech_stack.md",
            path: "docs/tech_stack.md",
            content: "# Technology Stack\n\n## Frontend\n- React with TypeScript\n- TailwindCSS..."
          }
        ];
        setFiles(mockFiles);
      } catch (error) {
        console.error("Failed to fetch markdown files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownFiles();
  }, [currentProject]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Project Documentation</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <MarkdownViewer files={files} />
        )}
      </div>
    </Layout>
  );
} 
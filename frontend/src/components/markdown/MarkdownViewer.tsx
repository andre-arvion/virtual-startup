import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "@/components/ui/use-toast";

interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  path: string;
}

interface MarkdownViewerProps {
  files: MarkdownFile[];
}

export function MarkdownViewer({ files }: MarkdownViewerProps) {
  const [activeTab, setActiveTab] = useState(files[0]?.id || "");

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "The markdown content has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (file: MarkdownFile) => {
    const blob = new Blob([file.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Markdown Files</CardTitle>
          <CardDescription>View and manage markdown documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No markdown files available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Markdown Files</CardTitle>
        <CardDescription>View and manage markdown documentation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full h-auto flex-wrap">
            {files.map((file) => (
              <TabsTrigger key={file.id} value={file.id} className="flex-grow">
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {files.map((file) => (
            <TabsContent key={file.id} value={file.id}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{file.path}</span>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(file.content)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(file)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted overflow-auto max-h-[500px]">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{file.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
} 
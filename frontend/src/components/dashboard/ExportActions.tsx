import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileJson, NotebookPen } from "lucide-react";

interface ExportActionsProps {
  onExportMarkdown: () => void;
  onExportNotion: () => void;
  onExportCursor: () => void;
  isExporting: boolean;
}

export function ExportActions({
  onExportMarkdown,
  onExportNotion,
  onExportCursor,
  isExporting
}: ExportActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Project</CardTitle>
        <CardDescription>Export your project in different formats</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onExportMarkdown}
            disabled={isExporting}
          >
            <Download className="mr-2 h-4 w-4" />
            Export as Markdown ZIP
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onExportNotion}
            disabled={isExporting}
          >
            <NotebookPen className="mr-2 h-4 w-4" />
            Export to Notion
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onExportCursor}
            disabled={isExporting}
          >
            <FileJson className="mr-2 h-4 w-4" />
            Export to Cursor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
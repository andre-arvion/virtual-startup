import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Asset {
  id: string;
  type: 'ui' | 'repo';
  name: string;
  url: string;
  description?: string;
  lastUpdated: string;
}

interface AssetPreviewProps {
  assets: Asset[];
}

export function AssetPreview({ assets }: AssetPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Assets</CardTitle>
        <CardDescription>Connected UI designs and repositories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.length === 0 ? (
            <p className="text-sm text-muted-foreground">No assets linked yet</p>
          ) : (
            assets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-start justify-between p-3 rounded-lg border"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {asset.type === 'repo' ? (
                      <Github className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    <span className="font-medium">{asset.name}</span>
                  </div>
                  {asset.description && (
                    <p className="text-sm text-muted-foreground">
                      {asset.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(asset.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(asset.url, '_blank')}
                >
                  View
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DocsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Documentation</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Documentation</CardTitle>
            <CardDescription>
              Access and manage your project's documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Documentation features coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 
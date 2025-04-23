import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types";

interface PersonaProgressProps {
  personas: Project['personas'];
}

export function PersonaProgress({ personas = [] }: PersonaProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Progress</CardTitle>
        <CardDescription>Virtual team members and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {personas.map((persona) => (
            <div key={persona.id} className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{persona.fullName}</span>
                  <span className="text-sm text-muted-foreground">
                    {persona.completed ? "Completed" : "In Progress"}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${persona.completed ? 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 
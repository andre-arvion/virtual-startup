import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PhaseProgressProps {
  phases: Array<{
    id: string;
    name: string;
    progress: number;
  }>;
}

export function PhaseProgress({ phases = [] }: PhaseProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Progress</CardTitle>
        <CardDescription>Track progress across different phases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{phase.name}</span>
                <span className="text-sm text-muted-foreground">{phase.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${phase.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 
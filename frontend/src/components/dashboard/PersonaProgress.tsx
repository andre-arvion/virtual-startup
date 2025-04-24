import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Persona } from "@/types";
import { getPersonaName, getPersonaProgress, getPersonaStatus } from "@/utils/persona";

interface PersonaProgressProps {
  personas: Persona[];
}

export function PersonaProgress({ personas }: PersonaProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Persona Progress</CardTitle>
        <CardDescription>Track the progress of each AI persona</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {personas.map((persona) => (
            <div key={persona.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{getPersonaName(persona.id, personas)}</p>
                <p className="text-sm text-muted-foreground">{getPersonaStatus(persona.id, personas)}</p>
              </div>
              <div className="w-24">
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${getPersonaProgress(persona.id, personas)}%` }}
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
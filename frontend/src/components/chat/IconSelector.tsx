
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Persona } from "@/types"

interface IconSelectorProps {
  currentPersona: string
  personas: Persona[]
  onChange: (persona: string) => void
}

export function IconSelector({ currentPersona, personas, onChange }: IconSelectorProps) {
  const currentPersonaData = personas.find((p) => p.id === currentPersona)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Chatting with: {currentPersonaData?.fullName || currentPersona}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {personas.map((persona) => (
          <DropdownMenuItem
            key={persona.id}
            onClick={() => onChange(persona.id)}
            className={currentPersona === persona.id ? "bg-muted" : ""}
          >
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded-md">
                <div className="h-4 w-4 text-primary">{persona.name.charAt(0).toUpperCase()}</div>
              </div>
              <span>{persona.fullName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

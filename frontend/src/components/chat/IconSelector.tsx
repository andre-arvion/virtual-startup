import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Persona } from "@/types"

// Hardcoded personas
const DEFAULT_PERSONAS: Persona[] = [
  {
    id: "vpm",
    name: "vPM",
    fullName: "Virtual Product Manager",
    progress: 0,
    status: "not_started",
    icon: "layout-dashboard"
  },
  {
    id: "vux",
    name: "vUX",
    fullName: "Virtual UX Designer",
    progress: 0,
    status: "not_started",
    icon: "image"
  },
  {
    id: "vcto",
    name: "vCTO",
    fullName: "Virtual CTO",
    progress: 0,
    status: "not_started",
    icon: "code"
  },
  {
    id: "vciso",
    name: "vCISO",
    fullName: "Virtual CISO",
    progress: 0,
    status: "not_started",
    icon: "shield"
  },
  {
    id: "vtechwriter",
    name: "vTech Writer",
    fullName: "Virtual Tech Writer",
    progress: 0,
    status: "not_started",
    icon: "file-text"
  }
];

interface IconSelectorProps {
  currentPersona: string
  onChange: (persona: string) => void
}

export function IconSelector({ currentPersona, onChange }: IconSelectorProps) {
  const currentPersonaData = DEFAULT_PERSONAS.find((p) => p.id === currentPersona)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Chatting with: {currentPersonaData?.fullName || currentPersona}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {DEFAULT_PERSONAS.map((persona) => (
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

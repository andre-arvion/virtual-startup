import { Persona } from '@/types';

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

export function getPersonaName(personaId: string): string {
  const persona = DEFAULT_PERSONAS.find((p) => p.id === personaId);
  return persona?.fullName || personaId;
}

export function getPersonaIcon(personaId: string): string {
  const persona = DEFAULT_PERSONAS.find((p) => p.id === personaId);
  return persona?.icon || '';
}

export function getPersonaStatus(personaId: string): 'not_started' | 'in_progress' | 'completed' {
  const persona = DEFAULT_PERSONAS.find((p) => p.id === personaId);
  return persona?.status || 'not_started';
}

export function getPersonaProgress(personaId: string): number {
  const persona = DEFAULT_PERSONAS.find((p) => p.id === personaId);
  return persona?.progress || 0;
} 
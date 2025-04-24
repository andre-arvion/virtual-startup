export interface ProjectBase {
  title: string;
  description: string;
  type: string;
  status: "Planning" | "In Progress" | "Completed";
}

export interface ProjectCreate extends ProjectBase {}

export interface Project extends ProjectBase {
  id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
  phases: {
    frontend: number;
    backend: number;
    integration: number;
  };
  personas: Array<{
    id: string;
    name: string;
    fullName: string;
    progress: number;
    status: "not_started" | "in_progress" | "completed";
    icon: string;
  }>;
  assets: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    description?: string;
    lastUpdated?: string;
    icon: string;
  }>;
}

export interface Phase {
  id: string;
  name: string;
  progress: number;
  tasks: {
    total: number;
    completed: number;
  };
}

export interface Persona {
  id: string;
  name: string;
  fullName: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  icon: string;
  completedSteps?: string[];
}

export interface PersonaResponse {
  id: number;
  projectId: number;
  prompt: string;
  response: string;
  context: Record<string, any>;
  createdAt: string;
}

export interface PersonaSession {
  id: number;
  projectId: number;
  stepsCompleted: string[];
  currentStep: string;
  memory: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface PersonaStepStatus {
  step: string;
  status: 'completed' | 'in_progress' | 'pending';
  completedAt?: string;
}

export interface Asset {
  id: string;
  name: string;
  url: string;
  type: 'ui' | 'repo';
  description?: string;
  lastUpdated: string;
  icon: string;
}

export interface Activity {
  id: string;
  timestamp: string;
  type: string;
  persona?: string;
  text: string;
}

export interface Message {
  id: string;
  persona: string;
  timestamp: string;
  content: string;
  isUser: boolean;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  fields: WizardField[];
}

export interface WizardField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox" | "radio";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  value?: string;
}

export interface Prompt {
  persona: string;
  content: string;
  lastModified: string;
  isModified: boolean;
}

export interface AppSettings {
  model: "openai" | "local";
  theme: "light" | "dark" | "system";
  autosave: boolean;
  user: {
    name: string;
    email: string;
    role: string;
  };
  version: string;
}

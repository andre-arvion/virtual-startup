export interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  status: "Planning" | "In Progress" | "Completed";
  created_date: string;
  updated_date: string;
  phases?: Phase[];
  personas?: Persona[];
  assets?: Asset[];
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
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  icon: string;
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

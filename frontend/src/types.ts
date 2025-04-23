export interface Persona {
  id: string;
  name: string;
  fullName: string;
  completed: boolean;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  created_date: string;
  updated_date: string;
  phases: Record<string, number>;
  personas?: Persona[];
  assets?: Array<{
    name: string;
    url: string;
    type: string;
    icon: string;
  }>;
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

export interface Prompt {
  persona: string;
  content: string;
  lastModified: string;
  isModified: boolean;
}

export interface AppSettings {
  model: string;
  theme: "light" | "dark" | "system";
  autosave: boolean;
  user: {
    name: string;
    email: string;
    role: string;
  };
  version: string;
}

export interface WizardField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{
    label: string;
    value: string;
  }>;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  fields: WizardField[];
} 
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity, AppSettings, Message, Project, Prompt, WizardStep } from '@/types';
import projectsData from '@/mock/projects.json';
import projectMetaData from '@/mock/project_meta.json';
import activitiesData from '@/mock/activity_log.json';
import personaResponsesData from '@/mock/persona_responses.json';
import { readFileSync } from 'fs';

// Types for our store
interface State {
  // Auth
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;

  // Projects
  projects: Project[];
  currentProject: Project | null;
  
  // Activities
  activities: Activity[];
  
  // Chat and messages
  currentPersona: string;
  messages: Record<string, Message[]>;
  isTyping: boolean;
  
  // Wizard
  wizardSteps: WizardStep[];
  currentStep: number;
  wizardData: Record<string, any>;
  
  // Prompts
  prompts: Record<string, Prompt>;
  
  // Settings
  settings: AppSettings;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  fetchProjects: () => Promise<Project[]>;
  fetchProject: (id: string) => Promise<Project | null>;
  createProject: (project: Omit<Project, 'id' | 'created_date' | 'updated_date'>) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<boolean>;
  setCurrentProject: (id: string) => Promise<void>;
  
  fetchActivities: (projectId: string) => Promise<Activity[]>;
  
  fetchMessages: (projectId: string, persona: string) => Promise<Message[]>;
  sendMessage: (projectId: string, persona: string, content: string) => Promise<void>;
  setCurrentPersona: (persona: string) => void;
  
  nextWizardStep: () => void;
  previousWizardStep: () => void;
  setWizardStep: (index: number) => void;
  updateWizardField: (stepId: string, fieldId: string, value: any) => void;
  submitWizard: () => Promise<void>;
  
  fetchPrompt: (persona: string) => Promise<Prompt>;
  updatePrompt: (persona: string, content: string) => Promise<void>;
  resetPrompt: (persona: string) => Promise<void>;
  
  updateSettings: (settings: Partial<AppSettings>) => void;
}

// Mock data helpers
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize empty wizard steps - this would be populated based on the project type
const initialWizardSteps: WizardStep[] = [
  {
    id: "step1",
    title: "Project Overview",
    description: "Define the basic information about your project",
    fields: [
      {
        id: "name",
        label: "Project Name",
        type: "text",
        placeholder: "Enter project name",
        required: true
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Describe your project",
        required: true
      },
      {
        id: "type",
        label: "Project Type",
        type: "select",
        options: [
          { label: "SaaS", value: "SaaS" },
          { label: "Mobile App", value: "Mobile App" },
          { label: "E-commerce", value: "E-commerce" },
          { label: "Healthcare", value: "Healthcare" },
          { label: "Fintech", value: "Fintech" },
          { label: "EdTech", value: "EdTech" },
          { label: "Enterprise", value: "Enterprise" }
        ],
        required: true
      }
    ]
  },
  {
    id: "step2",
    title: "Target Audience",
    description: "Define who your product is for",
    fields: [
      {
        id: "audienceType",
        label: "Primary Audience",
        type: "select",
        options: [
          { label: "Consumers (B2C)", value: "B2C" },
          { label: "Businesses (B2B)", value: "B2B" },
          { label: "Both B2B and B2C", value: "Both" }
        ],
        required: true
      },
      {
        id: "demographics",
        label: "Target Demographics",
        type: "textarea",
        placeholder: "Describe the demographics of your target users",
        required: false
      },
      {
        id: "painPoints",
        label: "User Pain Points",
        type: "textarea",
        placeholder: "What problems are your users facing?",
        required: true
      }
    ]
  },
  {
    id: "step3",
    title: "Core Features",
    description: "Define the key features of your product",
    fields: [
      {
        id: "keyFeatures",
        label: "Key Features",
        type: "textarea",
        placeholder: "List the main features of your product",
        required: true
      },
      {
        id: "uniqueSellingPoint",
        label: "Unique Selling Point",
        type: "textarea",
        placeholder: "What makes your product unique?",
        required: true
      },
      {
        id: "mvpFeatures",
        label: "MVP Features",
        type: "textarea",
        placeholder: "What features are essential for your MVP?",
        required: true
      }
    ]
  }
];

// Create the store
const useStore = create<State>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      projects: [],
      currentProject: null,
      activities: [],
      currentPersona: 'vpm',
      messages: {},
      isTyping: false,
      wizardSteps: initialWizardSteps,
      currentStep: 0,
      wizardData: {},
      prompts: {},
      settings: {
        model: "openai",
        theme: "system",
        autosave: true,
        user: {
          name: "Demo User",
          email: "demo@example.com",
          role: "Founder"
        },
        version: "1.0.0"
      },

      // Auth actions
      login: async (email, password) => {
        await delay(800); // Simulate API call
        
        // Mock authentication (accept any email/password)
        if (email && password) {
          set({
            isAuthenticated: true,
            user: {
              name: email.split('@')[0],
              email,
              role: 'Founder'
            }
          });

          // Initialize project data immediately after login
          const store = get();
          await store.fetchProjects();
          
          // Set the first project as current if none is selected
          const projects = store.projects;
          if (projects.length > 0 && !store.currentProject) {
            await store.setCurrentProject(projects[0].id);
          }
          
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          user: null
        });
      },

      // Project actions
      fetchProjects: async () => {
        await delay(500); // Simulate API call
        const projects = projectsData.projects as Project[];
        set({ projects });
        return projects;
      },
      
      fetchProject: async (id) => {
        await delay(300); // Simulate API call
        
        if (id === projectMetaData.id) {
          set({ currentProject: projectMetaData as unknown as Project });
          return projectMetaData as unknown as Project;
        }
        
        const project = projectsData.projects.find(p => p.id === id) as Project | undefined;
        if (project) {
          set({ currentProject: project });
          return project;
        }
        return null;
      },
      
      createProject: async (projectData) => {
        await delay(800); // Simulate API call
        const newProject: Project = {
          id: `proj-${Date.now().toString(36)}`,
          ...projectData,
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
          phases: {
            frontend: 0,
            backend: 0,
            integration: 0
          },
          personas: [
            {
              id: "vpm",
              name: "vPM",
              fullName: "Virtual Product Manager",
              completed: false,
              icon: "layout-dashboard"
            },
            {
              id: "vux",
              name: "vUX",
              fullName: "Virtual UX Designer",
              completed: false,
              icon: "image"
            },
            {
              id: "vcto",
              name: "vCTO",
              fullName: "Virtual CTO",
              completed: false,
              icon: "code"
            },
            {
              id: "vciso",
              name: "vCISO",
              fullName: "Virtual CISO",
              completed: false,
              icon: "shield"
            },
            {
              id: "vtechwriter",
              name: "vTech Writer",
              fullName: "Virtual Tech Writer",
              completed: false,
              icon: "file-text"
            }
          ],
          assets: []
        };
        
        set(state => ({
          projects: [...state.projects, newProject],
          currentProject: newProject // Set as current project
        }));
        
        return newProject;
      },
      
      updateProject: async (id, updates) => {
        await delay(500); // Simulate API call
        const { projects } = get();
        const index = projects.findIndex(p => p.id === id);
        
        if (index === -1) return null;
        
        const updatedProject = {
          ...projects[index],
          ...updates,
          updated_date: new Date().toISOString()
        };
        
        const updatedProjects = [...projects];
        updatedProjects[index] = updatedProject;
        
        set({
          projects: updatedProjects,
          currentProject: id === get().currentProject?.id ? updatedProject : get().currentProject
        });
        
        return updatedProject;
      },
      
      deleteProject: async (id) => {
        await delay(500); // Simulate API call
        const { projects, currentProject } = get();
        
        set({
          projects: projects.filter(p => p.id !== id),
          currentProject: currentProject?.id === id ? null : currentProject
        });
        
        return true;
      },
      
      setCurrentProject: async (id) => {
        await get().fetchProject(id);
      },
      
      // Activity actions
      fetchActivities: async (projectId) => {
        await delay(300); // Simulate API call
        const activities = activitiesData.activities;
        set({ activities });
        return activities;
      },
      
      // Chat and message actions
      fetchMessages: async (projectId, persona) => {
        await delay(400); // Simulate API call
        const personaKey = persona.toLowerCase();
        
        if (personaResponsesData[personaKey]) {
          set(state => ({
            messages: {
              ...state.messages,
              [personaKey]: personaResponsesData[personaKey]
            }
          }));
          return personaResponsesData[personaKey];
        }
        
        return [];
      },
      
      sendMessage: async (projectId, persona, content) => {
        const personaKey = persona.toLowerCase();
        const newMessage: Message = {
          id: `msg-${Date.now().toString(36)}`,
          persona: 'user',
          timestamp: new Date().toISOString(),
          content,
          isUser: true
        };
        
        // Add the user message immediately
        set(state => ({
          messages: {
            ...state.messages,
            [personaKey]: [...(state.messages[personaKey] || []), newMessage]
          }
        }));
        
        // Set typing indicator
        set({ isTyping: true });
        
        // Simulate response delay
        await delay(1500);
        
        // Create a fake response
        const responseMessage: Message = {
          id: `msg-${Date.now().toString(36)}`,
          persona: personaKey,
          timestamp: new Date().toISOString(),
          content: `This is a simulated response from ${persona}. In a real implementation, this would be a response from an AI model based on the prompts defined for this persona.`,
          isUser: false
        };
        
        // Add the response
        set(state => ({
          isTyping: false,
          messages: {
            ...state.messages,
            [personaKey]: [...(state.messages[personaKey] || []), responseMessage]
          }
        }));
      },
      
      setCurrentPersona: (persona) => {
        set({ currentPersona: persona });
      },
      
      // Wizard actions
      nextWizardStep: () => {
        const { currentStep, wizardSteps } = get();
        if (currentStep < wizardSteps.length - 1) {
          set({ currentStep: currentStep + 1 });
        }
      },
      
      previousWizardStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },
      
      setWizardStep: (index) => {
        const { wizardSteps } = get();
        if (index >= 0 && index < wizardSteps.length) {
          set({ currentStep: index });
        }
      },
      
      updateWizardField: (stepId, fieldId, value) => {
        set(state => ({
          wizardData: {
            ...state.wizardData,
            [`${stepId}.${fieldId}`]: value
          }
        }));
      },
      
      submitWizard: async () => {
        await delay(800); // Simulate API call
        
        const { wizardData } = get();
        
        // Processing would happen here in a real implementation
        console.log('Wizard data submitted:', wizardData);
        
        // Reset wizard
        set({
          currentStep: 0,
          wizardData: {}
        });
      },
      
      // Prompt actions
      fetchPrompt: async (persona) => {
        await delay(300); // Simulate API call
        
        // In a real implementation, this would fetch from the server
        // For now, we'll return placeholder data
        const prompt: Prompt = {
          persona,
          content: `# ${persona} Prompt\n\nThis is a placeholder for the ${persona} prompt content. In a real implementation, this would be loaded from the server.`,
          lastModified: new Date().toISOString(),
          isModified: false
        };
        
        set(state => ({
          prompts: {
            ...state.prompts,
            [persona]: prompt
          }
        }));
        
        return prompt;
      },
      
      updatePrompt: async (persona, content) => {
        await delay(500); // Simulate API call
        
        set(state => ({
          prompts: {
            ...state.prompts,
            [persona]: {
              persona,
              content,
              lastModified: new Date().toISOString(),
              isModified: true
            }
          }
        }));
      },
      
      resetPrompt: async (persona) => {
        await delay(500); // Simulate API call
        
        // In a real implementation, this would fetch the default prompt
        await get().fetchPrompt(persona);
      },
      
      // Settings actions
      updateSettings: (settingsUpdate) => {
        set(state => ({
          settings: {
            ...state.settings,
            ...settingsUpdate
          }
        }));
      }
    }),
    {
      name: 'virtual-startup-platform-storage',
    }
  )
);

export default useStore;

import { Project, Activity, Message, Prompt } from "@/types";

export const mockProject: Project = {
  id: "1",
  name: "Virtual Startup Platform",
  description: "AI-powered workspace for startup planning and development",
  type: "New Startup",
  status: "In Progress",
  created_date: "2024-03-20T10:00:00Z",
  updated_date: "2024-03-21T15:30:00Z",
  phases: [
    {
      id: "1",
      name: "Frontend Development",
      progress: 75,
      tasks: {
        total: 20,
        completed: 15
      }
    },
    {
      id: "2",
      name: "Backend Development",
      progress: 30,
      tasks: {
        total: 25,
        completed: 8
      }
    },
    {
      id: "3",
      name: "Integration & Testing",
      progress: 10,
      tasks: {
        total: 15,
        completed: 2
      }
    }
  ],
  personas: [
    {
      id: "vpm",
      name: "vPM",
      fullName: "Virtual Product Manager",
      progress: 100,
      status: "completed",
      icon: "🎯"
    },
    {
      id: "vux",
      name: "vUX",
      fullName: "UX Designer",
      progress: 80,
      status: "in_progress",
      icon: "🎨"
    },
    {
      id: "vcto",
      name: "vCTO",
      fullName: "Technical Architect",
      progress: 45,
      status: "in_progress",
      icon: "⚙️"
    },
    {
      id: "vciso",
      name: "vCISO",
      fullName: "Security Analyst",
      progress: 0,
      status: "not_started",
      icon: "🔒"
    }
  ],
  assets: [
    {
      id: "1",
      name: "UI Design in Figma",
      url: "https://figma.com/file/xyz",
      type: "ui",
      description: "Main application interface designs",
      lastUpdated: "2024-03-21T12:00:00Z",
      icon: "🎨"
    },
    {
      id: "2",
      name: "Frontend Repository",
      url: "https://github.com/org/frontend",
      type: "repo",
      description: "React + TypeScript implementation",
      lastUpdated: "2024-03-21T14:30:00Z",
      icon: "💻"
    }
  ]
};

export const mockActivities: Activity[] = [
  {
    id: "1",
    timestamp: "2024-03-21T15:30:00Z",
    type: "update",
    persona: "vPM",
    text: "Updated project requirements documentation"
  },
  {
    id: "2",
    timestamp: "2024-03-21T14:45:00Z",
    type: "completion",
    persona: "vUX",
    text: "Completed user flow diagrams"
  },
  {
    id: "3",
    timestamp: "2024-03-21T13:15:00Z",
    type: "start",
    persona: "vCTO",
    text: "Started technical architecture planning"
  }
];

export const mockMessages: Record<string, Message[]> = {
  vpm: [
    {
      id: "1",
      persona: "vPM",
      timestamp: "2024-03-21T10:00:00Z",
      content: "Hello! I'm your Virtual Product Manager. Let's define your project goals.",
      isUser: false
    }
  ],
  vux: [
    {
      id: "1",
      persona: "vUX",
      timestamp: "2024-03-21T10:30:00Z",
      content: "Hi! I'm your UX Designer. Ready to plan the user experience?",
      isUser: false
    }
  ]
};

export const mockPrompts: Prompt[] = [
  {
    persona: "vPM",
    content: "You are a Virtual Product Manager...",
    lastModified: "2024-03-20T10:00:00Z",
    isModified: false
  },
  {
    persona: "vUX",
    content: "You are a UX Designer...",
    lastModified: "2024-03-20T10:00:00Z",
    isModified: false
  }
]; 

import { WizardStep } from "@/types";
import { CheckIcon } from "lucide-react";

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: number;
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <div className="relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
      <ol className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <li key={step.id} className="flex flex-col items-center">
              <div 
                className={`flex h-8 w-8 items-center justify-center rounded-full text-center text-sm border-2 font-medium ${
                  isCompleted 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : isCurrent
                      ? "bg-background border-primary text-foreground"
                      : "bg-background border-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span 
                className={`mt-2 hidden md:block text-xs ${
                  isCurrent ? "font-medium" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

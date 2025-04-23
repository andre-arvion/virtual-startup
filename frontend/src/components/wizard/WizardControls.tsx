
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface WizardControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  isNextDisabled: boolean;
}

export function WizardControls({
  onPrevious,
  onNext,
  onSubmit,
  isFirstStep,
  isLastStep,
  isSubmitting,
  isNextDisabled,
}: WizardControlsProps) {
  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      
      {isLastStep ? (
        <Button 
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || isNextDisabled}
          className="min-w-[100px]"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Submit
            </>
          )}
        </Button>
      ) : (
        <Button 
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

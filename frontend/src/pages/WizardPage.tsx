
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { WizardStepForm } from "@/components/wizard/WizardStepForm";
import { WizardProgress } from "@/components/wizard/WizardProgress";
import { WizardControls } from "@/components/wizard/WizardControls";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useStore from "@/store/useStore";

export function WizardPage() {
  const { 
    wizardSteps,
    currentStep,
    nextWizardStep,
    previousWizardStep,
    updateWizardField,
    submitWizard,
    wizardData,
  } = useStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFieldChange = (stepId: string, fieldId: string, value: string) => {
    updateWizardField(stepId, fieldId, value);
  };

  const handleNext = () => {
    nextWizardStep();
  };

  const handlePrevious = () => {
    previousWizardStep();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitWizard();
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = wizardSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === wizardSteps.length - 1;

  // Check if the current step is complete (all required fields have values)
  const isStepComplete = () => {
    if (!currentStepData) return false;
    
    return currentStepData.fields.every(field => {
      if (!field.required) return true;
      const value = wizardData[`${currentStepData.id}.${field.id}`];
      return value !== undefined && value !== "";
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Project Wizard</h1>
          <p className="text-muted-foreground">Configure your project step by step</p>
        </div>

        <WizardProgress 
          steps={wizardSteps}
          currentStep={currentStep}
        />

        <Card>
          <CardHeader>
            <CardTitle>{currentStepData?.title || "Loading..."}</CardTitle>
            <CardDescription>
              {currentStepData?.description || ""}
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            {currentStepData ? (
              <WizardStepForm 
                step={currentStepData} 
                onChange={handleFieldChange}
                formData={wizardData}
              />
            ) : (
              <div>Loading wizard steps...</div>
            )}
          </CardContent>
        </Card>

        <WizardControls 
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          isNextDisabled={!isStepComplete()}
        />
      </div>
    </Layout>
  );
}

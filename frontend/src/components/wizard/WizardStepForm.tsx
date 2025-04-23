
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WizardField, WizardStep } from "@/types";

interface WizardStepFormProps {
  step: WizardStep;
  onChange: (stepId: string, fieldId: string, value: any) => void;
  formData: Record<string, any>;
}

export function WizardStepForm({ step, onChange, formData }: WizardStepFormProps) {
  const renderField = (field: WizardField) => {
    const fieldKey = `${step.id}.${field.id}`;
    const value = formData[fieldKey] || field.value || '';
    
    switch (field.type) {
      case "text":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={field.required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
              {field.label}
            </Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(step.id, field.id, e.target.value)}
              required={field.required}
            />
          </div>
        );
      
      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={field.required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
              {field.label}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(step.id, field.id, e.target.value)}
              required={field.required}
            />
          </div>
        );
      
      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={field.required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
              {field.label}
            </Label>
            <Select 
              defaultValue={value} 
              onValueChange={(val) => onChange(step.id, field.id, val)}
            >
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={field.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case "checkbox":
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value === "true" || value === true}
              onCheckedChange={(checked) => {
                onChange(step.id, field.id, checked.toString());
              }}
            />
            <Label htmlFor={field.id} className={field.required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
              {field.label}
            </Label>
          </div>
        );
      
      case "radio":
        return (
          <div key={field.id} className="space-y-2">
            <Label className={field.required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
              {field.label}
            </Label>
            <RadioGroup 
              value={value} 
              onValueChange={(val) => onChange(step.id, field.id, val)}
            >
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                  <Label htmlFor={`${field.id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {step.fields.map(renderField)}
    </div>
  );
}

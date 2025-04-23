
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import useStore from "@/store/useStore";
import { AppSettings } from "@/types";
import { useToast } from "@/hooks/use-toast";

export function SettingsPage() {
  const { settings, updateSettings } = useStore();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState<AppSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleModelChange = (value: "openai" | "local") => {
    setFormState((prev) => ({ ...prev, model: value }));
  };
  
  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setFormState((prev) => ({ ...prev, theme: value }));
  };
  
  const handleAutosaveChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, autosave: checked }));
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate a delay for API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      updateSettings(formState);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save settings",
        description: "There was an error saving your settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings and preferences
          </p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model</CardTitle>
              <CardDescription>
                Choose which AI model to use for generating responses
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <RadioGroup
                value={formState.model}
                onValueChange={handleModelChange as (value: string) => void}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="openai" id="openai" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="openai" className="font-medium">
                      OpenAI
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Uses OpenAI's models for more advanced responses. Requires API key setup.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mt-4">
                  <RadioGroupItem value="local" id="local" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="local" className="font-medium">
                      Local Model
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Uses a local model for privacy and offline operation. May have reduced capabilities.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks and feels
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <RadioGroup
                value={formState.theme}
                onValueChange={handleThemeChange as (value: string) => void}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system">System</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Editor Preferences</CardTitle>
              <CardDescription>
                Configure how the editor behaves
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autosave">Autosave</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save changes as you type
                  </p>
                </div>
                <Switch
                  id="autosave"
                  checked={formState.autosave}
                  onCheckedChange={handleAutosaveChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>
                System information and application details
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-sm text-muted-foreground">{formState.user.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{formState.user.email}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm text-muted-foreground">{formState.user.role}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Version</p>
                  <p className="text-sm text-muted-foreground">{formState.version}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

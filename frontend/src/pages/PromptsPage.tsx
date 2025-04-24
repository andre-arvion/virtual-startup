import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Prompt } from "@/types";
import useStore from "@/store/useStore";
import ReactMarkdown from "react-markdown";
import { AlertCircle, Check, Copy, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getPersonaName } from '@/utils/persona';

export function PromptsPage() {
  const [activePersona, setActivePersona] = useState<string>("vpm");
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { currentProject, prompts, fetchPrompt, updatePrompt, resetPrompt } = useStore();
  const { toast } = useToast();
  
  const personas = currentProject?.personas || [];
  const currentPrompt = prompts[activePersona];
  
  useEffect(() => {
    if (activePersona) {
      setLoading(true);
      fetchPrompt(activePersona)
        .then((prompt: Prompt) => {
          setEditedContent(prompt.content);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [activePersona, fetchPrompt]);
  
  const handleTabChange = (value: string) => {
    // Save current edits if needed
    if (isEditing && currentPrompt && editedContent !== currentPrompt.content) {
      // Maybe prompt user to save changes
      const confirmChange = window.confirm("Do you want to save your changes before switching tabs?");
      if (confirmChange) {
        handleSave();
      }
    }
    
    setActivePersona(value);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePrompt(activePersona, editedContent);
      setIsEditing(false);
      toast({
        title: "Prompt saved",
        description: `The prompt for ${getPersonaName(activePersona, personas)} has been updated.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save prompt",
        description: "There was an error saving your changes. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    setEditedContent(currentPrompt?.content || "");
    setIsEditing(false);
  };
  
  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset this prompt to its default value?")) {
      setLoading(true);
      try {
        await resetPrompt(activePersona);
        toast({
          title: "Prompt reset",
          description: `The prompt for ${getPersonaName(activePersona, personas)} has been reset to default.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to reset prompt",
          description: "There was an error resetting the prompt. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt?.content || "");
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard."
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">AI Prompt Editor</h1>
          <p className="text-muted-foreground">
            Customize AI persona prompts to fine-tune responses
          </p>
        </div>
        
        <Tabs defaultValue={activePersona} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            {personas.map((persona) => (
              <TabsTrigger key={persona.id} value={persona.id}>
                {persona.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {getPersonaName(activePersona, personas)} Prompt
                  </CardTitle>
                  <CardDescription>
                    Last modified: {currentPrompt?.lastModified 
                      ? new Date(currentPrompt.lastModified).toLocaleString() 
                      : 'Never'
                    }
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                  >
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" /> Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentPrompt?.isModified && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Modified Prompt</AlertTitle>
                  <AlertDescription>
                    This prompt has been customized from the default version.
                  </AlertDescription>
                </Alert>
              )}
              
              {loading ? (
                <div className="flex justify-center p-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Enter prompt content..."
                    className="min-h-[300px] font-mono"
                  />
                </div>
              ) : (
                <div className="border rounded-md p-4 bg-muted/50">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>
                      {currentPrompt?.content || "No prompt content available."}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between pt-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel} disabled={loading}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit} disabled={loading} className="ml-auto">
                  Edit Prompt
                </Button>
              )}
            </CardFooter>
          </Card>
        </Tabs>
      </div>
    </Layout>
  );
}

export default PromptsPage;

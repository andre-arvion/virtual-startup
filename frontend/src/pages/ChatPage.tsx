
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { MessageSquare, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Message } from "@/types";
import useStore from "@/store/useStore";
import ReactMarkdown from "react-markdown";
import { IconSelector } from "@/components/chat/IconSelector";

export function ChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    currentProject,
    currentPersona,
    messages,
    isTyping,
    fetchMessages,
    sendMessage,
    setCurrentPersona,
  } = useStore();

  const currentMessages = messages[currentPersona] || [];

  useEffect(() => {
    if (currentProject && currentPersona) {
      setLoading(true);
      fetchMessages(currentProject.id, currentPersona).finally(() => {
        setLoading(false);
      });
    }
  }, [currentProject, currentPersona, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !currentProject) return;
    
    sendMessage(currentProject.id, currentPersona, message);
    setMessage("");
    
    // Focus the input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-2xl font-bold">Chat with AI Persona</h1>
          <IconSelector 
            currentPersona={currentPersona} 
            personas={currentProject?.personas || []} 
            onChange={setCurrentPersona}
          />
        </div>
        <Separator />

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : currentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
              <h3 className="font-medium text-lg">No messages yet</h3>
              <p className="max-w-sm">
                Start a conversation with {getPersonaName(currentPersona, currentProject?.personas)} to receive guidance on your project.
              </p>
            </div>
          ) : (
            <>
              {currentMessages.map((msg: Message) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`flex max-w-[85%] ${
                      msg.isUser ? "flex-row-reverse" : "flex-row"
                    } gap-3 items-start`}
                  >
                    <Avatar className={`h-8 w-8 ${msg.isUser ? "ml-2" : "mr-2"}`}>
                      <AvatarFallback>
                        {msg.isUser ? "U" : msg.persona.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className={`rounded-lg px-4 py-2 ${
                        msg.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] flex-row gap-3 items-start">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>
                        {currentPersona.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-3 bg-muted">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="pt-4 border-t">
          <div className="flex gap-2">
            <Textarea
              ref={inputRef}
              placeholder={`Message ${getPersonaName(currentPersona, currentProject?.personas)}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[60px] max-h-[200px] resize-none"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!message.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

function getPersonaName(personaId: string, personas?: Array<{ id: string; fullName: string }>) {
  if (!personas) return personaId;
  const persona = personas.find((p) => p.id === personaId);
  return persona?.fullName || personaId;
}

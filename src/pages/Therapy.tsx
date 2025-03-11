
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTherapyPreferences } from "@/lib/data";
import { Brain, ChevronRight, Edit, MessageCircle, Pencil, Save, Send, Settings, Smile, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types";

// These are the default therapy prompts that can be customized
const defaultPrompts = {
  greetings: [
    "Hello! I'm your AI therapist. How are you feeling today?",
    "Welcome to your therapy session. What's on your mind today?",
    "I'm here to support you. How can I help you today?"
  ],
  responses: [
    "Thank you for sharing that. Could you tell me more about how that makes you feel?",
    "I understand this might be difficult. What do you think is underlying these feelings?",
    "That's important insight. How long have you been experiencing this?",
    "I hear you. Let's explore some techniques that might help with this situation. Would that be helpful?",
    "It sounds like this has been challenging for you. What coping strategies have you tried so far?"
  ]
};

const TherapyPage = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [prompts, setPrompts] = useState(() => {
    const savedPrompts = localStorage.getItem('therapy_prompts');
    return savedPrompts ? JSON.parse(savedPrompts) : defaultPrompts;
  });
  const [editMode, setEditMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save prompts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('therapy_prompts', JSON.stringify(prompts));
  }, [prompts]);

  // Handle preference toggle
  const togglePreference = (prefId: string) => {
    setPreferences(prev => 
      prev.includes(prefId) 
        ? prev.filter(id => id !== prefId) 
        : [...prev, prefId]
    );
  };

  // Handle starting a session
  const startSession = () => {
    if (preferences.length === 0) {
      toast({
        title: "Please select at least one therapy preference",
        variant: "destructive",
      });
      return;
    }

    setSessionStarted(true);
    setActiveTab("chat");
    
    // Initial greeting based on preferences
    const selectedPrefs = mockTherapyPreferences.filter(pref => preferences.includes(pref.id));
    const prefNames = selectedPrefs.map(pref => pref.name.toLowerCase()).join(", ");
    
    // Get a random greeting from the available prompts
    const greetingsIndex = Math.floor(Math.random() * prompts.greetings.length);
    const greeting = prompts.greetings[greetingsIndex].replace('[THERAPY_TYPE]', prefNames);
    
    const initialMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: greeting,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([initialMessage]);
  };

  // Handle sending a message
  const sendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);
    
    // Check if OpenAI API key exists
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (apiKey) {
      // In a real implementation, this would send the message to OpenAI
      console.log("Using OpenAI API with key:", apiKey);
      // For now, we'll still use the local responses
      setTimeout(sendLocalResponse, 1500);
    } else {
      // Use local mock responses
      setTimeout(sendLocalResponse, 1500);
    }
  };
  
  // Send a response using the local prompts
  const sendLocalResponse = () => {
    const responseIndex = Math.floor(Math.random() * prompts.responses.length);
    
    const aiResponse: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: prompts.responses[responseIndex],
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, aiResponse]);
    setIsThinking(false);
  };
  
  // Update a specific prompt
  const updatePrompt = (type: 'greetings' | 'responses', index: number, value: string) => {
    setPrompts(prev => {
      const newPrompts = { ...prev };
      newPrompts[type][index] = value;
      return newPrompts;
    });
  };
  
  // Add a new prompt
  const addPrompt = (type: 'greetings' | 'responses') => {
    setPrompts(prev => {
      const newPrompts = { ...prev };
      newPrompts[type] = [...newPrompts[type], ""];
      return newPrompts;
    });
  };
  
  // Remove a prompt
  const removePrompt = (type: 'greetings' | 'responses', index: number) => {
    setPrompts(prev => {
      const newPrompts = { ...prev };
      newPrompts[type] = newPrompts[type].filter((_, i) => i !== index);
      return newPrompts;
    });
  };
  
  // Save prompts and exit edit mode
  const savePrompts = () => {
    // Filter out empty prompts
    setPrompts(prev => ({
      greetings: prev.greetings.filter(p => p.trim() !== ""),
      responses: prev.responses.filter(p => p.trim() !== "")
    }));
    
    setEditMode(false);
    toast({
      title: "Prompts saved",
      description: "Your custom therapy prompts have been saved",
    });
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-10 min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Therapy Session</h1>
            <p className="text-therapy-text-muted">Personalized support for your mental wellness</p>
          </div>
          {sessionStarted && (
            <Button
              variant="outline"
              className="border-therapy-accent text-therapy-accent hover:bg-therapy-accent/10"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Prompts
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Prompts
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6 bg-therapy-muted rounded-xl p-1">
          <TabsTrigger 
            value="preferences" 
            disabled={sessionStarted && !editMode}
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-therapy-accent"
          >
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            disabled={!sessionStarted}
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-therapy-accent"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Therapy Chat
          </TabsTrigger>
        </TabsList>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences" className="flex-1 flex flex-col">
          {editMode ? (
            <Card className="border border-therapy-muted flex-1">
              <CardContent className="p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="h-16 w-16 rounded-full bg-therapy-muted flex items-center justify-center mx-auto mb-4">
                      <Pencil className="h-8 w-8 text-therapy-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Customize Therapy Prompts</h2>
                    <p className="text-therapy-text-muted mb-6">
                      Edit the AI responses to personalize your therapy experience
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Greeting Prompts */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Greeting Messages</h3>
                      <p className="text-sm text-therapy-text-muted mb-4">
                        These messages are used to start the conversation. Use [THERAPY_TYPE] to include the selected therapy type.
                      </p>
                      
                      <div className="space-y-3">
                        {prompts.greetings.map((prompt, index) => (
                          <div key={`greeting-${index}`} className="flex gap-2">
                            <Textarea 
                              value={prompt}
                              onChange={(e) => updatePrompt('greetings', index, e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="flex-shrink-0 text-red-500 hover:text-red-600"
                              onClick={() => removePrompt('greetings', index)}
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="mt-3 text-therapy-accent"
                        onClick={() => addPrompt('greetings')}
                      >
                        + Add New Greeting
                      </Button>
                    </div>
                    
                    {/* Response Prompts */}
                    <div>
                      <h3 className="text-lg font-medium mb-3">Response Messages</h3>
                      <p className="text-sm text-therapy-text-muted mb-4">
                        These messages are used to respond to user messages during the conversation.
                      </p>
                      
                      <div className="space-y-3">
                        {prompts.responses.map((prompt, index) => (
                          <div key={`response-${index}`} className="flex gap-2">
                            <Textarea 
                              value={prompt}
                              onChange={(e) => updatePrompt('responses', index, e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="flex-shrink-0 text-red-500 hover:text-red-600"
                              onClick={() => removePrompt('responses', index)}
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="mt-3 text-therapy-accent"
                        onClick={() => addPrompt('responses')}
                      >
                        + Add New Response
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button 
                      size="lg" 
                      className="bg-therapy-accent hover:bg-therapy-secondary text-white rounded-xl"
                      onClick={savePrompts}
                    >
                      Save Custom Prompts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-therapy-muted flex-1">
              <CardContent className="p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="h-16 w-16 rounded-full bg-therapy-muted flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-therapy-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Customize Your Therapy Experience</h2>
                    <p className="text-therapy-text-muted">
                      Select the therapy approaches that resonate with you for a personalized session.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {mockTherapyPreferences.map((pref) => (
                      <motion.div
                        key={pref.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card 
                          className={`border cursor-pointer transition-all duration-300 ${
                            preferences.includes(pref.id) 
                              ? "border-therapy-accent bg-therapy-accent/5" 
                              : "border-therapy-muted hover:border-therapy-accent/30"
                          }`}
                          onClick={() => togglePreference(pref.id)}
                        >
                          <CardContent className="p-4 flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-therapy-muted flex items-center justify-center flex-shrink-0">
                              {pref.icon === "brain" && <Brain className="h-5 w-5 text-therapy-accent" />}
                              {pref.icon === "leaf" && <Sun className="h-5 w-5 text-therapy-accent" />}
                              {pref.icon === "lightbulb" && <svg className="h-5 w-5 text-therapy-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>}
                              {pref.icon === "heart" && <Smile className="h-5 w-5 text-therapy-accent" />}
                            </div>
                            <div>
                              <h3 className="font-medium mb-1">{pref.name}</h3>
                              <p className="text-sm text-therapy-text-muted">{pref.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      size="lg" 
                      className="bg-therapy-accent hover:bg-therapy-secondary text-white rounded-xl"
                      onClick={startSession}
                    >
                      Start Therapy Session <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col">
          {sessionStarted ? (
            <Card className="border border-therapy-muted flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin mb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[80%] p-4 rounded-xl ${
                            message.role === "user" 
                              ? "bg-therapy-accent text-white rounded-tr-none" 
                              : "bg-therapy-muted rounded-tl-none"
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    {isThinking && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-therapy-muted p-4 rounded-xl rounded-tl-none flex items-center space-x-2 max-w-[80%]">
                          <div className="w-2 h-2 rounded-full bg-therapy-accent animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-therapy-accent animate-pulse delay-150"></div>
                          <div className="w-2 h-2 rounded-full bg-therapy-accent animate-pulse delay-300"></div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </AnimatePresence>
                </div>
                
                <div className="flex gap-3">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage} 
                    className="bg-therapy-accent hover:bg-therapy-secondary text-white"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Card className="border border-therapy-muted w-full max-w-md text-center p-8">
                <CardContent className="p-6">
                  <div className="h-16 w-16 rounded-full bg-therapy-muted flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-therapy-accent" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Set Your Preferences First</h2>
                  <p className="text-therapy-text-muted mb-4">
                    Please select your therapy preferences before starting a session.
                  </p>
                  <Button
                    onClick={() => setActiveTab("preferences")}
                    variant="outline"
                    className="border-therapy-accent text-therapy-accent hover:bg-therapy-accent/10"
                  >
                    Go to Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TherapyPage;

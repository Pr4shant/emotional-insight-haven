
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTherapyPreferences } from "@/lib/data";
import { Brain, ChevronRight, MessageCircle, Send, Settings, Smile, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types";

const TherapyPage = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    
    const initialMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Hello! I'm your AI therapist specializing in ${prefNames} therapy. How are you feeling today?`,
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
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const mockResponses = [
        "Thank you for sharing that. Could you tell me more about how that makes you feel?",
        "I understand this might be difficult. What do you think is underlying these feelings?",
        "That's important insight. How long have you been experiencing this?",
        "I hear you. Let's explore some techniques that might help with this situation. Would that be helpful?",
        "It sounds like this has been challenging for you. What coping strategies have you tried so far?",
      ];
      
      const aiResponse: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-10 min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Therapy Session</h1>
        <p className="text-muted-foreground">Personalized support for your mental wellness</p>
      </motion.div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6 bg-muted rounded-xl p-1">
          <TabsTrigger 
            value="preferences" 
            disabled={sessionStarted}
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            disabled={!sessionStarted}
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Therapy Chat
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences" className="flex-1 flex flex-col">
          <Card className="border-border flex-1">
            <CardContent className="p-6">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Customize Your Therapy Experience</h2>
                  <p className="text-muted-foreground">
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
                            ? "border-primary bg-primary/5" 
                            : "border-muted hover:border-primary/30"
                        }`}
                        onClick={() => togglePreference(pref.id)}
                      >
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            {pref.icon === "brain" && <Brain className="h-5 w-5 text-primary" />}
                            {pref.icon === "leaf" && <Sun className="h-5 w-5 text-primary" />}
                            {pref.icon === "lightbulb" && <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>}
                            {pref.icon === "heart" && <Smile className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">{pref.name}</h3>
                            <p className="text-sm text-muted-foreground">{pref.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="rounded-xl"
                    onClick={startSession}
                  >
                    Start Therapy Session <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chat" className="flex-1 flex flex-col">
          {sessionStarted ? (
            <Card className="border-border flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin mb-4">
                  <AnimatePresence mode="wait">
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
                              ? "bg-primary text-primary-foreground rounded-tr-none" 
                              : "bg-muted rounded-tl-none"
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    {/* Typing indicator - Only show when isThinking is true */}
                    {isThinking && (
                      <motion.div
                        key="typing-indicator"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-start"
                      >
                        <div className="bg-muted p-4 rounded-xl rounded-tl-none flex items-center space-x-2 max-w-[80%]">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
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
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Card className="border-border w-full max-w-md text-center p-8">
                <CardContent className="p-6">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Set Your Preferences First</h2>
                  <p className="text-muted-foreground mb-4">
                    Please select your therapy preferences before starting a session.
                  </p>
                  <Button
                    onClick={() => setActiveTab("preferences")}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
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

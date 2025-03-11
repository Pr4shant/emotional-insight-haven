
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mockUserSettings } from "@/lib/data";
import { Bell, Clock, Smile, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Settings = () => {
  const [settings, setSettings] = useState(mockUserSettings);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully",
    });
  };
  
  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handlePreferenceChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };
  
  return (
    <div className="container mx-auto px-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-therapy-text-muted">Customize your therapy experience</p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border border-therapy-muted">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5 text-therapy-accent" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-therapy-accent hover:bg-therapy-secondary text-white"
                  >
                    Save Profile Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border border-therapy-muted">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Smile className="h-5 w-5 text-therapy-accent" />
                  Therapy Preferences
                </CardTitle>
                <CardDescription>
                  Customize your therapy experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="therapist-style">Therapist Communication Style</Label>
                      <Select 
                        value={settings.preferences.therapistStyle}
                        onValueChange={(value) => handlePreferenceChange("therapistStyle", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Compassionate and direct">Compassionate and direct</SelectItem>
                          <SelectItem value="Warm and supportive">Warm and supportive</SelectItem>
                          <SelectItem value="Analytical and insightful">Analytical and insightful</SelectItem>
                          <SelectItem value="Solution-focused">Solution-focused</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="session-duration">Default Session Duration</Label>
                      <Select 
                        value={settings.preferences.sessionDuration.toString()}
                        onValueChange={(value) => handlePreferenceChange("sessionDuration", parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-therapy-accent hover:bg-therapy-secondary text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Therapy preferences updated",
                        description: "Your changes have been saved successfully",
                      });
                    }}
                  >
                    Save Therapy Preferences
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border border-therapy-muted">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bell className="h-5 w-5 text-therapy-accent" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="flex-1">
                      Enable notifications
                    </Label>
                    <Switch
                      id="notifications"
                      checked={settings.preferences.notifications}
                      onCheckedChange={(checked) => handlePreferenceChange("notifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound-effects" className="flex-1">
                      Enable sound effects
                    </Label>
                    <Switch
                      id="sound-effects"
                      checked={settings.preferences.soundEffects}
                      onCheckedChange={(checked) => handlePreferenceChange("soundEffects", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border border-therapy-muted">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <svg className="h-5 w-5 text-therapy-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Privacy
                </CardTitle>
                <CardDescription>
                  Manage your privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-collection" className="flex-1">
                      Allow data collection for personalization
                    </Label>
                    <Switch
                      id="data-collection"
                      defaultChecked={true}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous-insights" className="flex-1">
                      Share anonymous insights to improve AI
                    </Label>
                    <Switch
                      id="anonymous-insights"
                      defaultChecked={true}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full border-therapy-accent text-therapy-accent hover:bg-therapy-accent/10"
                    onClick={() => {
                      toast({
                        title: "Privacy settings updated",
                        description: "Your changes have been saved successfully",
                      });
                    }}
                  >
                    Save Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border border-therapy-muted">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-therapy-accent" />
                  Theme
                </CardTitle>
                <CardDescription>
                  Choose your preferred theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue={settings.preferences.theme}
                  onValueChange={(value) => handlePreferenceChange("theme", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

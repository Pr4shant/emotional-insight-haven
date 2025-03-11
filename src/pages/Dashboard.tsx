
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTherapySessions, mockUserPersonality } from "@/lib/data";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from "recharts";
import { Brain, Calendar, Clock, HeartPulse, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { MoodProgress } from "@/components/MoodProgress";
import { TraitProgress } from "@/components/TraitProgress";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate session statistics
  const totalSessions = mockTherapySessions.length;
  const totalMinutes = mockTherapySessions.reduce((acc, session) => acc + session.duration, 0);
  const averageMoodImprovement = mockTherapySessions.reduce((acc, session) => 
    acc + (session.mood.after - session.mood.before), 0) / totalSessions;
  
  // Format data for mood chart
  const moodData = mockTherapySessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    before: session.mood.before,
    after: session.mood.after,
    topic: session.topic
  }));
  
  // Format data for session duration chart
  const durationData = mockTherapySessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    duration: session.duration,
    topic: session.topic
  }));
  
  // Format personality data for radar chart
  const personalityData = [
    Object.entries(mockUserPersonality.traits).reduce((obj, [trait, value]) => {
      obj[trait] = value;
      obj.fullMark = 100;
      return obj;
    }, {} as any)
  ];
  
  // Colors for the personality traits
  const COLORS = ['#9b87f5', '#7E69AB', '#64c9cc', '#6c5ce7', '#a29bfe'];
  
  return (
    <div className="container mx-auto px-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Your Wellness Dashboard</h1>
        <p className="text-therapy-text-muted">Track your therapy journey and gain insights about yourself</p>
      </motion.div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-therapy-muted rounded-xl p-1">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-therapy-accent">
            Overview
          </TabsTrigger>
          <TabsTrigger value="sessions" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-therapy-accent">
            Session History
          </TabsTrigger>
          <TabsTrigger value="insights" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-therapy-accent">
            Personality Insights
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                title: "Total Sessions",
                value: totalSessions.toString(),
                icon: <Brain className="h-4 w-4" />,
                description: "Therapy sessions completed" 
              },
              { 
                title: "Total Minutes",
                value: totalMinutes.toString(),
                icon: <Clock className="h-4 w-4" />,
                description: "Minutes spent in therapy" 
              },
              { 
                title: "Avg. Mood Improvement",
                value: `+${averageMoodImprovement.toFixed(1)}`,
                icon: <TrendingUp className="h-4 w-4" />,
                description: "Points on mood scale" 
              },
              { 
                title: "Next Session",
                value: "Tomorrow",
                icon: <Calendar className="h-4 w-4" />,
                description: "10:00 AM - Stress Management" 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Card className="border border-therapy-muted hover:border-therapy-accent/20 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-therapy-text-muted mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                        <p className="text-xs text-therapy-text-muted mt-1">{stat.description}</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-therapy-muted flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mood Tracking Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border border-therapy-muted h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HeartPulse className="h-4 w-4 text-therapy-accent" />
                    Mood Tracking
                  </CardTitle>
                  <CardDescription>Before and after therapy sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart
                      data={moodData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#7E69AB" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 10]} fontSize={12} tickLine={false} axisLine={false} />
                      <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                      <Tooltip />
                      <Area type="monotone" dataKey="before" stroke="#7E69AB" strokeWidth={2} fillOpacity={1} fill="url(#colorBefore)" name="Before Session" />
                      <Area type="monotone" dataKey="after" stroke="#9b87f5" strokeWidth={2} fillOpacity={1} fill="url(#colorAfter)" name="After Session" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Session Duration Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border border-therapy-muted h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4 text-therapy-accent" />
                    Session Duration
                  </CardTitle>
                  <CardDescription>Minutes spent in each therapy session</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={durationData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="duration" name="Duration (minutes)" radius={[4, 4, 0, 0]}>
                        {durationData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill="#9b87f5" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        {/* Sessions Tab Content */}
        <TabsContent value="sessions" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-4"
          >
            {mockTherapySessions.map((session, index) => (
              <Card key={session.id} className="border border-therapy-muted hover:border-therapy-accent/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <p className="text-sm font-medium text-therapy-text-muted mb-1">Date</p>
                      <h3 className="text-lg font-medium">{new Date(session.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</h3>
                      <p className="text-sm text-therapy-text-muted mt-2">
                        <Clock className="h-3 w-3 inline mr-1" /> {session.duration} minutes
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-therapy-text-muted mb-1">Topic</p>
                      <h3 className="text-lg font-medium mb-2">{session.topic}</h3>
                      <p className="text-sm text-therapy-text">{session.summary}</p>
                    </div>
                    <div className="md:col-span-1">
                      <p className="text-sm font-medium text-therapy-text-muted mb-1">Mood Change</p>
                      <MoodProgress before={session.mood.before} after={session.mood.after} />
                      <div>
                        <p className="text-sm font-medium text-therapy-text-muted mb-1">Key Insights</p>
                        <ul className="text-sm space-y-1">
                          {session.insights.map((insight, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-therapy-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Brain className="h-3 w-3 text-therapy-accent" />
                              </span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
        
        {/* Insights Tab Content */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-therapy-muted h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-4 w-4 text-therapy-accent" />
                    Personality Profile
                  </CardTitle>
                  <CardDescription>Your Big Five personality traits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={personalityData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        {Object.keys(mockUserPersonality.traits).map((key, index) => (
                          <Radar 
                            key={key}
                            name={key.charAt(0).toUpperCase() + key.slice(1)} 
                            dataKey={key} 
                            stroke={COLORS[index % COLORS.length]} 
                            fill={COLORS[index % COLORS.length]} 
                            fillOpacity={0.6} 
                          />
                        ))}
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-3">
                    {Object.entries(mockUserPersonality.traits).map(([trait, value], index) => (
                      <TraitProgress 
                        key={index}
                        trait={trait.charAt(0).toUpperCase() + trait.slice(1)}
                        value={value}
                        colorIndex={index}
                        colors={COLORS}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border border-therapy-muted">
                  <CardHeader>
                    <CardTitle className="text-lg">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockUserPersonality.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-therapy-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <TrendingUp className="h-3 w-3 text-therapy-accent" />
                          </span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
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
                    <CardTitle className="text-lg">Growth Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockUserPersonality.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-therapy-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Brain className="h-3 w-3 text-therapy-accent" />
                          </span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border border-therapy-muted">
                  <CardHeader>
                    <CardTitle className="text-lg">Personality Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockUserPersonality.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-therapy-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="h-3 w-3 text-therapy-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

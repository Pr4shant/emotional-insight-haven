
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JourneyTask, JourneyMilestone } from "@/types";
import { JourneyTaskCard } from "@/components/JourneyTask";
import { JourneyMilestoneCard } from "@/components/JourneyMilestone";
import { mockJourneyTasks, mockJourneyMilestones } from "@/lib/journey-data";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { MapPin, Calendar, Filter, RefreshCw, BarChart3, Trophy, Star, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const JourneyPage = () => {
  const [tasks, setTasks] = useState<JourneyTask[]>(mockJourneyTasks);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(mockJourneyMilestones);
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Handle task status update
  const handleTaskUpdate = (taskId: string, newStatus: "pending" | "in-progress" | "completed") => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { 
            ...task, 
            status: newStatus,
            dateCompleted: newStatus === "completed" ? new Date().toISOString() : task.dateCompleted
          };
          
          // Show toast notification
          if (newStatus === "completed") {
            toast({
              title: "Quest completed! 🎉",
              description: `You earned ${task.xpReward} XP for completing "${task.title}"`,
            });
          } else if (newStatus === "in-progress") {
            toast({
              title: "Quest started",
              description: `You've embarked on "${task.title}"`,
            });
          }
          
          return updatedTask;
        }
        return task;
      })
    );
    
    // If task was completed, update milestones
    if (newStatus === "completed") {
      updateMilestones(taskId);
    }
  };
  
  // Update milestone progress
  const updateMilestones = (taskId: string) => {
    setMilestones(prevMilestones => 
      prevMilestones.map(milestone => {
        // For demo purposes, increase progress on non-completed milestones
        if (!milestone.completed && milestone.progress < milestone.tasksRequired) {
          const newProgress = milestone.progress + 1;
          const isNowCompleted = newProgress >= milestone.tasksRequired;
          
          // Show toast if milestone completed
          if (isNowCompleted) {
            toast({
              title: "Achievement unlocked! 🏆",
              description: `You've mastered "${milestone.title}" and earned ${milestone.reward.xp} XP!`,
              variant: "default",
            });
          }
          
          return {
            ...milestone,
            progress: newProgress,
            completed: isNowCompleted
          };
        }
        return milestone;
      })
    );
  };
  
  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return task.status === "pending";
    if (activeTab === "in-progress") return task.status === "in-progress";
    if (activeTab === "completed") return task.status === "completed";
    return true;
  }).filter(task => {
    if (!activeFilter) return true;
    return task.category === activeFilter;
  });
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const totalXpEarned = tasks
    .filter(task => task.status === "completed")
    .reduce((sum, task) => sum + task.xpReward, 0);
  
  // Get category filters
  const categories = Array.from(new Set(tasks.map(task => task.category)));
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-10 min-h-screen bg-amber-50/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="inline-block bg-amber-100 px-4 py-2 rounded-full mb-3">
          <Swords className="h-6 w-6 text-amber-600 inline-block mr-2" />
          <span className="font-bold text-amber-800">Your Wellness Adventure</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-amber-900">Wellness Quest Journal</h1>
        <p className="text-muted-foreground">Complete quests, earn rewards, and level up your wellbeing</p>
      </motion.div>
      
      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-amber-200 overflow-hidden">
            <div className="h-1 bg-amber-400 w-full"></div>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-amber-700">Quest Progress</h3>
                <BarChart3 className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold mt-2 text-amber-900">{Math.round(completionRate)}%</p>
              <Progress value={completionRate} className="h-2 mt-2 bg-amber-100" />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-amber-200 overflow-hidden">
            <div className="h-1 bg-amber-400 w-full"></div>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-amber-700">Quests Completed</h3>
                <Calendar className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold mt-2 text-amber-900">{completedTasks} / {totalTasks}</p>
              <div className="text-xs text-amber-700 mt-2">
                {totalTasks - completedTasks} quests remaining
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-amber-200 overflow-hidden">
            <div className="h-1 bg-amber-400 w-full"></div>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-amber-700">XP Earned</h3>
                <Star className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold mt-2 text-amber-900">{totalXpEarned}</p>
              <div className="text-xs text-amber-700 mt-2">
                From completed quests & achievements
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-amber-200 overflow-hidden">
            <div className="h-1 bg-amber-400 w-full"></div>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-amber-700">Current Streak</h3>
                <RefreshCw className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold mt-2 text-amber-900">3 days</p>
              <div className="text-xs text-amber-700 mt-2">
                Keep your momentum going!
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Milestones Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-amber-100"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-amber-500 mr-2" />
            <h2 className="text-xl font-bold text-amber-900">Achievements</h2>
          </div>
          <div className="text-sm bg-amber-100 px-3 py-1 rounded-full text-amber-700">
            {milestones.filter(m => m.completed).length} / {milestones.length} unlocked
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <JourneyMilestoneCard milestone={milestone} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Tasks Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Swords className="h-5 w-5 text-amber-500 mr-2" />
            <h2 className="text-xl font-bold text-amber-900">Active Quests</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            <Filter className="h-3 w-3 mr-1" /> 
            {activeFilter ? "Clear Filters" : "Filters"}
          </Button>
        </div>
        
        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5 bg-amber-50 p-3 rounded-lg">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant="outline"
                className={`cursor-pointer border px-3 py-1 ${
                  activeFilter === category 
                    ? "bg-amber-200 text-amber-800 border-amber-300" 
                    : "bg-white text-amber-700 border-amber-200 hover:bg-amber-100"
                }`}
                onClick={() => setActiveFilter(activeFilter === category ? null : category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Tabs for task status */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md bg-amber-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">To Do</TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Task cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <JourneyTaskCard 
                  task={task} 
                  onTaskUpdate={handleTaskUpdate} 
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-amber-50/50 rounded-xl">
              <MapPin className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2 text-amber-800">No quests found</h3>
              <p className="text-amber-700 mb-4">
                {activeFilter 
                  ? `No ${activeTab} quests in the ${activeFilter} category.` 
                  : `No ${activeTab} quests available.`
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveTab("all");
                  setActiveFilter(null);
                }}
                className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
              >
                View All Quests
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyPage;

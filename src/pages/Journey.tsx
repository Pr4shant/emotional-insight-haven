
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JourneyTask, JourneyMilestone } from "@/types";
import { JourneyTaskCard } from "@/components/JourneyTask";
import { JourneyMilestoneCard } from "@/components/JourneyMilestone";
import { mockJourneyTasks, mockJourneyMilestones } from "@/lib/journey-data";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { MapPin, Calendar, Filter, RefreshCw, BarChart3 } from "lucide-react";
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
              title: "Task completed! 🎉",
              description: `You earned ${task.xpReward} XP for completing "${task.title}"`,
            });
          } else if (newStatus === "in-progress") {
            toast({
              title: "Task started",
              description: `You've started working on "${task.title}"`,
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
    // This is a simplified version. In a real app, you would have logic to
    // determine which milestone(s) the task contributes to
    setMilestones(prevMilestones => 
      prevMilestones.map(milestone => {
        // For demo purposes, increase progress on non-completed milestones
        if (!milestone.completed && milestone.progress < milestone.tasksRequired) {
          const newProgress = milestone.progress + 1;
          const isNowCompleted = newProgress >= milestone.tasksRequired;
          
          // Show toast if milestone completed
          if (isNowCompleted) {
            toast({
              title: "Milestone achieved! 🏆",
              description: `You've completed "${milestone.title}" and earned ${milestone.reward.xp} XP!`,
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
    <div className="container mx-auto px-4 pt-20 pb-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Your Wellness Journey</h1>
        <p className="text-muted-foreground">Track your progress and build healthy habits</p>
      </motion.div>
      
      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Completion Rate</h3>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold mt-2">{Math.round(completionRate)}%</p>
              <Progress value={completionRate} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Tasks Completed</h3>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold mt-2">{completedTasks} / {totalTasks}</p>
              <div className="text-xs text-muted-foreground mt-2">
                {totalTasks - completedTasks} tasks remaining
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">XP Earned</h3>
                <Badge className="bg-primary/10 text-primary">XP</Badge>
              </div>
              <p className="text-2xl font-bold mt-2">{totalXpEarned}</p>
              <div className="text-xs text-muted-foreground mt-2">
                From completed tasks & milestones
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold mt-2">3 days</p>
              <div className="text-xs text-muted-foreground mt-2">
                Keep it going!
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
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Milestones</h2>
          <div className="text-sm text-muted-foreground">
            {milestones.filter(m => m.completed).length} / {milestones.length} completed
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <JourneyMilestoneCard milestone={milestone} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Tasks Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Tasks</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveFilter(null)}
            className="text-xs"
          >
            <Filter className="h-3 w-3 mr-1" /> 
            {activeFilter ? "Clear Filters" : "Filters"}
          </Button>
        </div>
        
        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant="outline"
                className={`cursor-pointer ${
                  activeFilter === category 
                    ? "bg-primary/10 text-primary border-primary" 
                    : ""
                }`}
                onClick={() => setActiveFilter(activeFilter === category ? null : category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Tabs for task status */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Task cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                variants={itemVariants}
              >
                <JourneyTaskCard 
                  task={task} 
                  onTaskUpdate={handleTaskUpdate} 
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {activeFilter 
                  ? `No ${activeTab} tasks in the ${activeFilter} category.` 
                  : `No ${activeTab} tasks available.`
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveTab("all");
                  setActiveFilter(null);
                }}
              >
                View All Tasks
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyPage;

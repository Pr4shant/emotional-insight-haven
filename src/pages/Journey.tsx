
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { JourneyTask, JourneyMilestone } from "@/types";
import { JourneyMilestoneCard } from "@/components/JourneyMilestone";
import { mockJourneyTasks, mockJourneyMilestones } from "@/lib/journey-data";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Star, 
  Swords, 
  ChevronDown, 
  ChevronUp,
  CircleCheck,
  Circle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const JourneyPage = () => {
  const [tasks, setTasks] = useState<JourneyTask[]>(mockJourneyTasks);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(mockJourneyMilestones);

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
  
  // Calculate statistics
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const totalXpEarned = tasks
    .filter(task => task.status === "completed")
    .reduce((sum, task) => sum + task.xpReward, 0);
  
  // Group tasks by topic
  const tasksByTopic = tasks.reduce((groups, task) => {
    const topic = task.relatedTopic;
    if (!groups[topic]) {
      groups[topic] = [];
    }
    groups[topic].push(task);
    return groups;
  }, {} as Record<string, JourneyTask[]>);

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
        <h1 className="text-3xl font-bold mb-2 text-amber-900">Wellness Quest Journey</h1>
        <p className="text-muted-foreground">Complete quests, unlock achievements, level up your wellbeing</p>
      </motion.div>
      
      {/* Stats Bar - Minimal */}
      <motion.div 
        className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-amber-100 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
            <Swords className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-amber-700">Quests Completed</p>
            <p className="text-xl font-bold text-amber-900">{completedTasks} / {tasks.length}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
            <Star className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-amber-700">XP Earned</p>
            <p className="text-xl font-bold text-amber-900">{totalXpEarned}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-amber-700">Achievements</p>
            <p className="text-xl font-bold text-amber-900">{milestones.filter(m => m.completed).length}/{milestones.length}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Quests Section with Expandable Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-amber-100"
      >
        <div className="flex items-center mb-6">
          <Swords className="h-5 w-5 text-amber-600 mr-2" />
          <h2 className="text-xl font-bold text-amber-900">Your Quest Journey</h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {Object.entries(tasksByTopic).map(([topic, topicTasks]) => (
            <AccordionItem 
              key={topic} 
              value={topic}
              className="border-0 bg-amber-50/50 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Star className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-amber-900">{topic}</h3>
                    <p className="text-xs text-amber-700">
                      {topicTasks.filter(t => t.status === "completed").length}/{topicTasks.length} tasks completed
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="relative ml-4 pl-6 border-l-2 border-amber-200">
                  {topicTasks.map((task, index) => (
                    <motion.div 
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4 relative"
                    >
                      {/* Connection dot */}
                      <div className="absolute -left-[29px] top-0 h-5 w-5 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center">
                        {task.status === "completed" ? (
                          <CircleCheck className="h-3 w-3 text-amber-600" />
                        ) : (
                          <Circle className="h-3 w-3 text-amber-400" />
                        )}
                      </div>
                      
                      <Collapsible className="w-full rounded-lg border border-amber-100 overflow-hidden bg-white">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-amber-50/50">
                          <div className="flex items-center space-x-3">
                            <Badge 
                              className={`${
                                task.status === "completed" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : task.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                              } text-xs`}
                            >
                              {task.status === "completed" ? "Completed" : task.status === "in-progress" ? "In Progress" : "Available"}
                            </Badge>
                            <span className="font-medium text-amber-900">{task.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1 text-amber-500" />
                              <span className="text-xs text-amber-700">+{task.xpReward} XP</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-amber-500" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 border-t border-amber-100">
                          <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-muted-foreground">
                              Estimated time: {task.estimatedDuration} mins
                            </div>
                            {task.status === "pending" && (
                              <Button 
                                size="sm" 
                                onClick={() => handleTaskUpdate(task.id, "in-progress")}
                                className="text-xs bg-amber-500 hover:bg-amber-600"
                              >
                                Begin Quest
                              </Button>
                            )}
                            {task.status === "in-progress" && (
                              <Button 
                                size="sm" 
                                onClick={() => handleTaskUpdate(task.id, "completed")}
                                className="text-xs bg-amber-500 hover:bg-amber-600"
                              >
                                Complete Quest
                              </Button>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
      
      {/* Achievements Section - Minimal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-amber-100"
      >
        <div className="flex items-center mb-6">
          <Trophy className="h-5 w-5 text-amber-600 mr-2" />
          <h2 className="text-xl font-bold text-amber-900">Achievements</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  );
};

export default JourneyPage;


import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LifeBuoy, Brain, LayoutDashboard, ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-therapy-light via-background to-background"></div>
          
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-therapy-muted w-fit">
                  <LifeBuoy className="h-4 w-4 text-therapy-accent" />
                  <span className="text-sm font-medium text-therapy-secondary">AI-Powered Therapy</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Your Personal <span className="text-therapy-accent">AI Therapist</span> for Emotional Wellness
                </h1>
                
                <p className="text-lg text-therapy-text-muted max-w-lg">
                  Experience personalized therapy sessions tailored to your unique needs, preferences, and goals. Our AI therapist is here to support you on your journey to better mental health.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button 
                    size="lg" 
                    className="bg-therapy-accent hover:bg-therapy-secondary text-white rounded-xl"
                    onClick={() => navigate("/therapy")}
                  >
                    Start a Session <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-therapy-accent text-therapy-accent hover:bg-therapy-accent/10 rounded-xl"
                    onClick={() => navigate("/dashboard")}
                  >
                    View Dashboard
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-therapy-accent/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10 h-full rounded-3xl overflow-hidden glass-effect p-4">
                    <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
                      <div className="p-4 border-b flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-therapy-accent flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">Therapy Session</span>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="bg-therapy-muted p-3 rounded-xl rounded-tl-none max-w-[80%]">
                          <p className="text-sm">How are you feeling today?</p>
                        </div>
                        <div className="bg-therapy-light p-3 rounded-xl rounded-tr-none max-w-[80%] ml-auto">
                          <p className="text-sm">I've been feeling a bit anxious about my upcoming presentation.</p>
                        </div>
                        <div className="bg-therapy-muted p-3 rounded-xl rounded-tl-none max-w-[80%]">
                          <p className="text-sm">That's understandable. Let's explore some techniques that might help you manage this anxiety. Can you tell me more about what aspects of the presentation are causing you concern?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Why Choose Serenity?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-therapy-text-muted max-w-2xl mx-auto"
              >
                Our AI therapist combines advanced technology with therapeutic best practices to provide you with a supportive and personalized experience.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="h-6 w-6 text-therapy-accent" />,
                  title: "Personalized Therapy",
                  description: "Sessions tailored to your unique needs, preferences, and therapeutic goals."
                },
                {
                  icon: <LifeBuoy className="h-6 w-6 text-therapy-accent" />,
                  title: "24/7 Availability",
                  description: "Access support whenever you need it, without waiting for appointments."
                },
                {
                  icon: <LayoutDashboard className="h-6 w-6 text-therapy-accent" />,
                  title: "Progress Tracking",
                  description: "Visualize your journey with detailed insights and progress reports."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="h-12 w-12 rounded-full bg-therapy-muted flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-therapy-text-muted">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-therapy-muted">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Begin Your Wellness Journey Today
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-therapy-text-muted mb-8 max-w-2xl mx-auto"
              >
                Start with a therapy session tailored to your needs and discover insights about yourself through our personalized approach.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  className="bg-therapy-accent hover:bg-therapy-secondary text-white rounded-xl"
                  onClick={() => navigate("/therapy")}
                >
                  Start a Session <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-therapy-accent text-therapy-accent hover:bg-therapy-accent/10 rounded-xl"
                  onClick={() => navigate("/dashboard")}
                >
                  Explore the Dashboard
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <LifeBuoy className="h-5 w-5 text-therapy-accent" />
              <span className="font-medium">Serenity</span>
            </div>
            <div className="text-sm text-therapy-text-muted">
              © {new Date().getFullYear()} Serenity AI Therapy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { valentineContent } from "@/content/valentine";

export default function Proposal() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6 text-center">
            <h1 className="text-4xl font-bold text-primary mb-6">
              {valentineContent.proposal.title}
            </h1>
            <div 
              className="mb-8 whitespace-pre-line text-lg text-foreground"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {valentineContent.proposal.message}
            </div>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setLocation("/restaurant-types")}
            >
              {valentineContent.proposal.buttonText}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
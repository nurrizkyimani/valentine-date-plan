import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { valentineContent } from "@shared/content/valentine";
import { useState, useEffect } from "react";

export default function Proposal() {
  const [_, setLocation] = useLocation();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const moveButton = () => {
    const newX = Math.random() * (window.innerWidth - 200); // Subtract button width
    const newY = Math.random() * (window.innerHeight - 50); // Subtract button height
    setNoButtonPosition({ x: newX, y: newY });
    setIsHovering(true);
  };

  useEffect(() => {
    // Reset position when window is resized
    const handleResize = () => {
      if (isHovering) {
        moveButton();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isHovering]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6">
            <h1 className="text-4xl font-bold text-primary mb-6 text-center">
              {valentineContent.proposal.title}
            </h1>
            <div 
              className="mb-8 text-lg text-foreground"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {valentineContent.proposal.message}
            </div>
            <div className="flex justify-center gap-4 relative">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => setLocation("/restaurant-types")}
              >
                {valentineContent.proposal.buttonText}
              </Button>

              <motion.div
                style={{
                  position: isHovering ? 'fixed' : 'relative',
                  top: noButtonPosition.y,
                  left: noButtonPosition.x,
                  zIndex: 50,
                }}
                animate={isHovering ? { x: 0, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary/10 hover:bg-primary/20 text-primary"
                  onMouseEnter={moveButton}
                  onTouchStart={moveButton}
                >
                  {valentineContent.proposal.backButton}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
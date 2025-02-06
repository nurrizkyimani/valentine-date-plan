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
    // Limit the movement to stay within 40% of the viewport from the center
    const maxDistance = {
      x: window.innerWidth * 0.4,
      y: window.innerHeight * 0.4
    };

    const newX = (Math.random() - 0.5) * maxDistance.x;
    const newY = (Math.random() - 0.5) * maxDistance.y;

    setNoButtonPosition({ x: newX, y: newY });
    setIsHovering(true);
  };

  useEffect(() => {
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
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${noButtonPosition.x}px), calc(-50% + ${noButtonPosition.y}px))`,
                  zIndex: 50,
                }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-primary/5 hover:bg-primary/10 text-primary/60"
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
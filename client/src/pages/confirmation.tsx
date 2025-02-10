import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { valentineContent } from "@/content/valentine";
import { Heart } from "lucide-react";

export default function Confirmation() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 0.5, delay: 0.3}}
                className="flex justify-center mb-6"
            >
              <Heart className="h-16 w-16 text-primary animate-pulse"/>
            </motion.div>

            <h1 className="text-4xl font-bold text-primary mb-4">
              {valentineContent.confirmation.title}
            </h1>

            <div className="mb-6 space-y-4">
              <p className="text-2xl text-foreground font-semibold">
                {valentineContent.confirmation.message}
              </p>
              <p className="text-muted-foreground">
                {valentineContent.confirmation.subtitle}
              </p>
            </div>

            <div className="mb-8 flex justify-center items-center">
              <img
                  src={valentineContent.confirmation.img}
                  className="w-64 h-64 object-cover rounded-lg"
                  alt="Proposal"
              />
            </div>


            <Button
                size="lg"
                onClick={() => setLocation("/")}
                className="bg-primary hover:bg-primary/90"
            >
              {valentineContent.confirmation.backButton}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
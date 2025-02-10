import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { valentineContent } from "@shared/content/valentine";
import { useState, useEffect, useRef } from "react";

export default function Proposal() {
  const [_, setLocation] = useLocation();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const parentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

    const moveButton = () => {
        if (!parentRef.current || !buttonRef.current) return;

        const parentRect = parentRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();

        // Hitung ruang gerak tombol di dalam parent
        const maxX = parentRect.width - buttonRect.width;
        const maxY = parentRect.height - buttonRect.height;

        // Multiplier untuk membuat jarak gerak lebih jauh, tapi nggak ekstrem
        const distanceMultiplier = 2;  // Ubah ke 1.2 atau 1.3 kalau masih terlalu jauh

        // Generate posisi acak yang tetap dalam batas parent
        const newX = (Math.random() * maxX - maxX / 2) * distanceMultiplier;
        const newY = (Math.random() * maxY - maxY / 2) * distanceMultiplier;

        // Batasi supaya tombol nggak keluar dari parent
        setNoButtonPosition({
            x: Math.max(-maxX / 2, Math.min(maxX / 2, newX)),
            y: Math.max(-maxY / 2, Math.min(maxY / 2, newY)),
        });
    };



    useEffect(() => {
    const handleResize = () => {
        moveButton();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
        className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        <Card className="w-full max-w-lg" ref={parentRef}>
            <CardContent className="pt-6">
                <h1 className="text-4xl font-bold text-primary mb-6 text-center">
                    {valentineContent.proposal.title}
                </h1>

                <div className="mb-8 flex justify-center items-center">
                    <img
                        src={valentineContent.proposal.gif}
                        className="w-64 h-64 object-cover rounded-lg"
                        alt="Proposal"
                    />
                </div>

                <div
                    className="mb-8 text-lg text-foreground"
                    style={{whiteSpace: 'pre-wrap'}}
                >
                    {valentineContent.proposal.message}
                </div>
                <div

                    className="flex justify-center gap-4 items-center relative min-h-[100px]"
                >
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => setLocation("/restaurant-types")}
                    >
                        {valentineContent.proposal.buttonText}
                    </Button>

                    <motion.div
                        animate={noButtonPosition}
                        style={{
                            position: 'relative',
                            top: 0,
                            left: 0,
                            zIndex: 50,

                        }}

                        transition={{
                            type: "tween",
                            duration: 0.5,
                            ease: "easeInOut"
                        }}
                    >
                        <Button
                            ref={buttonRef}
                            id="no-button"
                            size="lg"
                            variant="secondary"
                            className="bg-primary/5 hover:bg-primary/10 text-primary/60 relative"
                            onMouseEnter={moveButton}
                            onTouchStart={(e) => {
                                e.preventDefault();
                                moveButton();
                            }}
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
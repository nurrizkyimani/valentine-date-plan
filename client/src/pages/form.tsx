import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { valentineContent } from "@/content/valentine";
import { insertSubmissionSchema } from "@shared/schema";
import type { InsertSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Form() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const params = new URLSearchParams(location);
  const restaurantId = params.get("restaurantId");

  const form = useForm<InsertSubmission>({
    resolver: zodResolver(insertSubmissionSchema),
    defaultValues: {
      restaurantId: parseInt(restaurantId || "0"),
      date: new Date().toISOString().split("T")[0],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertSubmission) => {
      await apiRequest("POST", "/api/submit", data);
    },
    onSuccess: () => {
      setLocation("/confirmation");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold text-primary text-center mb-2">
              {valentineContent.form.title}
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              {valentineContent.form.subtitle}
            </p>

            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input {...form.register("name")} id="name" />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input {...form.register("email")} id="email" type="email" />
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input {...form.register("date")} id="date" type="date" />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Submitting..." : "Confirm Reservation"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
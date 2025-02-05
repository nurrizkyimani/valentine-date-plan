import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { valentineContent } from "@/content/valentine";
import type { RestaurantType } from "@shared/schema";

export default function RestaurantTypes() {
  const [_, setLocation] = useLocation();
  const { data: types, isLoading } = useQuery<RestaurantType[]>({
    queryKey: ["/api/restaurant-types"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-primary text-center mb-2">
            {valentineContent.types.title}
          </h1>
          <p className="text-lg text-center mb-8 text-muted-foreground">
            {valentineContent.types.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {types?.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setLocation(`/restaurants/${type.id}`)}
              >
                <CardContent className="p-6">
                  <div 
                    className="h-48 mb-4 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${type.imageUrl})` }}
                  />
                  <h2 className="text-xl font-semibold mb-2">{type.name}</h2>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
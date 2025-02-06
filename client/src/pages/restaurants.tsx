import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { valentineContent } from "@shared/content/valentine";
import type { Restaurant } from "@shared/schema";

export default function Restaurants() {
  const { typeId } = useParams();
  const [_, setLocation] = useLocation();

  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: [`/api/restaurants/${typeId}`],
  });

  const openInGoogleMaps = (url: string) => {
    window.open(url, '_blank');
  };

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
            {valentineContent.restaurants.title}
          </h1>
          <p className="text-lg text-center mb-8 text-muted-foreground">
            {valentineContent.restaurants.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants?.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div 
                    className="h-48 mb-4 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
                  />
                  <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                  <p className="text-muted-foreground mb-4">{restaurant.description}</p>
                  <p className="text-sm text-muted-foreground mb-4">{restaurant.address}</p>
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => setLocation(`/form?restaurantId=${restaurant.id}`)}
                    >
                      {valentineContent.restaurants.selectButton}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => openInGoogleMaps(restaurant.mapsUrl)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {valentineContent.restaurants.mapButton}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => setLocation("/restaurant-types")}
          >
            {valentineContent.restaurants.backButton}
          </Button>
        </div>
      </div>
    </div>
  );
}
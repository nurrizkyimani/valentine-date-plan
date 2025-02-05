import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Proposal from "@/pages/proposal";
import RestaurantTypes from "@/pages/restaurant-types";
import Restaurants from "@/pages/restaurants";
import Form from "@/pages/form";
import Confirmation from "@/pages/confirmation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Proposal} />
      <Route path="/restaurant-types" component={RestaurantTypes} />
      <Route path="/restaurants/:typeId" component={Restaurants} />
      <Route path="/form" component={Form} />
      <Route path="/confirmation" component={Confirmation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

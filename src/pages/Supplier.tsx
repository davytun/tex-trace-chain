import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, CheckCircle, Clock, DollarSign } from "lucide-react";

const Supplier = () => {
  const deliveries = [
    { id: "DEL-001", batch: "Organic Cotton A1", status: "completed", amount: "2,500 TEX", date: "2025-10-20" },
    { id: "DEL-002", batch: "Recycled Polyester B2", status: "in-transit", amount: "1,800 TEX", date: "2025-10-22" },
    { id: "DEL-003", batch: "Bamboo Fiber C3", status: "pending", amount: "3,200 TEX", date: "2025-10-24" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            Supplier <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Track deliveries and receive automated TEX token payments via smart contracts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Card className="p-6 bg-card/50 backdrop-blur-sm card-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Deliveries</p>
                <p className="text-3xl font-bold">2</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm card-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">TEX Earned</p>
                <p className="text-3xl font-bold">7,500</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm card-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Deliveries */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Delivery Milestones</h2>
          {deliveries.map((delivery, index) => (
            <Card 
              key={delivery.id}
              className="p-6 card-shadow bg-card/50 backdrop-blur-sm hover:scale-[1.01] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{delivery.batch}</h3>
                    <Badge 
                      variant={
                        delivery.status === "completed" ? "default" : 
                        delivery.status === "in-transit" ? "secondary" : 
                        "outline"
                      }
                    >
                      {delivery.status === "completed" ? (
                        <><CheckCircle className="w-3 h-3 mr-1" /> Completed</>
                      ) : delivery.status === "in-transit" ? (
                        <><Truck className="w-3 h-3 mr-1" /> In Transit</>
                      ) : (
                        <><Clock className="w-3 h-3 mr-1" /> Pending</>
                      )}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Delivery ID: {delivery.id} • Date: {delivery.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{delivery.amount}</p>
                  <p className="text-sm text-muted-foreground">Payment Amount</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://hashscan.io/mainnet/transaction/${delivery.id}`, "_blank")}
                >
                  View Contract
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Smart Contract Info */}
        <Card className="mt-8 p-6 bg-gradient-primary text-white card-shadow animate-fade-in" style={{ animationDelay: "500ms" }}>
          <h3 className="text-2xl font-bold mb-4">Smart Contract Automation</h3>
          <p className="mb-4 opacity-90">
            Your TEX token payments are automatically released upon verified delivery confirmation through Hedera Smart Contracts. 
            No manual processing, instant settlement.
          </p>
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
            Learn More About Smart Contracts
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Supplier;

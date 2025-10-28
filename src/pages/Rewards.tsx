import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Gift, Leaf } from "lucide-react";

const Rewards = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            TEX Token <span className="gradient-text">Rewards</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Earn and redeem sustainability tokens for eco-conscious textile practices.
          </p>
        </div>

        {/* Balance Card */}
        <Card className="p-8 mb-8 bg-gradient-primary text-white card-shadow glow-effect animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg opacity-90 mb-2">Your TEX Token Balance</p>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-bold">1,250</span>
                <span className="text-2xl opacity-80">TEX</span>
              </div>
            </div>
            <Coins className="w-24 h-24 opacity-20" />
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              <Gift className="w-4 h-4 mr-2" />
              Redeem Tokens
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              View Transactions
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Earning Opportunities */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-2xl font-bold">Earn TEX Tokens</h2>
            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Use Organic Materials</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Earn 100 TEX tokens for each batch produced with certified organic fibers
                  </p>
                  <Badge>+100 TEX per batch</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Carbon Neutral Production</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Achieve carbon neutrality to earn bonus sustainability rewards
                  </p>
                  <Badge>+200 TEX per quarter</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Recycled Textiles</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bonus tokens for using recycled or upcycled materials
                  </p>
                  <Badge>+75 TEX per batch</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Redemption Options */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-2xl font-bold">Redeem Your Tokens</h2>
            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
              <h3 className="text-lg font-bold mb-2">Priority Supply Chain Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Fast-track your orders and get priority processing
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">500 TEX</Badge>
                <Button variant="outline" size="sm">Redeem</Button>
              </div>
            </Card>

            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
              <h3 className="text-lg font-bold mb-2">Sustainability Certifications</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Unlock premium eco-certifications for your products
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">1,000 TEX</Badge>
                <Button variant="outline" size="sm">Redeem</Button>
              </div>
            </Card>

            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
              <h3 className="text-lg font-bold mb-2">Marketing Badge</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Display verified sustainability badge on your products
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">300 TEX</Badge>
                <Button variant="outline" size="sm">Redeem</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-secondary/50 backdrop-blur-sm border-primary/20 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h3 className="text-xl font-bold mb-3">About TEX Tokens</h3>
          <p className="text-muted-foreground">
            TEX is a fungible Hedera Token Service (HTS) token that incentivizes sustainable textile production. 
            Tokens are automatically distributed via smart contracts when sustainability milestones are verified on the blockchain. 
            The more eco-friendly your practices, the more you earn!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Scan, CheckCircle, MapPin, Calendar, Award } from "lucide-react";
import { toast } from "sonner";

const Consumer = () => {
  const [qrCode, setQrCode] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleScan = () => {
    if (!qrCode) {
      toast.error("Please enter a product code");
      return;
    }
    setShowDetails(true);
    toast.success("Product Verified!", {
      description: "Authenticity confirmed on Hedera blockchain.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            Consumer <span className="gradient-text">Portal</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Verify textile authenticity and sustainability using blockchain-powered certificates.
          </p>
        </div>

        {/* Scanner */}
        <Card className="p-8 mb-8 card-shadow bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
              <Scan className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Scan Product Code</h2>
            <p className="text-muted-foreground mb-8">
              Enter the product code from your textile item to view its complete blockchain-verified history.
            </p>
            <div className="flex gap-4">
              <Input 
                placeholder="Enter product code (e.g., NFT-001)" 
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="hero" size="lg" onClick={handleScan}>
                Verify Product
              </Button>
            </div>
          </div>
        </Card>

        {/* Product Details */}
        {showDetails && (
          <div className="space-y-6 animate-fade-in">
            {/* Verification Status */}
            <Card className="p-6 bg-gradient-primary text-white card-shadow glow-effect">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold mb-1">Authentic Product Verified</h3>
                  <p className="opacity-90">This textile has been verified on the Hedera blockchain</p>
                </div>
              </div>
            </Card>

            {/* Product Information */}
            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Product Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">NFT</Badge>
                  <div>
                    <p className="font-semibold mb-1">NFT Certificate ID</p>
                    <p className="text-muted-foreground">NFT-001</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Origin Location</p>
                    <p className="text-muted-foreground">Organic Cotton Farm, Gujarat, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Production Date</p>
                    <p className="text-muted-foreground">October 20, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Certification</p>
                    <p className="text-muted-foreground">GOTS Organic Certified</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Supply Chain */}
            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Supply Chain Journey</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pb-4">
                  <div className="w-3 h-3 bg-primary rounded-full -ml-[25px] mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">Cotton Harvested</p>
                      <p className="text-sm text-muted-foreground">Oct 15, 2025</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Gujarat, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pb-4">
                  <div className="w-3 h-3 bg-primary rounded-full -ml-[25px] mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">Textile Manufacturing</p>
                      <p className="text-sm text-muted-foreground">Oct 20, 2025</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Mumbai, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-l-2 border-border pl-4 pb-4">
                  <div className="w-3 h-3 bg-primary rounded-full -ml-[25px] mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">Quality Verified</p>
                      <p className="text-sm text-muted-foreground">Oct 22, 2025</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Smart Contract Validation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pl-4">
                  <div className="w-3 h-3 bg-accent rounded-full -ml-[25px] mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">Retail Distribution</p>
                      <p className="text-sm text-muted-foreground">Oct 27, 2025</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Current Location</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sustainability Score */}
            <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Sustainability Score</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">95</div>
                  <p className="text-sm text-muted-foreground">Environmental Impact</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">A+</div>
                  <p className="text-sm text-muted-foreground">Ethical Practices</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50</div>
                  <p className="text-sm text-muted-foreground">TEX Tokens Earned</p>
                </div>
              </div>
            </Card>

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => window.open("https://hashscan.io/mainnet", "_blank")}
            >
              View Full Details on Hedera Mirror Node
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consumer;

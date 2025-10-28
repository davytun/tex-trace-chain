import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Wallet, Shield, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection (HashPack integration would go here)
    setTimeout(() => {
      setIsConnecting(false);
      toast.success("HashPack Wallet Connected!", {
        description: "You're ready to access the TexTrace platform.",
      });
      navigate("/manufacturer");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Connect Your <span className="gradient-text">HashPack Wallet</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Secure authentication powered by Hedera Hashgraph
            </p>
          </div>

          <Card className="p-8 card-shadow bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="space-y-6">
              {/* HashPack Connection */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
                  <Wallet className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">HashPack Wallet</h2>
                <p className="text-muted-foreground mb-8">
                  Connect your HashPack wallet to access manufacturer, supplier, and consumer dashboards.
                </p>
                
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full glow-effect"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? "Connecting..." : "Connect HashPack"}
                </Button>
              </div>

              {/* Security Features */}
              <div className="pt-8 border-t border-border space-y-4">
                <h3 className="font-semibold text-lg mb-4">Why HashPack?</h3>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Secure & Non-Custodial</p>
                    <p className="text-sm text-muted-foreground">Your keys, your assets. Full control over your wallet.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hedera Native</p>
                    <p className="text-sm text-muted-foreground">Built specifically for Hedera Token Service and Smart Contracts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Easy Integration</p>
                    <p className="text-sm text-muted-foreground">Seamless connection with TexTrace platform.</p>
                  </div>
                </div>
              </div>

              {/* Download Link */}
              <div className="pt-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">Don't have HashPack yet?</p>
                <a 
                  href="https://www.hashpack.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Download HashPack Wallet →
                </a>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p>By connecting, you agree to TexTrace's Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

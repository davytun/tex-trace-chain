import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { Wallet, Shield, CheckCircle2, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [walletId, setWalletId] = useState("");
  const navigate = useNavigate();
  const { user, signIn, signUp, connectWallet } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/manufacturer");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) return;
    
    setIsLoading(true);
    try {
      await signUp(email, password, displayName, walletId || undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    if (!walletId) return;
    
    setIsLoading(true);
    try {
      // In production, this would integrate with HashPack SDK
      // For now, we'll use manual wallet ID entry
      await connectWallet(walletId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Access <span className="gradient-text">TexTrace Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Sign in or create an account to start tracking textiles on the blockchain
            </p>
          </div>

          <Card className="p-8 card-shadow bg-card/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Welcome Back</h2>
                    <p className="text-muted-foreground">Sign in to your TexTrace account</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Create Account</h2>
                    <p className="text-muted-foreground">Join the TexTrace blockchain platform</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name">Display Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-wallet">HashPack Wallet ID (Optional)</Label>
                      <Input
                        id="signup-wallet"
                        type="text"
                        placeholder="0.0.1234567"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        You can add your wallet ID later in settings
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Security Features */}
            <div className="pt-8 mt-8 border-t border-border space-y-4">
              <h3 className="font-semibold text-lg mb-4">Blockchain Security</h3>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Hedera Hashgraph Powered</p>
                  <p className="text-sm text-muted-foreground">Enterprise-grade blockchain security for all transactions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Wallet Integration</p>
                  <p className="text-sm text-muted-foreground">Connect your HashPack wallet for NFT management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Secure Authentication</p>
                  <p className="text-sm text-muted-foreground">Your data is encrypted and protected</p>
                </div>
              </div>
            </div>

            {/* HashPack Link */}
            <div className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Don't have a HashPack wallet?</p>
              <a 
                href="https://www.hashpack.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Download HashPack Wallet →
              </a>
            </div>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p>By signing up, you agree to TexTrace's Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

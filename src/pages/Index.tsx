import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import { Shield, Coins, Link2, Leaf, Package, Scan } from "lucide-react";
import heroImage from "@/assets/hero-textrace.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Blockchain-Verified
                <span className="block gradient-text">Textile Transparency</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Track fabric origins from fiber to fashion with Hedera-powered NFT certificates and smart contracts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="lg" className="glow-effect">
                    Connect HashPack Wallet
                  </Button>
                </Link>
                <Link to="/manufacturer">
                  <Button variant="outline" size="lg">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20" />
              <img 
                src={heroImage} 
                alt="Blockchain textile tracking visualization" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powered by Hedera Hashgraph</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade blockchain technology ensuring transparency, security, and sustainability across the textile supply chain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Shield}
              title="NFT Certificates"
              description="Mint unique NFTs for each textile batch with Hedera Token Service, ensuring immutable authenticity."
              delay={0}
            />
            <FeatureCard 
              icon={Link2}
              title="Smart Contracts"
              description="Automate supplier payments and quality verification with Hedera Smart Contract Service."
              delay={100}
            />
            <FeatureCard 
              icon={Scan}
              title="Mirror Node Verification"
              description="Real-time supply chain tracking from production to consumer using Hedera Mirror Nodes."
              delay={200}
            />
            <FeatureCard 
              icon={Coins}
              title="TEX Token Rewards"
              description="Earn sustainability tokens for eco-conscious production and verified green practices."
              delay={300}
            />
            <FeatureCard 
              icon={Package}
              title="Supply Chain Tracking"
              description="Complete visibility of fabric journey with blockchain-verified timestamps and locations."
              delay={400}
            />
            <FeatureCard 
              icon={Leaf}
              title="Sustainability Metrics"
              description="Track and verify environmental impact scores for every textile batch produced."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-hero rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Revolutionize Textile Traceability?</h2>
              <p className="text-xl mb-8 opacity-90">Join manufacturers, suppliers, and consumers building a transparent future.</p>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg" />
                <span className="text-xl font-bold">TexTrace</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Blockchain-verified textile transparency powered by Hedera Hashgraph.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/manufacturer" className="hover:text-primary transition-colors">Manufacturer</Link></li>
                <li><Link to="/supplier" className="hover:text-primary transition-colors">Supplier</Link></li>
                <li><Link to="/consumer" className="hover:text-primary transition-colors">Consumer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://docs.hedera.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Hedera Docs</a></li>
                <li><a href="https://www.hashpack.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">HashPack Wallet</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TexTrace. Built on Hedera Hashgraph.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Image, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface NFT {
  id: string;
  name: string;
  origin: string;
  date: string;
  status: "minted" | "pending";
}

const Manufacturer = () => {
  const [nfts, setNfts] = useState<NFT[]>([
    { id: "NFT-001", name: "Organic Cotton Batch A1", origin: "India", date: "2025-10-20", status: "minted" },
    { id: "NFT-002", name: "Recycled Polyester B2", origin: "Japan", date: "2025-10-22", status: "minted" },
  ]);

  const [showMintForm, setShowMintForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    composition: "",
    certification: "",
  });

  const handleMintNFT = () => {
    if (!formData.name || !formData.origin) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newNFT: NFT = {
      id: `NFT-${String(nfts.length + 1).padStart(3, "0")}`,
      name: formData.name,
      origin: formData.origin,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setNfts([newNFT, ...nfts]);
    toast.success("NFT Minting Initiated!", {
      description: "Your textile batch is being registered on Hedera Token Service.",
    });

    // Simulate minting completion
    setTimeout(() => {
      setNfts((prev) =>
        prev.map((nft) =>
          nft.id === newNFT.id ? { ...nft, status: "minted" } : nft
        )
      );
      toast.success("NFT Minted Successfully!", {
        description: `Certificate ${newNFT.id} is now on the blockchain.`,
      });
    }, 3000);

    setFormData({ name: "", origin: "", composition: "", certification: "" });
    setShowMintForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">
            Manufacturer <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Mint NFT certificates for textile batches and manage your supply chain.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex gap-4">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground mb-1">Total NFTs Minted</p>
              <p className="text-3xl font-bold">{nfts.filter(n => n.status === "minted").length}</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-accent">{nfts.filter(n => n.status === "pending").length}</p>
            </Card>
          </div>
          <Button variant="hero" onClick={() => setShowMintForm(!showMintForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Mint New NFT
          </Button>
        </div>

        {/* Mint Form */}
        {showMintForm && (
          <Card className="p-6 mb-8 card-shadow bg-card/50 backdrop-blur-sm animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Mint Textile NFT Certificate</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Batch Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Organic Cotton Batch A1"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="origin">Origin Location *</Label>
                <Input
                  id="origin"
                  placeholder="e.g., India"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="composition">Fiber Composition</Label>
                <Input
                  id="composition"
                  placeholder="e.g., 100% Organic Cotton"
                  value={formData.composition}
                  onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="certification">Certification ID</Label>
                <Input
                  id="certification"
                  placeholder="e.g., GOTS-2024-12345"
                  value={formData.certification}
                  onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="metadata">Additional Metadata</Label>
                <Textarea
                  id="metadata"
                  placeholder="Add production details, sustainability scores, or other relevant information..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button variant="hero" onClick={handleMintNFT}>
                <Package className="w-4 h-4 mr-2" />
                Mint NFT on Hedera
              </Button>
              <Button variant="outline" onClick={() => setShowMintForm(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* NFT List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Your Textile NFT Certificates</h2>
          {nfts.map((nft, index) => (
            <Card 
              key={nft.id} 
              className="p-6 card-shadow bg-card/50 backdrop-blur-sm hover:scale-[1.01] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">{nft.name}</h3>
                      <Badge variant={nft.status === "minted" ? "default" : "secondary"}>
                        {nft.status === "minted" ? (
                          <><CheckCircle className="w-3 h-3 mr-1" /> Minted</>
                        ) : (
                          <><Clock className="w-3 h-3 mr-1" /> Pending</>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      NFT ID: {nft.id} • Origin: {nft.origin} • Date: {nft.date}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View on Explorer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;

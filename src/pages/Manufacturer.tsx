import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Image, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface NFT {
  id: string;
  nft_id: string;
  batch_name: string;
  origin_location: string;
  fiber_composition: string | null;
  certification_id: string | null;
  production_date: string;
  status: "minted" | "pending";
  hedera_token_id: string | null;
}

const Manufacturer = () => {
  const { user } = useAuth();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMintForm, setShowMintForm] = useState(false);
  const [formData, setFormData] = useState({
    batchName: "",
    origin: "",
    composition: "",
    certification: "",
    metadata: "",
  });

  useEffect(() => {
    if (user) {
      fetchNFTs();
    }
  }, [user]);

  const fetchNFTs = async () => {
    try {
      const { data, error } = await supabase
        .from("nft_metadata")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNfts((data || []) as NFT[]);
    } catch (error: any) {
      toast.error("Failed to fetch NFTs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMintNFT = async () => {
    if (!formData.batchName || !formData.origin) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const nftId = `NFT-${Date.now().toString().slice(-6)}`;
      
      // Insert into database
      const { error } = await supabase.from("nft_metadata").insert({
        nft_id: nftId,
        user_id: user?.id,
        batch_name: formData.batchName,
        origin_location: formData.origin,
        fiber_composition: formData.composition || null,
        certification_id: formData.certification || null,
        production_date: new Date().toISOString().split("T")[0],
        status: "pending",
        metadata_json: formData.metadata ? JSON.parse(formData.metadata) : null,
      });

      if (error) throw error;

      // Create transaction record
      await supabase.from("transaction_history").insert({
        user_id: user?.id,
        transaction_type: "nft_mint",
        nft_id: nftId,
        status: "pending",
      });

      toast.success("NFT Minting Initiated!", {
        description: "Your textile batch is being registered on Hedera Token Service.",
      });

      // Simulate minting completion after 3 seconds
      setTimeout(async () => {
        const hederaTokenId = `0.0.${Math.floor(Math.random() * 9000000) + 1000000}`;
        
        await supabase
          .from("nft_metadata")
          .update({ 
            status: "minted",
            hedera_token_id: hederaTokenId 
          })
          .eq("nft_id", nftId);

        await supabase
          .from("transaction_history")
          .update({ 
            status: "completed",
            hedera_transaction_id: `0.0.${user?.id}@${Date.now()}.${Math.floor(Math.random() * 1000000)}` 
          })
          .eq("nft_id", nftId);

        toast.success("NFT Minted Successfully!", {
          description: `Certificate ${nftId} is now on the blockchain.`,
        });

        fetchNFTs();
      }, 3000);

      setFormData({ batchName: "", origin: "", composition: "", certification: "", metadata: "" });
      setShowMintForm(false);
      fetchNFTs();
    } catch (error: any) {
      toast.error(error.message || "Failed to mint NFT");
      console.error(error);
    }
  };

  const openHederaExplorer = (tokenId: string) => {
    // Link to Hedera Mirror Node Explorer
    window.open(`https://hashscan.io/mainnet/token/${tokenId}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-20">
          <p className="text-center text-muted-foreground">Loading your NFTs...</p>
        </div>
      </div>
    );
  }

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
                <Label htmlFor="batchName">Batch Name *</Label>
                <Input
                  id="batchName"
                  placeholder="e.g., Organic Cotton Batch A1"
                  value={formData.batchName}
                  onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
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
                <Label htmlFor="metadata">Additional Metadata (JSON)</Label>
                <Textarea
                  id="metadata"
                  placeholder='{"sustainability_score": 95, "ethical_rating": "A+"}'
                  value={formData.metadata}
                  onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
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
          {nfts.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No NFTs minted yet</p>
              <p className="text-sm text-muted-foreground mb-6">Create your first textile NFT certificate</p>
              <Button variant="hero" onClick={() => setShowMintForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Mint Your First NFT
              </Button>
            </Card>
          ) : (
            nfts.map((nft, index) => (
              <Card 
                key={nft.id} 
                className="p-6 card-shadow bg-card/50 backdrop-blur-sm hover:scale-[1.01] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold">{nft.batch_name}</h3>
                        <Badge variant={nft.status === "minted" ? "default" : "secondary"}>
                          {nft.status === "minted" ? (
                            <><CheckCircle className="w-3 h-3 mr-1" /> Minted</>
                          ) : (
                            <><Clock className="w-3 h-3 mr-1" /> Pending</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        NFT ID: {nft.nft_id} • Origin: {nft.origin_location} • Date: {nft.production_date}
                      </p>
                      {nft.hedera_token_id && (
                        <p className="text-xs text-primary">
                          Hedera Token: {nft.hedera_token_id}
                        </p>
                      )}
                    </div>
                  </div>
                  {nft.hedera_token_id && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openHederaExplorer(nft.hedera_token_id!)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Explorer
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;

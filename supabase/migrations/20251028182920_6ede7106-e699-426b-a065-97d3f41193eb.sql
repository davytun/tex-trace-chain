-- Create profiles table with wallet integration
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_id TEXT UNIQUE,
  display_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create NFT metadata table
CREATE TABLE public.nft_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nft_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  batch_name TEXT NOT NULL,
  origin_location TEXT NOT NULL,
  fiber_composition TEXT,
  certification_id TEXT,
  production_date DATE NOT NULL,
  sustainability_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'minted', 'verified')),
  hedera_token_id TEXT,
  metadata_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.nft_metadata ENABLE ROW LEVEL SECURITY;

-- RLS Policies for NFT metadata
CREATE POLICY "Users can view their own NFTs"
  ON public.nft_metadata
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own NFTs"
  ON public.nft_metadata
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own NFTs"
  ON public.nft_metadata
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view minted NFTs"
  ON public.nft_metadata
  FOR SELECT
  USING (status = 'minted' OR status = 'verified');

-- Create transaction history table
CREATE TABLE public.transaction_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('nft_mint', 'token_reward', 'token_redeem', 'delivery', 'verification')),
  nft_id TEXT REFERENCES public.nft_metadata(nft_id) ON DELETE SET NULL,
  amount DECIMAL(18, 2) DEFAULT 0,
  token_type TEXT DEFAULT 'TEX',
  hedera_transaction_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  metadata_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.transaction_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transaction history
CREATE POLICY "Users can view their own transactions"
  ON public.transaction_history
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions"
  ON public.transaction_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nft_metadata_updated_at
  BEFORE UPDATE ON public.nft_metadata
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, wallet_id)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'wallet_id'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for performance
CREATE INDEX idx_nft_metadata_user_id ON public.nft_metadata(user_id);
CREATE INDEX idx_nft_metadata_status ON public.nft_metadata(status);
CREATE INDEX idx_nft_metadata_nft_id ON public.nft_metadata(nft_id);
CREATE INDEX idx_transaction_history_user_id ON public.transaction_history(user_id);
CREATE INDEX idx_transaction_history_type ON public.transaction_history(transaction_type);
CREATE INDEX idx_profiles_wallet_id ON public.profiles(wallet_id);
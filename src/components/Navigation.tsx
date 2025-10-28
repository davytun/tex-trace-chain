import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Boxes, Package, User, Award, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">TexTrace</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/manufacturer" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/manufacturer") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Package className="inline w-4 h-4 mr-1" />
              Manufacturer
            </Link>
            <Link 
              to="/supplier" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/supplier") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <User className="inline w-4 h-4 mr-1" />
              Supplier
            </Link>
            <Link 
              to="/consumer" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/consumer") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Award className="inline w-4 h-4 mr-1" />
              Consumer
            </Link>
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="gradient" size="sm">
                Connect Wallet
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

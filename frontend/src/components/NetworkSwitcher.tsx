import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NetworkSwitcherProps {
  network: "mainnet" | "testnet";
  onNetworkChange: (network: "mainnet" | "testnet") => void;
}

export const NetworkSwitcher = ({ network, onNetworkChange }: NetworkSwitcherProps) => {
  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onNetworkChange("mainnet")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium transition-colors",
          network === "mainnet"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Mainnet
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onNetworkChange("testnet")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium transition-colors",
          network === "testnet"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Testnet
      </Button>
    </div>
  );
};


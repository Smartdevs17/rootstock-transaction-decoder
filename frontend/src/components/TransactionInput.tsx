import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TransactionInputProps {
  onSubmit: (txHash: string) => void;
  isLoading?: boolean;
}

export const TransactionInput = ({ onSubmit, isLoading }: TransactionInputProps) => {
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedHash = txHash.trim();
    
    if (!trimmedHash) {
      setError("Please enter a transaction hash");
      return;
    }
    
    if (!/^0x[a-fA-F0-9]{64}$/.test(trimmedHash)) {
      setError("Invalid transaction hash format. Must be 0x followed by 64 hexadecimal characters");
      return;
    }
    
    onSubmit(trimmedHash);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxHash(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="space-y-2">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Enter transaction hash (0x...)"
              value={txHash}
              onChange={handleChange}
              className={`font-mono text-sm bg-card border-border focus:border-primary transition-colors pr-4 pl-4 h-12 ${
                error ? "border-destructive" : ""
              }`}
            />
          </div>
          <Button
            type="submit"
            disabled={!txHash.trim() || isLoading}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Search className="w-4 h-4 mr-2" />
            Decode
          </Button>
        </div>
        {error && (
          <p className="text-sm text-destructive text-left">{error}</p>
        )}
      </div>
    </form>
  );
};

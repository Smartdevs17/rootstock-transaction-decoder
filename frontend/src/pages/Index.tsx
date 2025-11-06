import { useState, useEffect } from "react";
import { TransactionInput } from "@/components/TransactionInput";
import { TransactionSummary } from "@/components/TransactionSummary";
import { CallTraceTree } from "@/components/CallTraceTree";
import { EventsLog } from "@/components/EventsLog";
import { StateChanges } from "@/components/StateChanges";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { Card } from "@/components/ui/card";
import { Zap, GitBranch } from "lucide-react";
import { decodeTransaction } from "@/services/api";
import { toast } from "sonner";
import { TransactionData } from "@/types";

const Index = () => {
  const [network, setNetwork] = useState<"mainnet" | "testnet">("mainnet");
  const [decodedData, setDecodedData] = useState<TransactionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedNetwork = localStorage.getItem("rootstock-network") as "mainnet" | "testnet" | null;
    if (savedNetwork === "mainnet" || savedNetwork === "testnet") {
      setNetwork(savedNetwork);
    }
  }, []);

  const handleNetworkChange = (newNetwork: "mainnet" | "testnet") => {
    if (newNetwork === network) return;
    
    setNetwork(newNetwork);
    localStorage.setItem("rootstock-network", newNetwork);
    setDecodedData(null);
    setError(null);
    setIsLoading(false);
  };

  const handleSubmit = async (txHash: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await decodeTransaction(txHash, network);
      setDecodedData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to decode transaction";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Rootstock Tx-Ray</h1>
                <p className="text-xs text-muted-foreground">Visual Transaction Decoder</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <NetworkSwitcher network={network} onNetworkChange={handleNetworkChange} />
              <a
                href="https://rootstock.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Powered by Rootstock
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!decodedData && (
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Decode Any Rootstock Transaction
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Paste a transaction hash to visualize internal calls, state changes, and events in a
                human-readable format. Perfect for debugging and security auditing.
              </p>
            </div>

            <div className="mb-8">
              <TransactionInput onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <GitBranch className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-bold mb-2 text-foreground">Call Traces</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize nested contract calls with gas usage and return values
                </p>
              </Card>
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <div className="w-8 h-8 text-primary mb-3 mx-auto flex items-center justify-center text-2xl">
                  📝
                </div>
                <h3 className="font-bold mb-2 text-foreground">Event Logs</h3>
                <p className="text-sm text-muted-foreground">
                  Decoded event parameters with human-readable names
                </p>
              </Card>
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <div className="w-8 h-8 text-primary mb-3 mx-auto flex items-center justify-center text-2xl">
                  🔄
                </div>
                <h3 className="font-bold mb-2 text-foreground">State Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Track storage modifications before and after execution
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Decoding transaction...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="text-destructive mb-4">
              <p className="font-semibold mb-2">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <button
              onClick={() => {
                setError(null);
                setDecodedData(null);
              }}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {decodedData && !isLoading && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Transaction Details</h2>
              <button
                onClick={() => setDecodedData(null)}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                ← Decode Another Transaction
              </button>
            </div>

            <TransactionSummary {...decodedData} />

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <GitBranch className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Call Trace</h2>
              </div>
              <CallTraceTree trace={decodedData.callTrace} />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EventsLog events={decodedData.events} />
              <StateChanges changes={decodedData.stateChanges} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Open-source tool for the Rootstock community •{" "}
            <a 
              href="https://github.com/Smartdevs17/rootstock-transaction-decoder" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>{" "}
            •{" "}
            <a 
              href="https://github.com/Smartdevs17/rootstock-transaction-decoder#readme" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Documentation
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

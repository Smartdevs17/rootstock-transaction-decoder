import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, Fuel, Hash } from "lucide-react";

interface TransactionSummaryProps {
  txHash: string;
  status: "success" | "failed";
  blockNumber: string;
  timestamp: string;
  gasUsed: string;
  gasPrice: string;
  from: string;
  to: string;
  value: string;
}

export const TransactionSummary = ({
  txHash,
  status,
  blockNumber,
  timestamp,
  gasUsed,
  gasPrice,
  from,
  to,
  value,
}: TransactionSummaryProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Transaction Overview</h2>
          <div className="flex items-center gap-2">
            {status === "success" ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-success font-semibold">Success</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-semibold">Failed</span>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                Transaction Hash
              </div>
              <div className="font-mono text-sm text-foreground break-all">{txHash}</div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Block Number</div>
              <div className="font-mono text-sm text-primary">{blockNumber}</div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Timestamp
              </div>
              <div className="text-sm text-foreground">{timestamp}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">From</div>
              <div className="font-mono text-sm text-foreground break-all">{from}</div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">To</div>
              <div className="font-mono text-sm text-foreground break-all">{to}</div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Value</div>
              <div className="font-mono text-sm text-warning font-semibold">{value} RSK</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Gas Used:</span>
              <span className="font-mono text-sm text-foreground font-semibold">{gasUsed}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Gas Price:</span>
              <span className="font-mono text-sm text-foreground font-semibold">{gasPrice} Gwei</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

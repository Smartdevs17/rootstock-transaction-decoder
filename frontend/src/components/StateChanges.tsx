import { Card } from "@/components/ui/card";
import { Database, ArrowRight } from "lucide-react";

export interface StateChange {
  address: string;
  slot: string;
  before: string;
  after: string;
  decoded?: {
    variable: string;
    beforeValue: string;
    afterValue: string;
  };
}

interface StateChangesProps {
  changes: StateChange[];
}

export const StateChanges = ({ changes }: StateChangesProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <Database className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">State Changes</h2>
        <span className="text-sm text-muted-foreground">({changes.length} changes)</span>
      </div>

      <div className="space-y-3">
        {changes.map((change, index) => (
          <div
            key={index}
            className="p-4 bg-code-bg border border-code-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="mb-2">
              <span className="font-mono text-xs text-muted-foreground">
                {change.address.slice(0, 10)}...{change.address.slice(-8)}
              </span>
              {change.decoded && (
                <span className="ml-2 font-mono text-sm text-primary font-semibold">
                  {change.decoded.variable}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 font-mono text-sm">
              <div className="flex-1 p-2 bg-destructive/10 border border-destructive/20 rounded">
                <div className="text-xs text-muted-foreground mb-1">Before</div>
                <div className="text-foreground break-all">
                  {change.decoded?.beforeValue || change.before}
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />

              <div className="flex-1 p-2 bg-success/10 border border-success/20 rounded">
                <div className="text-xs text-muted-foreground mb-1">After</div>
                <div className="text-foreground break-all">
                  {change.decoded?.afterValue || change.after}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

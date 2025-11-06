import { ChevronDown, ChevronRight, CheckCircle2, XCircle, Activity } from "lucide-react";
import { useState } from "react";

export interface CallTrace {
  type: "CALL" | "DELEGATECALL" | "STATICCALL" | "CREATE" | "REVERT";
  from: string;
  to: string;
  value: string;
  gas: string;
  gasUsed: string;
  input: string;
  output: string;
  functionName?: string;
  success: boolean;
  depth: number;
  calls?: CallTrace[];
}

interface CallTraceTreeProps {
  trace: CallTrace;
  depth?: number;
}

export const CallTraceTree = ({ trace, depth = 0 }: CallTraceTreeProps) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CALL":
        return "text-primary";
      case "DELEGATECALL":
        return "text-accent";
      case "STATICCALL":
        return "text-muted-foreground";
      case "CREATE":
        return "text-warning";
      case "REVERT":
        return "text-destructive";
      default:
        return "text-foreground";
    }
  };

  const hasChildren = trace.calls && trace.calls.length > 0;

  return (
    <div className="font-mono text-sm">
      <div
        className={`flex items-start gap-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer border border-border ${
          depth > 0 ? "ml-6" : ""
        }`}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
            )
          ) : (
            <div className="w-4" />
          )}

          <div className="flex items-center gap-2 min-w-0 flex-1">
            {trace.success ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-success" />
            ) : (
              <XCircle className="w-4 h-4 flex-shrink-0 text-destructive" />
            )}

            <span className={`font-bold ${getTypeColor(trace.type)}`}>{trace.type}</span>

            {trace.functionName && (
              <span className="text-foreground font-semibold">{trace.functionName}()</span>
            )}

            <span className="text-muted-foreground truncate">
              {trace.to.slice(0, 10)}...{trace.to.slice(-8)}
            </span>

            {trace.value !== "0" && (
              <span className="text-warning font-medium">{trace.value} RSK</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground text-xs flex-shrink-0">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {trace.gasUsed}
          </span>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="mt-1">
          {trace.calls!.map((childTrace, index) => (
            <CallTraceTree key={index} trace={childTrace} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

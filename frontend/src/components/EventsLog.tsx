import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export interface Event {
  name: string;
  address: string;
  topics: string[];
  data: string;
  decoded?: {
    name: string;
    params: { name: string; type: string; value: string }[];
  };
}

interface EventsLogProps {
  events: Event[];
}

export const EventsLog = ({ events }: EventsLogProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Events Log</h2>
        <span className="text-sm text-muted-foreground">({events.length} events)</span>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 bg-code-bg border border-code-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-primary font-bold">{event.decoded?.name || event.name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {event.address.slice(0, 10)}...{event.address.slice(-8)}
              </span>
            </div>

            {event.decoded && (
              <div className="space-y-2 mt-3">
                {event.decoded.params.map((param, paramIndex) => (
                  <div key={paramIndex} className="flex gap-2 text-sm font-mono">
                    <span className="text-accent">{param.name}</span>
                    <span className="text-muted-foreground">({param.type}):</span>
                    <span className="text-foreground break-all">{param.value}</span>
                  </div>
                ))}
              </div>
            )}

            {!event.decoded && (
              <div className="mt-2 text-xs font-mono text-muted-foreground break-all">
                {event.data}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

import { CallTrace } from "@/components/CallTraceTree";
import { Event } from "@/components/EventsLog";
import { StateChange } from "@/components/StateChanges";

export interface TransactionData {
  txHash: string;
  status: "success" | "failed";
  blockNumber: string;
  timestamp: string;
  gasUsed: string;
  gasPrice: string;
  from: string;
  to: string;
  value: string;
  callTrace: CallTrace;
  events: Event[];
  stateChanges: StateChange[];
}


import { CallTrace } from "@/components/CallTraceTree";
import { Event } from "@/components/EventsLog";
import { StateChange } from "@/components/StateChanges";

export const mockTransactionData = {
  txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  status: "success" as const,
  blockNumber: "5234567",
  timestamp: "2024-11-06 14:32:18 UTC",
  gasUsed: "234,567",
  gasPrice: "0.06",
  from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  to: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  value: "0.5",
  
  callTrace: {
    type: "CALL" as const,
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    to: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    value: "0.5",
    gas: "250000",
    gasUsed: "234567",
    input: "0xa9059cbb",
    output: "0x0000000000000000000000000000000000000000000000000000000000000001",
    functionName: "transfer",
    success: true,
    depth: 0,
    calls: [
      {
        type: "CALL" as const,
        from: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        to: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        value: "0",
        gas: "150000",
        gasUsed: "87543",
        input: "0x095ea7b3",
        output: "0x0000000000000000000000000000000000000000000000000000000000000001",
        functionName: "approve",
        success: true,
        depth: 1,
        calls: []
      },
      {
        type: "DELEGATECALL" as const,
        from: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        to: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        value: "0",
        gas: "100000",
        gasUsed: "45678",
        input: "0x23b872dd",
        output: "0x0000000000000000000000000000000000000000000000000000000000000001",
        functionName: "transferFrom",
        success: true,
        depth: 1,
        calls: [
          {
            type: "STATICCALL" as const,
            from: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
            to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            value: "0",
            gas: "50000",
            gasUsed: "23456",
            input: "0x70a08231",
            output: "0x00000000000000000000000000000000000000000000000000000000000f4240",
            functionName: "balanceOf",
            success: true,
            depth: 2,
            calls: []
          }
        ]
      }
    ]
  } as CallTrace,

  events: [
    {
      name: "Transfer",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000742d35cc6634c0532925a3b844bc9e7595f0beb",
        "0x0000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984"
      ],
      data: "0x00000000000000000000000000000000000000000000000000000000000186a0",
      decoded: {
        name: "Transfer",
        params: [
          { name: "from", type: "address", value: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" },
          { name: "to", type: "address", value: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" },
          { name: "value", type: "uint256", value: "100000" }
        ]
      }
    },
    {
      name: "Approval",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      topics: [
        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
        "0x000000000000000000000000742d35cc6634c0532925a3b844bc9e7595f0beb",
        "0x000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7"
      ],
      data: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      decoded: {
        name: "Approval",
        params: [
          { name: "owner", type: "address", value: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" },
          { name: "spender", type: "address", value: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
          { name: "value", type: "uint256", value: "unlimited" }
        ]
      }
    }
  ] as Event[],

  stateChanges: [
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      slot: "0x0000000000000000000000000000000000000000000000000000000000000001",
      before: "0x00000000000000000000000000000000000000000000000000000000000f4240",
      after: "0x00000000000000000000000000000000000000000000000000000000000e4240",
      decoded: {
        variable: "balances[0x742d35Cc...]",
        beforeValue: "1,000,000",
        afterValue: "935,000"
      }
    },
    {
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      slot: "0x0000000000000000000000000000000000000000000000000000000000000002",
      before: "0x0000000000000000000000000000000000000000000000000000000000000000",
      after: "0x00000000000000000000000000000000000000000000000000000000000186a0",
      decoded: {
        variable: "balances[0x1f9840a8...]",
        beforeValue: "0",
        afterValue: "100,000"
      }
    },
    {
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      slot: "0x0000000000000000000000000000000000000000000000000000000000000003",
      before: "0x0000000000000000000000000000000000000000000000000000000000000000",
      after: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      decoded: {
        variable: "allowance[0x742d35Cc...][0xdAC17F95...]",
        beforeValue: "0",
        afterValue: "unlimited"
      }
    }
  ] as StateChange[]
};

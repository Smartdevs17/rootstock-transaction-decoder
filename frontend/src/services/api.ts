import { TransactionData } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'

interface ApiResponse<T> {
	success: boolean
	data?: T
	error?: string
	details?: unknown
}

export const decodeTransaction = async (txHash: string, network: 'mainnet' | 'testnet' = 'mainnet'): Promise<TransactionData> => {
	if (!txHash || !/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
		throw new Error('Invalid transaction hash format')
	}

	try {
		const response = await fetch(`${API_BASE_URL}/transactions/decode`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ txHash, network }),
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			const errorMessage = errorData.error || `HTTP error! status: ${response.status}`
			
			if (response.status === 404) {
				throw new Error('Transaction not found')
			}
			
			throw new Error(errorMessage)
		}

		const result: ApiResponse<TransactionData> = await response.json()

		if (!result.success || !result.data) {
			throw new Error(result.error || 'Failed to decode transaction')
		}

		return result.data
	} catch (error) {
		console.error('Error decoding transaction:', error)
		throw error instanceof Error ? error : new Error('Failed to decode transaction')
	}
}


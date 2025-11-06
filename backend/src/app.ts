import express, { Express } from 'express'
import cors from 'cors'
import { env } from './config/env'
import transactionRoutes from './routes/transaction.routes'
import { errorHandler, notFoundHandler } from './middleware/error-handler'
import { rateLimiter } from './middleware/rate-limiter'

export const createApp = (): Express => {
	const app = express()

	app.use(cors({
		origin: (origin, callback) => {
			const allowedOrigins = env.CORS_ORIGIN.split(',').map(o => o.trim())
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		credentials: true,
	}))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use(rateLimiter)

	app.get('/health', (_, res) => {
		res.status(200).json({
			success: true,
			message: 'Server is healthy',
			timestamp: new Date().toISOString(),
		})
	})

	app.use(`${env.API_PREFIX}/transactions`, transactionRoutes)

	app.use(notFoundHandler)
	app.use(errorHandler)

	return app
}


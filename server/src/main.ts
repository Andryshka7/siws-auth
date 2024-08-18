import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'

const PORT = 4000

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(
        session({
            secret: 'suslik',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false, // True in production
                httpOnly: true
            }
        })
    )

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true
    })

    await app.listen(PORT)
}

bootstrap()

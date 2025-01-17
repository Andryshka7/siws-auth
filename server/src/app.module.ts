import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules'

@Module({
    imports: [AuthModule, ConfigModule.forRoot()],
    controllers: [],
    providers: []
})
export class AppModule {}

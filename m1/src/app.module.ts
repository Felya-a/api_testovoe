import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import getRMQConfig from "./configs/rmq.config"
import { RMQModule } from "nestjs-rmq"
import { ConfigModule } from "@nestjs/config"

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: "envs/.env" }), RMQModule.forRootAsync(getRMQConfig())],
	controllers: [AppController],
})
export class AppModule {}

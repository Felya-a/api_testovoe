import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { RMQModule } from "nestjs-rmq"
import { ConfigModule } from "@nestjs/config"
import getRMQConfig from "./configs/rmq.config"

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: "envs/.env" }), RMQModule.forRootAsync(getRMQConfig())],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

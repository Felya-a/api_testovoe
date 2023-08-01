import { AppContract } from "@app/interface/contract"
import { Body, Controller, HttpException, HttpStatus, Logger, Post } from "@nestjs/common"
import { RMQService } from "nestjs-rmq"

@Controller()
export class AppController {
	logger = new Logger(AppController.name)
	constructor(private readonly rmqService: RMQService) {}

	@Post()
	async request(@Body() dto: AppContract.Request): Promise<AppContract.Response> {
		try {
			this.logger.debug(`Получено сообщение - ${JSON.stringify(dto)}`)
      const res = await this.rmqService.send<AppContract.Request, AppContract.Response>(AppContract.topic, { num: dto.num })
			this.logger.debug(`Ответ на запрос - ${JSON.stringify(res)}`)
			return res
		} catch (error) {
			this.logger.error(error)
			if (error instanceof HttpException) throw error
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}

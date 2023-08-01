import { AppContract } from "@app/interface/contract"
import { Body, Controller, HttpException, HttpStatus, Logger } from "@nestjs/common"
import { RMQRoute, RMQValidate } from "nestjs-rmq"

@Controller()
export class AppController {
	logger = new Logger(AppController.name)

	constructor() {}

	@RMQValidate()
	@RMQRoute(AppContract.topic)
	async get(@Body() dto: AppContract.Request): Promise<AppContract.Response> {
		try {
			this.logger.debug(`Получено сообщение - ${JSON.stringify(dto)}`)
			const res = { num: dto.num ** 2 }
			this.logger.debug(`Результат вычислений - ${JSON.stringify(dto)}`)
			return res
		} catch (error) {
			this.logger.error(error)
			if (error instanceof HttpException) throw error
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}

import { IsNumber, Max } from "class-validator"

export namespace AppContract {
    export const topic = "topic"
    export class Request{
        @IsNumber()
        @Max(1000)
        num: number
    }
    export class Response{
        @IsNumber()
        num: number
    }
}
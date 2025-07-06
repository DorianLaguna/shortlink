import { IsString, MinLength } from "class-validator";

export class CreateLinkDto {
    @IsString()
    @MinLength(1)
    redirect: string;
}

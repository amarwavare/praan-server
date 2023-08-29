import { IsNumber, IsNotEmpty } from "class-validator";

class CommonResponseDto {
    success: boolean;
    message?: string;
    error?: string|object|Array<any>;
    data?: any;
}

class ProcessFileDto {
    @IsNotEmpty()
    @IsNumber()
    fileId: number;
}

export {
    CommonResponseDto,
    ProcessFileDto,
}
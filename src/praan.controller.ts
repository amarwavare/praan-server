import { Controller, Get, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { PraanService } from './praan.service';
import { Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonResponseDto, ProcessFileDto } from './praan.dto';

@Controller('praan')
export class PraanController {
  constructor(
    private readonly praanService: PraanService,
    public logger: Logger,
    ) {}

  @Get()
  getHello(): string {
    this.logger.log('get hello triggered', 'RootApi');
    return this.praanService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<CommonResponseDto> {
    return this.praanService.uploadFile(file); 
  }

  @Get('list/pendingFiles')
  fetchPendingFiles(): Promise<CommonResponseDto> {
    return this.praanService.fetchPendingFiles();
  }

  @Post('process/file')
  processFile(
    @Body() payload: ProcessFileDto,
  ): Promise<CommonResponseDto> {
    return this.praanService.processFile(payload.fileId);
  }
}

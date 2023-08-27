import { Injectable, Logger } from '@nestjs/common';
import { CommonResponseDto } from './praan.dto';
import * as Excel from 'exceljs';
import { Readable } from'stream';
import * as csv from 'csvtojson';
import { PraanRepository } from './praan.repository';

@Injectable()
export class PraanService {
  private logger = new Logger();
  constructor(
    private praanRepository: PraanRepository,
  ) {}
  getHello(): string {
    return 'Welcome to Praan Interview Task';
  }

  async uploadFile(file:any):Promise<CommonResponseDto> {
    // this.logger.log(file, 'File Upload Service');
    if (!file) {
      return {
        success: false,
        error: 'File not uploaded'
      }
    }
    let workbook = new Excel.Workbook();
    let fileName:string = file?.originalname|| '-';
    // var base64 = btoa(
    //   new Uint8Array(file.buffer)
    //     .reduce((data, byte) => data + String.fromCharCode(byte), '')
    // );
    // console.log(file);
    // const myBuffer = Buffer.from(base64, 'base64');
    // this.logger.log(fileName, 'Uploaded file name');
    // var buffer = Buffer.from( new Uint8Array(file.buffer) );
    // const stream = Readable.from(buffer);
    
    // let worksheet = await workbook.csv.readFile(uint8Array);
    // console.log(worksheet)
    // let sheet = workbook.getWorksheet("test_dataset_all - Full stack t");
    // let cellValue = sheet.getRow(1).getCell(1).value;
    // console.log(cellValue, 'File Upload Service');
    let uint8Array = new Uint8Array(file.buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    this.logger.log(uint8Array,'uint8Array');
    let saveFile = await this.praanRepository.saveNewFile(uint8Array, fileName);
    console.log('saveFile', saveFile)
    if (saveFile.success == false) {
      return {
        success: false,
        error: 'Error occurred saving file to db'
      }
    }
    csv().fromString(uint8Array).subscribe((data) => {
      // console.log('data',data)
    })
    return {
      success: true,
      messasge: 'File uploaded successfully'
    }
  }
}

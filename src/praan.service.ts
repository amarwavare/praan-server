import { Injectable, Logger } from '@nestjs/common';
import { CommonResponseDto } from './praan.dto';
import * as Excel from 'exceljs';
import { Readable } from'stream';
import * as csv from 'csvtojson';
import { PraanRepository } from './praan.repository';
import CSVError from 'csvtojson/v2/CSVError';
import { Converter } from 'csvtojson/v2/Converter';

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
    if (!file) {
      return {
        success: false,
        error: 'File not uploaded'
      }
    }
    let workbook = new Excel.Workbook();
    let fileName:string = file?.originalname|| '-';
    let uint8Array = new Uint8Array(file.buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    // this.logger.log(uint8Array,'uint8Array');
    let saveFile = await this.praanRepository.saveNewFile(uint8Array, fileName);
    console.log('saveFile', saveFile)
    
    if (saveFile.fileId) {
      return {
        success: true,
        message: 'File uploaded successfully',
        data: saveFile
      }
    }
    return {
      success: false,
      error: 'Error occurred saving file to db'
    }
  }

  async processFile(fileId:number): Promise<CommonResponseDto> {
    var records:any[] = [];
    let file = await this.praanRepository.getFile(fileId, true);
    if (!file.file) {
      return {
        success: false,
        message: 'Unable to find file',
        error: file?.error
      }
    }

    let saveCsv = csv().fromString(file.file).subscribe(data => {
      return new Promise((resolve,reject) => {
        records.push(data)
        resolve();
      })
    },
    ((error: CSVError) => error),
    async ():Promise<Converter> => await this.praanRepository.insertIndividualRecord(fileId, JSON.stringify(records))
    )
    let totalRecords = (await saveCsv).length
    console.log('length',records.length, totalRecords);
    let latestFileData = (totalRecords === records.length) && await this.praanRepository.getFile(fileId);
    console.log('latestFileData',latestFileData)
    return {
      success: true,
      message: 'File processed successfully',
      data: {...latestFileData, totalRecords}
    }
  }

  async fetchPendingFiles():Promise<CommonResponseDto>{
    let pendingFiles = await this.praanRepository.fetchPendingFiles();
    if (pendingFiles.success === false || pendingFiles?.length < 1) {
      return {
        success: false,
        message: 'No records found',
      }
    }

    return {
      success: true,
      message: 'Records fetched successfully',
      data: pendingFiles
    }
  }
}

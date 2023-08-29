import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from "./db/file.entity";

export class PraanRepository {
    constructor(
        @InjectRepository(File)
        private praanRepository: Repository<File>,
    ) {}

    async saveNewFile(uint8Array: string, fileName: string): Promise<any> {
        try {
            return (await this.praanRepository.insert({file:uint8Array, fileName})).raw[0]
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    async insertIndividualRecord(fileId:number, fileDataJSON: string):Promise<any> {
        try {
            return (await this.praanRepository.update({fileId}, {fileDataJSON, isValidated: true})).raw[0]
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }

    async getFile(fileId: number, getbase64File = false):Promise<any> {
        try {
            return this.praanRepository.findOne({
                where: {
                    fileId
                },
                select: {
                    fileId: true,
                    createdAt: true,
                    updatedAt: true,
                    fileName: true,
                    isValidated: true,
                    file: getbase64File
                }
            })
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }
    
    async fetchPendingFiles():Promise<any> {
        try {
            return await this.praanRepository.find({
                where:{
                    isValidated:false
                }, 
                order : {
                    fileId: 'ASC'
                },
                select: {
                    fileId: true,
                    createdAt: true,
                    updatedAt: true,
                    fileName: true,
                    isValidated: true
                }
            });
        } catch (error) {
            return {
                success: false,
                error
            }
        }
    }
}
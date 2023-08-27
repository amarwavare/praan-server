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
            return await this.praanRepository.insert({file:uint8Array, fileName});
        } catch (error) {
            return {
                success: false
            }
        }
    }
}
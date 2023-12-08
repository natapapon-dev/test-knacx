import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatienRecord } from '@prisma/client';
import { PatienRecordReq, PatienRecordUpdateReq } from '../patien_record.dto';
import { off } from 'process';

@Injectable()
export class PatienRecordTodoService {
  constructor(private prisma: PrismaService) {}

  async create(patienRecord: PatienRecordReq): Promise<PatienRecord> {
    let result = await this.prisma.patienRecord.create({
      data: patienRecord,
    });

    return result;
  }

  async getPatienByHN(hn: string): Promise<PatienRecord> {
    let result = await this.prisma.patienRecord.findFirst({
      where: { hn: hn },
      include: {
        PatienAddresses: true,
      },
    });

    return result;
  }

  async getPatienById(id: number): Promise<PatienRecord> {
    let result = await this.prisma.patienRecord.findFirst({
      where: { id: id },
    });

    return result;
  }

  async update(patienRecord: PatienRecordUpdateReq): Promise<PatienRecord> {
    const result = await this.prisma.patienRecord.update({
      where: { hn: patienRecord.hn },
      data: patienRecord,
    });

    return result;
  }

  async generateHN(): Promise<string> {
    let data = (await this.prisma.patienRecord.count()) + 1;

    let numStr = data.toString();
    const zerosToAdd = Math.max(0, 10 - numStr.length);
    const paddedNumber = '0'.repeat(zerosToAdd) + numStr;

    return 'HN' + paddedNumber;
  }

  async searchPatien(page: number, pageSize: number): Promise<PatienRecord[]> {
    let result: any;
    const offset = (page - 1) * pageSize;
    result = await this.prisma.patienRecord.findMany({
      skip: offset,
      take: pageSize,
      include: { PatienAddresses: { where: { is_primary: true } } },
    });

    return result;
  }

  async deletePatien(hn: string): Promise<any> {
    const result = await this.prisma.patienRecord.delete({ where: { hn: hn } });
    return result;
  }
}

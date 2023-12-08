import { Injectable } from '@nestjs/common';
import { PatienRecordTodoService } from './patien_record.todo.service';
import { PatienRecordReq, PatienRecordUpdateReq } from '../patien_record.dto';
import { PatienRecord } from '@prisma/client';
import { AddressTodoService } from './address.todo.service';

@Injectable()
export class PatienRecordService {
  constructor(
    private patienService: PatienRecordTodoService,
    private addressService: AddressTodoService,
  ) {}

  async create(payload: PatienRecordReq): Promise<PatienRecord> {
    let result: any;
    let { addresses, ...patienReq } = payload;
    const hn_generate = await this.patienService.generateHN();

    patienReq = {
      ...patienReq,
      hn: hn_generate,
    };

    result = await this.patienService.create(patienReq);

    if (result) {
      if (addresses.length > 1 && addresses.length != 0) {
        addresses.forEach((item, index) => {
          addresses[index] = { ...item, patien_id: result.id };
        });

        result = await this.addressService.createManyAddress(addresses);
      } else {
        const address_payload = { ...addresses[0], patien_id: result.id };
        result = await this.addressService.create(address_payload);
      }
    }

    if (result) {
      result = await this.patienService.getPatienByHN(hn_generate);
    }

    return result;
  }

  async update(
    hn: string,
    payload: PatienRecordUpdateReq,
  ): Promise<PatienRecord> {
    let result: any;
    let { addresses, ...patienReq } = payload;

    result = await this.patienService.getPatienByHN(hn);

    if (!result) {
      result = {
        message: `patien with HN:: ${hn} is not found`,
      };
      return result;
    }

    patienReq = { ...patienReq, hn: hn };

    result = await this.patienService.update(patienReq);

    if (result) {
      result = await this.addressService.update(addresses);
    }

    if (result) {
      result = await this.patienService.getPatienByHN(payload.hn);
      result = {
        data: result,
        message: `Update patien with HN:: ${hn} successfully`,
      };
    }

    return result;
  }

  async getPatienByHN(hn: string): Promise<PatienRecord> {
    let result: any;
    result = await this.patienService.getPatienByHN(hn);

    if (result) {
      result = {
        data: result,
        message: 'ok',
      };
    } else {
      result = {
        data: null,
        message: `can not find patien with hn:: ${hn}`,
      };
    }

    return result;
  }

  async searchPatien(page: number, pageSize: number): Promise<PatienRecord[]> {
    let result: any;
    result = await this.patienService.searchPatien(page, pageSize);
    if (result) {
      result = {
        data: result,
        message: 'ok',
      };
    } else {
      result = {
        data: null,
        message: `patien record not found`,
      };
    }

    return result;
  }

  async deletePatien(hn: string): Promise<any> {
    let result: any;
    let delete_address_result: number = 0;
    result = await this.patienService.getPatienByHN(hn);

    if (!result) {
      return (result = {
        data: null,
        message: `can not find patien with hn:: ${hn}`,
      });
    }

    Promise.all(
      result.PatienAddresses.map(async (item) => {
        result = await this.addressService.deleteAddress(item.id);

        if (result) {
          delete_address_result += 1;
        }
      }),
    );

    if (delete_address_result !== result.PatienAddresses.length) {
      return (result = {
        data: null,
        message: 'can not delete address',
      });
    }

    result = await this.patienService.deletePatien(hn);

    if (result) {
      result = {
        data: null,
        message: 'delete patient successfully',
      };
    } else {
      result = {
        data: null,
        message: 'failed to delete patien',
      };
    }

    return result;
  }
}

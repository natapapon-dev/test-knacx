import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatienAddress } from '@prisma/client';
import { AddressReq, AddressUpdateReq } from '../patien_record.dto';

@Injectable()
export class AddressTodoService {
  constructor(private prisma: PrismaService) {}

  async create(payload: AddressReq): Promise<PatienAddress> {
    let result: any;
    result = await this.prisma.patienAddress.create({ data: payload });
    return result;
  }

  async getDefaultAddressByHN(hn: string): Promise<PatienAddress> {
    const result = await this.prisma.patienAddress.findFirst({
      where: { is_primary: true },
    });

    return result;
  }

  async update(payload: AddressUpdateReq[]): Promise<PatienAddress> {
    let result: any;
    let success_update: number = 0;

    await Promise.all(
      payload.map(async (item) => {
        result = await this.prisma.patienAddress.update({
          where: { id: item.id },
          data: item,
        });

        if (result) {
          success_update += 1;
        }
      }),
    );

    if (success_update === payload.length) {
      result = {
        message: 'Some address can not be updated',
      };
    }

    return result;
  }

  async createManyAddress(payload: AddressReq[]): Promise<PatienAddress[]> {
    let result: any;
    let success_record: number = 0;
    Promise.all(
      payload.map(async (item) => {
        result = await this.prisma.patienAddress.create({ data: item });
        if (result) {
          success_record += 1;
        }
      }),
    );

    if (success_record != payload.length) {
      result = { message: 'some address can not created' };
    }

    return result;
  }

  async deleteAddress(id: number): Promise<any> {
    const result = await this.prisma.patienAddress.delete({
      where: { id: id },
    });

    return result;
  }
}

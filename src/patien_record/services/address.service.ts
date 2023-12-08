import { Injectable } from '@nestjs/common';
import { AddressTodoService } from './address.todo.service';
import { PatienAddress } from '@prisma/client';
import { AddressReq } from '../patien_record.dto';

@Injectable()
export class AddressService {
  constructor(private addressService: AddressTodoService) {}

  async create(req: AddressReq): Promise<PatienAddress> {
    let payload = { ...req };

    let result = await this.addressService.create(payload);
    return result;
  }

  async getDefaultAddressByHN(hn: string): Promise<PatienAddress> {
    const result = await this.addressService.getDefaultAddressByHN(hn);
    return result;
  }

  async deleteAddress(id: number): Promise<PatienAddress> {
    const result = await this.addressService.deleteAddress(id);

    return result;
  }
}

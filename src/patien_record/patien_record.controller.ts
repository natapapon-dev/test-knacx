import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { PatienRecordReq, PatienRecordUpdateReq } from './patien_record.dto';
import { APIResponse } from 'src/share/share.dto';
import { ShareService } from 'src/share/share.service';
import { PatienRecordService } from './services/patien_record.service';

@Controller('api/v1/patien-record')
export class PatienRecordController {
  constructor(
    private shareService: ShareService,
    private patienRecordService: PatienRecordService,
  ) {}

  @Post()
  async saveRecord(
    @Body() patienRecordCreate: PatienRecordReq,
  ): Promise<APIResponse> {
    let result: any;
    try {
      result = await this.patienRecordService.create(patienRecordCreate);
      if (result) {
        result = this.shareService.buildResponse(
          result,
          'successfully save patient record',
          true,
          201,
        );
      } else {
        result = this.shareService.buildResponse(
          result,
          result.message,
          true,
          400,
        );
      }
    } catch (e) {
      result = this.shareService.buildResponse(result, e.message, false, 500);
    }

    return result;
  }

  @Patch('hn/:hnId')
  async updatePatien(
    @Param('hnId') hn,
    @Body() body: PatienRecordUpdateReq,
  ): Promise<APIResponse> {
    let result: any;
    try {
      result = await this.patienRecordService.update(hn, body);
      if (result) {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          true,
          201,
        );
      } else {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          false,
          400,
        );
      }
    } catch (e) {
      result = this.shareService.buildResponse(result, e.message, false, 500);
    }
    return result;
  }

  @Get()
  async getAllPatient(
    @Query('page') page: string,
    @Query('pageSize') size: string,
  ): Promise<APIResponse> {
    let result: any;

    try {
      const p = parseInt(page) | 1;
      const s = parseInt(size) | 5;
      result = await this.patienRecordService.searchPatien(p, s);

      if (result) {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          true,
          201,
        );
      } else {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          false,
          400,
        );
      }
    } catch (e) {
      result = this.shareService.buildResponse(result, e.message, false, 500);
    }
    return result;
  }

  @Get('hn/:hnId')
  async getPatientByHN(@Param('hnId') hnId): Promise<APIResponse> {
    let result: any;
    try {
      result = await this.patienRecordService.getPatienByHN(hnId);

      if (result) {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          true,
          201,
        );
      } else {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          false,
          400,
        );
      }
    } catch (e) {
      result = this.shareService.buildResponse(result, e.message, false, 500);
    }
    return result;
  }

  @Delete('hn/:hnId')
  async deletePatientByHN(@Param('hnId') hnId): Promise<APIResponse> {
    let result: any;
    try {
      result = await this.patienRecordService.deletePatien(hnId);

      if (result) {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          true,
          201,
        );
      } else {
        result = this.shareService.buildResponse(
          result.data,
          result.message,
          false,
          400,
        );
      }
    } catch (e) {
      result = this.shareService.buildResponse(result, e.message, false, 500);
    }
    return result;
  }
}

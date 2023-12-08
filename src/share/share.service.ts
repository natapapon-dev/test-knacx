import { Injectable } from '@nestjs/common';
import { APIResponse } from './share.dto';

@Injectable()
export class ShareService {
  buildResponse(
    data: any,
    message: String,
    status: boolean,
    http_code: Number,
  ): APIResponse {
    const result = new APIResponse();
    result.data = data;
    result.message = message;
    result.status = status;
    result.http_code = http_code;
    return result;
  }
}

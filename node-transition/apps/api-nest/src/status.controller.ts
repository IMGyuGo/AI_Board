import { Controller, Get } from '@nestjs/common';

import {
  SPRING_STATUS_RESPONSE,
  type StatusResponse,
} from '@node-transition/contracts';

@Controller('api')
export class StatusController {
  @Get('status')
  getStatus(): StatusResponse {
    return { ...SPRING_STATUS_RESPONSE };
  }
}

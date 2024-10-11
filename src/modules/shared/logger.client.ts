import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerClient {
  info(...data: any[]) {
    return console.log(data);
  }
}

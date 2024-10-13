import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerClient {
  info(...data: any[]) {
    return console.log(data);
  }

  error(...data: any[]) {
    return console.error(data);
  }
}

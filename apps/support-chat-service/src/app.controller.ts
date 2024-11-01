import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetHelpDto } from './dto/get-help.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getHello(@Body() getHelpDto: GetHelpDto) {
    return await this.appService.getHello(getHelpDto);
  }
}

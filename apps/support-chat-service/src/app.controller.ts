import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { GetHelpDto } from './dto/get-help.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Post('/here/tips')
  async generate(@Body() getHelpDto: GetHelpDto) {
    return await this.appService.getTipsMocked(getHelpDto);
    return await this.appService.getTips(getHelpDto);
  }

  @Post('/here/tips-stream')
  async generateStream(@Body() getHelpDto: GetHelpDto, @Res() res: any) {
    const stream = await this.appService.getTipsStream(getHelpDto);

    for await (const chunk of stream.stream) {
      res.write(chunk.candidates[0].content.parts[0].text || '');
    }

    return res.end();
  }
}

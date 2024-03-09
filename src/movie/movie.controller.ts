import { Controller, Get, Query } from '@nestjs/common';

@Controller('movie')
export class MovieController {

    @Get()
    findAll(@Query() query: any) {
      return 'This action returns all movies';
    }
}

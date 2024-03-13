import { Module } from '@nestjs/common'
import { StarwarsService } from './starwars.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule
  ],
  providers: [StarwarsService]
})
export class StarwarsModule { }

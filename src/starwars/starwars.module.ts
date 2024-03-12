import { Module } from '@nestjs/common'
import { StarwarsService } from './starwars.service'
import { HttpModule, HttpModuleOptions } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://swapi.py4e.com/api/',
      timeout: 5000,
      headers: { Connection: 'Keep-Alive' }
    })

    // HttpModule.registerAsync({
    //   useFactory: async (): Promise<HttpModuleOptions> => ({
    //     headers: {
    //       'Connection': 'Keep-Alive'
    //     },
    //     baseURL: 'https://swapi.py4e.com/api/',
    //   }),
    // }),
  ],
  providers: [StarwarsService]
})
export class StarwarsModule { }

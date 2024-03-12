import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { type MappedResponse } from './models/mapped-response'
import { People } from './models/people'
import { type AxiosError } from 'axios'
import { type QueryDto } from 'src/modules/character/dto/query.dto'
import { catchError, firstValueFrom } from 'rxjs'
import { type Film } from './models/film'

@Injectable()
export class StarwarsService {
  constructor (private readonly httpService: HttpService) { }

  async getPeople (params: QueryDto): Promise<any> {
    try {
      // return await this.httpService.get('https://swapi.py4e.com/api/people', {headers: { 'Connection': 'Keep-Alive'}}).toPromise();
      // const { data } = await this.httpService.axiosRef.get<any>('people');

      // return data;

      const { data } = await firstValueFrom(
        this.httpService.get<any>('https://swapi.py4e.com/api/people/?search=walker&format=json', { headers: { Connection: 'Keep-Alive' } }).pipe(
          catchError((error: AxiosError) => {
            throw new Error(error.message)
          })
        )
      )
      return data
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }

  async getFilms (): Promise<MappedResponse<Film[]>> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<MappedResponse<Film[]>>('https://swapi.py4e.com/api/films', { headers: { Connection: 'Keep-Alive' } }).pipe(
          catchError((error: AxiosError) => {
            throw new Error(error.message)
          })
        )
      )
      return data
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }
}

import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { type MappedResponse } from './models/mapped-response'
import { People } from './models/people'
import { type AxiosError } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'
import { type Film } from './models/film'
import { configuration } from 'src/config'

@Injectable()
export class StarwarsService {
    private baseUrl: string = configuration().swapiUrl;
    constructor(private readonly httpService: HttpService) { }

    async getPeople(): Promise<MappedResponse<People[]>> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<MappedResponse<People[]>>(`${this.baseUrl}/people`, { headers: { Connection: 'Keep-Alive' } }).pipe(
                    catchError((error: AxiosError) => {
                        throw new Error(error.message)
                    })
                )
            )
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    async getFilms(): Promise<MappedResponse<Film[]>> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<MappedResponse<Film[]>>(`${this.baseUrl}/films`, { headers: { Connection: 'Keep-Alive' } }).pipe(
                    catchError((error: AxiosError) => {
                        throw new Error(error.message)
                    })
                )
            )
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
}

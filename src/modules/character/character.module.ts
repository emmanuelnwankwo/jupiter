import { Module } from '@nestjs/common'
import { CharacterService } from './character.service'
import { CharacterController } from './character.controller'
import { HttpModule } from '@nestjs/axios'
import { StarwarsService } from 'src/starwars/starwars.service'

@Module({
  imports: [HttpModule],
  controllers: [CharacterController],
  providers: [CharacterService, StarwarsService]
})
export class CharacterModule {}

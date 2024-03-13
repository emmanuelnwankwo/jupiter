import { Module } from '@nestjs/common'
import { CharacterModule } from './modules/character/character.module'
import { CommentModule } from './modules/comment/comment.module'
import { StarwarsModule } from './starwars/starwars.module'
import { MovieModule } from './modules/movie/movie.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configuration } from './config'
import { ConfigModule } from '@nestjs/config'
import { Comment } from './core/entities/comment.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      load: [configuration]
    }),
    TypeOrmModule.forRoot({
      ...configuration().database,
      type: 'postgres',
      synchronize: true,
      entities: [Comment],
      migrations: [__dirname + '/dist/migrations/*.js']
    }),
    CharacterModule, CommentModule, StarwarsModule, MovieModule],
  controllers: [],
  providers: []
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { StarwarsService } from 'src/starwars/starwars.service'
import { HttpModule } from '@nestjs/axios'
import { CommentService } from '../comment/comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from '../../core/entities/comment.entity'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Comment])],
  controllers: [MovieController],
  providers: [MovieService, StarwarsService, CommentService]
})
export class MovieModule {}

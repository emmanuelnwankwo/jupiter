import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { type Config } from './config/type'
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from './common/utils/exception.filter'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService<Config, true>)

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Jupiter API')
    .setDescription('OpenAPI Swagger documentation for Jupiter API')
    .setVersion('1.0')
    .addTag('Comments', 'Movies comments')
    .addTag('Characters', 'Star Wars characters')
    .addTag('Movies', 'Star Wars movies')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(configService.get('APP_PORT'))
}
bootstrap()

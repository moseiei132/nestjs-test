import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import commonConfig from 'config/common.config'
import databaseConfig from 'config/database.config'
import jwtConfig from 'config/jwt.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { DatabaseModule } from './database/database.module'
import { ForumModule } from './forums/forum.module'
import { TopicModule } from './topics/topic.module'
import { UserModule } from './users/user.module'
import { PostModule } from './posts/post.module'
import { ForumRepository } from './forums/repositories/forum.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TopicRepository } from './topics/repositories/topic.repository'
import { PostRepository } from './posts/repositories/post.repository'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, commonConfig, jwtConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    TopicModule,
    ForumModule,
    PostModule,
    TypeOrmModule.forFeature([ForumRepository]),
    TypeOrmModule.forFeature([TopicRepository]),
    TypeOrmModule.forFeature([PostRepository]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}

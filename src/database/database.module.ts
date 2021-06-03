import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        database: configService.get<string>('database.name'),
        entities: ['dist/**/**.entity{.ts,.js}'],
        subscribers: ['dist/**/**.subscriber{.ts,.js}'],
        timezone: '+07:00',
        synchronize: false,
        dateStrings: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

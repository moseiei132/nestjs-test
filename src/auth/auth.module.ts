import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [PassportModule, JwtModule.register({
    secret: "secret",
    signOptions: { expiresIn: '3600s' },
  }),
  TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, PassportModule, JwtStrategy]
})
export class AuthModule { }

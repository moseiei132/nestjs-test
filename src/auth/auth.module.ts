import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/users/services/user.service';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
  }),
  TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }

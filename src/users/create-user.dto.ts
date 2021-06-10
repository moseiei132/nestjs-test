import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50, {
    message: 'Username is too long',
  })
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty()
  password: string
}

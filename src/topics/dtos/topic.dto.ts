import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class TopicBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64, {
    message: 'Name is too long',
  })
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(256, {
    message: 'Body is too long',
  })
  @ApiProperty()
  body: string
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64, {
    message: 'Name is too long',
  })
  @ApiProperty()
  name: string

  @IsString()
  @MaxLength(256, {
    message: 'Body is too long',
  })
  @ApiProperty()
  description: string
}

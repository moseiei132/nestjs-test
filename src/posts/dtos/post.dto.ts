import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  topicId: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @MaxLength(256, {
    message: 'Body is too long',
  })
  @ApiProperty()
  body: string
}

export class PostBodyDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  topicId: number

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(256, {
    message: 'Body is too long',
  })
  @ApiProperty()
  body: string
}

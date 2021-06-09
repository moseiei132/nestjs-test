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
  topicId: number

  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @MaxLength(256, {
    message: 'Body is too long',
  })
  body: string
}

export class PostBodyDto {
  @IsNumber()
  @IsNotEmpty()
  topicId: number

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(256, {
    message: 'Body is too long',
  })
  body: string
}

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class TopicBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(64, {
    message: 'Name is too long',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(256, {
    message: 'Body is too long',
  })
  body: string
}

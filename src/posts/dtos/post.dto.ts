export class CreatePostDto {
  topicId: number
  userId: number
  body: string
}

export class PostBodyDto {
  topicId: number
  body: string
}

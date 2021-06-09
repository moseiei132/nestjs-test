export interface ITopic {
  forumId: number
  name: string
  userId: number
  body: string
}

export interface IDeleteTopic {
  topicId: number
  userId: number
}

export interface IEditTopic {
  topicId: number
  userId: number
  name: string
  body: string
}

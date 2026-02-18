export type UserInfo = {
  id: string
  name: string
  email: string
  role: string
}

export type Post = {
  id: string
  createdAt: string
  deletedAt: string | null
  updatedAt: string
  content: string
  status: string
  title: string
  user: {
    name: string
  }
  userId: string
}

export type GenericListResponse<DataType> = {
  info: {
    count: number
  }
  records: DataType[]
}

export type PostListResponse = GenericListResponse<Post>
export type PostResponse = Post
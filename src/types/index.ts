

export type UserData = {
  id: number,
  name: string,
  email: string,
  githubNick?: string
  connectToGithub?: boolean
  profileDescription?: string
}

export type LoginBody = {
  login: string,
  password: string
}

export type LoginResponse = {
  token: string
  user: UserData
}

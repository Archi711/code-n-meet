export type UserData = {
  id: number
  name: string
  email: string
  githubNick?: string
  connectToGithub?: boolean
  profileDescription?: string
}

export type LoginBody = {
  login: string
  password: string
}

export type LoginResponse = {
  token: string
  user: UserData
}

export type RegisterBody = {
  login: string
  password: string
  email: string
}

export type RegisterResponse = {
  success: boolean
}

export type EditProfileData = Partial<Omit<UserData, 'id'>> & {
  password: string
}

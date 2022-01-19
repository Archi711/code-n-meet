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

export type PostResponse = {
  id: number
  title: string
  content: string
  Group: {
    id: number
    name: string
  }
  User: {
    id: number
    name: string
  }
}

export type GHProfileResponse = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string | null
  blog: string | null
  location: string | null
  email: null | string
  hireable: null | boolean
  bio: string | null
  twitter_username: null | string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  [key: string]: string | null | boolean | number
}

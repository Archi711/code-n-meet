
export const GroupTypes = ["LANGUAGE", "PROJECT", "COMPANY", "COMMUNITY"] as const

export type GroupType = typeof GroupTypes[number]

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

export type EditProfileData = Partial<Omit<UserData, 'id'> & {
  password: string
  [key: string]: string | number | undefined | boolean
}>

export type GroupPrivacySP = 'all' | 'public' | 'private'

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

export type PostBody = {
  title: string
  content: string
  idGroup: number
}

export type GroupResponse = {
  id: number
  name: string
  description: string | null
  type: string
  isPrivate: boolean
  repoLink: string
  User: {
    id: number
    name: string
  }
  Users: {
    id: number
    name: string
  }[]
}


export type GroupCreateBody = {
  name: string
  description: string
  type: GroupType,
  isPrivate: boolean
  repoLink?: string
}

export type DeleteProfileBody = {
  password: string
  id: number
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

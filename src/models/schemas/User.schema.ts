import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực• email
  Banned //bi khoa
}

interface UserType {
  _id?: ObjectId
  name?: string
  email?: string
  date_of_birth?: Date
  password?: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  bio?: string
  location?: string

  website?: string
  username?: string
  avatar?: string
  cover_photo?: string //optional
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string // jwt hoặc "" nếu đã xác thực emoil
  forgot_password_token: string // jwt hoặc néu đã xác thực emoil
  verify: UserVerifyStatus
  bio: string // perional
  location: string

  website: string
  username: string
  avatar: string // optionol
  cover_photo: string //optional

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id
    this.name = user.name || ''
    this.email = user.email || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.password = user.password || ''
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
  }
}

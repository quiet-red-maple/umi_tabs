export interface LoginData {
  phone: number,
  password: string,
  remember: boolean,
  agree: boolean
}

export interface RegisterData {
  enterprise: string,
  invitationCode: string,
  phone: number,
  password: string,
  confirm: string,
  captcha: string,
  agree: boolean
}

export interface ForgetPasswordData {
  phone: number,
  captcha: string,
  password: string,
  confirm: string
}

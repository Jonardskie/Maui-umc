import { Status } from './common'

export type MemberRole = 'admin' | 'treasurer' | 'secretary' | 'deacon' | 'member'

export interface Member {
  id: string
  memberId: string
  firstName: string
  lastName: string
  phone: string
  address: string
  dateJoined: string
  status: Status
  role: MemberRole
  loginId: string
  password: string
}

export interface MemberStats {
  totalMembers: number
  activeMembers: number
  inactiveMembers: number
  newThisMonth: number
  percentageActive: number
}

export type MemberFormData = Omit<Member, 'id'>

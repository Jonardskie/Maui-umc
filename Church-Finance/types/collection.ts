import { Status } from './common'

export type ContributionType = 'tithes' | 'offerings' | 'special' | 'thanksgiving' | 'love_gift' | 'donation' | 'fundraising'
export type FundType = 'general' | 'building' | 'benevolence' | 'operations' | 'missions'

export interface Collection {
  id: string
  date: string
  memberName: string
  type: ContributionType
  fund: FundType
  amount: number
  verificationStatus: 'verified' | 'pending'
}

export interface CollectionStats {
  todayCollections: number
  todayAmount: number
  weeklyCollections: number
  weeklyAmount: number
  monthlyCollections: number
  monthlyAmount: number
  pendingVerificationCount: number
  pendingPercentage: number
}

export type CollectionFormData = Omit<Collection, 'id'>

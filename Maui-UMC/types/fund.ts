import { Status } from './common'

export interface Fund {
  id: string
  name: string
  balance: number
  targetBalance: number
  income: number
  expenses: number
  description: string
  status: Status
  createdDate: string
}

export interface FundStats {
  totalBalance: number
  totalIncome: number
  totalExpenses: number
  totalFunds: number
}

export interface FundGrowthData {
  month: string
  general: number
  building: number
  mission: number
}

export type FundFormData = Omit<Fund, 'id' | 'createdDate'>

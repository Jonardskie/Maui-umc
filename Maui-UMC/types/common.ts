export type Status = 'active' | 'inactive'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  key: string
  direction: SortDirection
}

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
}

export interface DialogState {
  isOpen: boolean
  data?: Record<string, any>
}

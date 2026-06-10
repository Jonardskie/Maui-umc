'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { Fund } from './funds-table'

interface CreateFundDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateFund: (fundData: { name: string; targetBalance: number; description: string }) => void
}

interface EditFundDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fund: Fund | null
  onSaveFund: (fundId: string, fundData: { name: string; targetBalance: number; description: string }) => void
}

interface DeleteFundDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fund: Fund | null
  onConfirmDelete: (fundId: string) => void
}

export function CreateFundDialog({ open, onOpenChange, onCreateFund }: CreateFundDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    targetBalance: '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Fund name is required'
    if (!formData.targetBalance || parseFloat(formData.targetBalance) <= 0) {
      newErrors.targetBalance = 'Target balance must be greater than 0'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onCreateFund({
        name: formData.name,
        targetBalance: parseFloat(formData.targetBalance),
        description: formData.description,
      })
      setFormData({ name: '', targetBalance: '', description: '' })
      setErrors({})
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Fund</DialogTitle>
          <DialogDescription>Add a new church fund to the system</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fund Name</label>
            <Input
              placeholder="e.g., Building Fund"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Balance</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.targetBalance}
              onChange={(e) => setFormData({ ...formData, targetBalance: e.target.value })}
              className={errors.targetBalance ? 'border-red-500' : ''}
            />
            {errors.targetBalance && <p className="text-xs text-red-500">{errors.targetBalance}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              placeholder="Optional description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Fund</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function EditFundDialog({ open, onOpenChange, fund, onSaveFund }: EditFundDialogProps) {
  const [formData, setFormData] = useState({
    name: fund?.name || '',
    targetBalance: fund?.currentBalance.toString() || '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Fund name is required'
    if (!formData.targetBalance || parseFloat(formData.targetBalance) <= 0) {
      newErrors.targetBalance = 'Target balance must be greater than 0'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm() && fund) {
      onSaveFund(fund.id, {
        name: formData.name,
        targetBalance: parseFloat(formData.targetBalance),
        description: formData.description,
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Fund</DialogTitle>
          <DialogDescription>Update fund information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fund Name</label>
            <Input
              placeholder="Fund name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Balance</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.targetBalance}
              onChange={(e) => setFormData({ ...formData, targetBalance: e.target.value })}
              className={errors.targetBalance ? 'border-red-500' : ''}
            />
            {errors.targetBalance && <p className="text-xs text-red-500">{errors.targetBalance}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              placeholder="Optional description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteFundDialog({ open, onOpenChange, fund, onConfirmDelete }: DeleteFundDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Fund</DialogTitle>
          <DialogDescription>Are you sure you want to delete &quot;{fund?.name}&quot;?</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. All associated records will remain but the fund will no longer be available.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (fund) {
                onConfirmDelete(fund.id)
                onOpenChange(false)
              }
            }}
          >
            Delete Fund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Collection } from './collections-table'

interface CollectionDialogsProps {
  recordOpen: boolean
  onRecordOpenChange: (open: boolean) => void
  editingCollection: Collection | null
  editOpen: boolean
  onEditOpenChange: (open: boolean) => void
  verifyingCollectionId: string | null
  verifyOpen: boolean
  onVerifyOpenChange: (open: boolean) => void
  onRecordSubmit: (collection: Omit<Collection, 'id'>) => void
  onEditSubmit: (collection: Collection) => void
  onVerifyConfirm: () => void
}

const CONTRIBUTION_TYPES = ['Tithes', 'Offerings', 'Special', 'Thanksgiving', 'Love Gift', 'Donation', 'Fundraising']
const FUNDS = ['General Fund', 'Building Fund', 'Benevolence Fund', 'Operations Fund', 'Missions Fund']

const SAMPLE_MEMBERS = [
  'John Smith',
  'Mary Johnson',
  'Robert Williams',
  'Patricia Brown',
  'Michael Davis',
  'Jennifer Wilson',
]

export default function CollectionDialogs({
  recordOpen,
  onRecordOpenChange,
  editingCollection,
  editOpen,
  onEditOpenChange,
  verifyingCollectionId,
  verifyOpen,
  onVerifyOpenChange,
  onRecordSubmit,
  onEditSubmit,
  onVerifyConfirm,
}: CollectionDialogsProps) {
  const [recordForm, setRecordForm] = useState({
    date: new Date().toISOString().split('T')[0],
    memberName: '',
    type: 'Offerings',
    fund: 'General Fund',
    amount: '',
  })

  const [editForm, setEditForm] = useState({
    date: editingCollection?.date || '',
    memberName: editingCollection?.memberName || '',
    type: editingCollection?.type || 'Offerings',
    fund: editingCollection?.fund || 'General Fund',
    amount: editingCollection?.amount || '',
  })

  const handleRecordChange = (field: string, value: string | number) => {
    setRecordForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditChange = (field: string, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleRecordSubmit = () => {
    if (!recordForm.memberName || !recordForm.amount) {
      alert('Please fill in all required fields')
      return
    }

    onRecordSubmit({
      date: recordForm.date,
      memberName: recordForm.memberName,
      type: recordForm.type,
      fund: recordForm.fund,
      amount: parseFloat(recordForm.amount as string),
      verificationStatus: 'pending',
    })

    setRecordForm({
      date: new Date().toISOString().split('T')[0],
      memberName: '',
      type: 'Offerings',
      fund: 'General Fund',
      amount: '',
    })
    onRecordOpenChange(false)
  }

  const handleEditSubmit = () => {
    if (!editForm.memberName || !editForm.amount) {
      alert('Please fill in all required fields')
      return
    }

    if (editingCollection) {
      onEditSubmit({
        ...editingCollection,
        date: editForm.date,
        memberName: editForm.memberName,
        type: editForm.type,
        fund: editForm.fund,
        amount: parseFloat(editForm.amount as string),
      })
    }

    onEditOpenChange(false)
  }

  return (
    <>
      {/* Record Collection Dialog */}
      <Dialog open={recordOpen} onOpenChange={onRecordOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Collection</DialogTitle>
            <DialogDescription>Add a new collection to the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Date</label>
                <Input
                  type="date"
                  value={recordForm.date}
                  onChange={(e) => handleRecordChange('date', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Member</label>
                <select
                  value={recordForm.memberName}
                  onChange={(e) => handleRecordChange('memberName', e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select member...</option>
                  {SAMPLE_MEMBERS.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
                <select
                  value={recordForm.type}
                  onChange={(e) => handleRecordChange('type', e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {CONTRIBUTION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Fund</label>
                <select
                  value={recordForm.fund}
                  onChange={(e) => handleRecordChange('fund', e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {FUNDS.map((fund) => (
                    <option key={fund} value={fund}>
                      {fund}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={recordForm.amount}
                onChange={(e) => handleRecordChange('amount', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onRecordOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleRecordSubmit}>Record Collection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Collection Dialog */}
      <Dialog open={editOpen} onOpenChange={onEditOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Collection</DialogTitle>
            <DialogDescription>Update collection information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Date</label>
                <Input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => handleEditChange('date', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Member</label>
                <select
                  value={editForm.memberName}
                  onChange={(e) => handleEditChange('memberName', e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select member...</option>
                  {SAMPLE_MEMBERS.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
                <select
                  value={editForm.type}
                  onChange={(e) => handleEditChange('type', e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {CONTRIBUTION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Fund</label>
                <select
                  value={editForm.fund}
                  onChange={(e) => handleEditChange('fund', e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {FUNDS.map((fund) => (
                    <option key={fund} value={fund}>
                      {fund}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={editForm.amount}
                onChange={(e) => handleEditChange('amount', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onEditOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Collection Dialog */}
      <Dialog open={verifyOpen} onOpenChange={onVerifyOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Collection</DialogTitle>
            <DialogDescription>Confirm that this collection has been verified and recorded</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to mark this collection as verified? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => onVerifyOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
              onVerifyConfirm()
              onVerifyOpenChange(false)
            }}>
              Verify Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CollectionStatsCard from '@/components/dashboard/collection-stats-card'
import CollectionsTable, { type Collection } from '@/components/dashboard/collections-table'
import CollectionDialogs from '@/components/dashboard/collection-dialogs'

// Mock data
const mockCollections: Collection[] = [
  {
    id: '1',
    date: '2024-06-08',
    memberName: 'John Smith',
    type: 'Tithes',
    fund: 'General Fund',
    amount: 500,
    verificationStatus: 'verified',
  },
  {
    id: '2',
    date: '2024-06-08',
    memberName: 'Mary Johnson',
    type: 'Offerings',
    fund: 'Building Fund',
    amount: 250,
    verificationStatus: 'pending',
  },
  {
    id: '3',
    date: '2024-06-07',
    memberName: 'Robert Williams',
    type: 'Special',
    fund: 'Benevolence Fund',
    amount: 1000,
    verificationStatus: 'verified',
  },
  {
    id: '4',
    date: '2024-06-07',
    memberName: 'Patricia Brown',
    type: 'Tithes',
    fund: 'General Fund',
    amount: 350,
    verificationStatus: 'verified',
  },
  {
    id: '5',
    date: '2024-06-06',
    memberName: 'Michael Davis',
    type: 'Thanksgiving',
    fund: 'Operations Fund',
    amount: 150,
    verificationStatus: 'pending',
  },
  {
    id: '6',
    date: '2024-06-06',
    memberName: 'Jennifer Wilson',
    type: 'Love Gift',
    fund: 'General Fund',
    amount: 200,
    verificationStatus: 'verified',
  },
  {
    id: '7',
    date: '2024-06-05',
    memberName: 'David Martinez',
    type: 'Offerings',
    fund: 'Missions Fund',
    amount: 300,
    verificationStatus: 'verified',
  },
  {
    id: '8',
    date: '2024-06-05',
    memberName: 'Sarah Anderson',
    type: 'Donation',
    fund: 'Building Fund',
    amount: 500,
    verificationStatus: 'pending',
  },
  {
    id: '9',
    date: '2024-06-04',
    memberName: 'James Taylor',
    type: 'Tithes',
    fund: 'General Fund',
    amount: 450,
    verificationStatus: 'verified',
  },
  {
    id: '10',
    date: '2024-06-04',
    memberName: 'Lisa Garcia',
    type: 'Offerings',
    fund: 'General Fund',
    amount: 175,
    verificationStatus: 'verified',
  },
  {
    id: '11',
    date: '2024-06-03',
    memberName: 'Christopher Lee',
    type: 'Fundraising',
    fund: 'Building Fund',
    amount: 2000,
    verificationStatus: 'pending',
  },
  {
    id: '12',
    date: '2024-06-03',
    memberName: 'Jessica White',
    type: 'Tithes',
    fund: 'General Fund',
    amount: 400,
    verificationStatus: 'verified',
  },
  {
    id: '13',
    date: '2024-06-02',
    memberName: 'Daniel Harris',
    type: 'Offerings',
    fund: 'Benevolence Fund',
    amount: 100,
    verificationStatus: 'verified',
  },
  {
    id: '14',
    date: '2024-06-02',
    memberName: 'Rachel Clark',
    type: 'Special',
    fund: 'Missions Fund',
    amount: 750,
    verificationStatus: 'pending',
  },
  {
    id: '15',
    date: '2024-06-01',
    memberName: 'Kevin Lewis',
    type: 'Thanksgiving',
    fund: 'General Fund',
    amount: 300,
    verificationStatus: 'verified',
  },
  {
    id: '16',
    date: '2024-06-01',
    memberName: 'Amanda Walker',
    type: 'Love Gift',
    fund: 'Building Fund',
    amount: 125,
    verificationStatus: 'verified',
  },
  {
    id: '17',
    date: '2024-05-31',
    memberName: 'Brandon Hall',
    type: 'Offerings',
    fund: 'Operations Fund',
    amount: 200,
    verificationStatus: 'pending',
  },
  {
    id: '18',
    date: '2024-05-31',
    memberName: 'Stephanie Young',
    type: 'Tithes',
    fund: 'General Fund',
    amount: 550,
    verificationStatus: 'verified',
  },
  {
    id: '19',
    date: '2024-05-30',
    memberName: 'Timothy King',
    type: 'Donation',
    fund: 'Benevolence Fund',
    amount: 300,
    verificationStatus: 'verified',
  },
  {
    id: '20',
    date: '2024-05-30',
    memberName: 'Megan Wright',
    type: 'Offerings',
    fund: 'General Fund',
    amount: 225,
    verificationStatus: 'verified',
  },
]

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(mockCollections)
  const [recordOpen, setRecordOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [verifyingCollectionId, setVerifyingCollectionId] = useState<string | null>(null)

  // Calculate stats
  const todayCollections = collections.filter((c) => c.date === new Date().toISOString().split('T')[0])
  const todayTotal = todayCollections.reduce((sum, c) => sum + c.amount, 0)

  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  const weekCollections = collections.filter((c) => new Date(c.date) >= weekStart)
  const weeklyTotal = weekCollections.reduce((sum, c) => sum + c.amount, 0)

  const monthStart = new Date()
  monthStart.setDate(1)
  const monthCollections = collections.filter((c) => new Date(c.date) >= monthStart)
  const monthlyTotal = monthCollections.reduce((sum, c) => sum + c.amount, 0)

  const pendingCollections = collections.filter((c) => c.verificationStatus === 'pending').length

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection)
    setEditOpen(true)
  }

  const handleDelete = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  const handleVerify = (id: string) => {
    setVerifyingCollectionId(id)
    setVerifyOpen(true)
  }

  const handleRecordSubmit = (newCollection: Omit<Collection, 'id'>) => {
    const id = (Math.max(...collections.map((c) => parseInt(c.id))) + 1).toString()
    setCollections((prev) => [{ ...newCollection, id }, ...prev])
  }

  const handleEditSubmit = (updated: Collection) => {
    setCollections((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
  }

  const handleVerifyConfirm = () => {
    if (verifyingCollectionId) {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === verifyingCollectionId ? { ...c, verificationStatus: 'verified' } : c
        )
      )
      setVerifyingCollectionId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Collections</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">Manage tithes, offerings, and donations</p>
        </div>
        <Button onClick={() => setRecordOpen(true)} className="w-full sm:w-auto">Record Collection</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CollectionStatsCard
          title="Today's Collections"
          value={`$${todayTotal}`}
          change={`${todayCollections.length} contributions`}
          icon={DollarSign}
          color="green"
        />
        <CollectionStatsCard
          title="Weekly Collections"
          value={`$${weeklyTotal}`}
          change={`${weekCollections.length} contributions`}
          icon={TrendingUp}
          color="blue"
        />
        <CollectionStatsCard
          title="Monthly Collections"
          value={`$${monthlyTotal}`}
          change={`${monthCollections.length} contributions`}
          icon={Clock}
          color="orange"
        />
        <CollectionStatsCard
          title="Pending Verification"
          value={pendingCollections}
          change={`${(pendingCollections / collections.length * 100).toFixed(1)}% of total`}
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Collections Table */}
      <CollectionsTable
        collections={collections}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onVerify={handleVerify}
      />

      {/* Dialogs */}
      <CollectionDialogs
        recordOpen={recordOpen}
        onRecordOpenChange={setRecordOpen}
        editingCollection={editingCollection}
        editOpen={editOpen}
        onEditOpenChange={setEditOpen}
        verifyingCollectionId={verifyingCollectionId}
        verifyOpen={verifyOpen}
        onVerifyOpenChange={setVerifyOpen}
        onRecordSubmit={handleRecordSubmit}
        onEditSubmit={handleEditSubmit}
        onVerifyConfirm={handleVerifyConfirm}
      />
    </div>
  )
}

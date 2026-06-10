'use client'

import { useState, useEffect } from 'react'
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react'
import MemberStatsCard from '@/components/dashboard/member-stats-card'
import MembersTable, { Member } from '@/components/dashboard/members-table'
import MemberDialogs from '@/components/dashboard/member-dialogs'

const mockMembers: Member[] = [
  {
    id: '1',
    memberId: 'MEM-001',
    firstName: 'John',
    lastName: 'Smith',
    phone: '(555) 123-4567',
    address: '123 Main St, Springfield, IL 62701',
    dateJoined: '2020-01-15',
    status: 'active',
    role: 'admin',
    loginId: 'jsmith_001',
    password: 'Admin@1234',
  },
  {
    id: '2',
    memberId: 'MEM-002',
    firstName: 'Mary',
    lastName: 'Johnson',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Springfield, IL 62702',
    dateJoined: '2019-06-20',
    status: 'active',
    role: 'treasurer',
    loginId: 'mjohnson_002',
    password: 'Treasurer@1234',
  },
  {
    id: '3',
    memberId: 'MEM-003',
    firstName: 'Robert',
    lastName: 'Williams',
    phone: '(555) 345-6789',
    address: '789 Elm St, Springfield, IL 62703',
    dateJoined: '2021-03-10',
    status: 'active',
    role: 'secretary',
    loginId: 'rwilliams_003',
    password: 'Secretary@1234',
  },
  {
    id: '4',
    memberId: 'MEM-004',
    firstName: 'Patricia',
    lastName: 'Brown',
    phone: '(555) 456-7890',
    address: '321 Pine Rd, Springfield, IL 62704',
    dateJoined: '2018-11-25',
    status: 'inactive',
    role: 'deacon',
    loginId: 'pbrown_004',
    password: 'Deacon@1234',
  },
  {
    id: '5',
    memberId: 'MEM-005',
    firstName: 'Michael',
    lastName: 'Davis',
    phone: '(555) 567-8901',
    address: '654 Maple Dr, Springfield, IL 62705',
    dateJoined: '2022-02-14',
    status: 'active',
    role: 'member',
    loginId: 'mdavis_005',
    password: 'Member@1234',
  },
  {
    id: '6',
    memberId: 'MEM-006',
    firstName: 'Jennifer',
    lastName: 'Miller',
    phone: '(555) 678-9012',
    address: '987 Cedar Ln, Springfield, IL 62706',
    dateJoined: '2021-09-08',
    status: 'active',
    role: 'member',
    loginId: 'jmiller_006',
    password: 'Member@1234',
  },
  {
    id: '7',
    memberId: 'MEM-007',
    firstName: 'James',
    lastName: 'Wilson',
    phone: '(555) 789-0123',
    address: '147 Birch Way, Springfield, IL 62707',
    dateJoined: '2020-07-19',
    status: 'active',
    role: 'admin',
    loginId: 'jwilson_007',
    password: 'Admin@1234',
  },
  {
    id: '8',
    memberId: 'MEM-008',
    firstName: 'Linda',
    lastName: 'Moore',
    phone: '(555) 890-1234',
    address: '258 Spruce Ct, Springfield, IL 62708',
    dateJoined: '2019-04-12',
    status: 'active',
    role: 'member',
    loginId: 'lmoore_008',
    password: 'Member@1234',
  },
  {
    id: '9',
    memberId: 'MEM-009',
    firstName: 'William',
    lastName: 'Taylor',
    phone: '(555) 901-2345',
    address: '369 Ash Blvd, Springfield, IL 62709',
    dateJoined: '2023-01-05',
    status: 'active',
    role: 'member',
    loginId: 'wtaylor_009',
    password: 'Member@1234',
  },
  {
    id: '10',
    memberId: 'MEM-010',
    firstName: 'Barbara',
    lastName: 'Anderson',
    phone: '(555) 012-3456',
    address: '741 Willow St, Springfield, IL 62710',
    dateJoined: '2021-05-30',
    status: 'inactive',
    role: 'member',
    loginId: 'banderson_010',
    password: 'Member@1234',
  },
  {
    id: '11',
    memberId: 'MEM-011',
    firstName: 'Charles',
    lastName: 'Thomas',
    phone: '(555) 234-0987',
    address: '852 Oak Hill, Springfield, IL 62711',
    dateJoined: '2020-12-03',
    status: 'active',
    role: 'treasurer',
    loginId: 'cthomas_011',
    password: 'Treasurer@1234',
  },
  {
    id: '12',
    memberId: 'MEM-012',
    firstName: 'Elizabeth',
    lastName: 'Jackson',
    phone: '(555) 345-0987',
    address: '963 Pine Forest, Springfield, IL 62712',
    dateJoined: '2022-08-17',
    status: 'active',
    role: 'member',
    loginId: 'ejackson_012',
    password: 'Member@1234',
  },
  {
    id: '13',
    memberId: 'MEM-013',
    firstName: 'David',
    lastName: 'White',
    phone: '(555) 456-0987',
    address: '159 Maple Grove, Springfield, IL 62713',
    dateJoined: '2019-10-22',
    status: 'active',
    role: 'member',
    loginId: 'dwhite_013',
    password: 'Member@1234',
  },
  {
    id: '14',
    memberId: 'MEM-014',
    firstName: 'Susan',
    lastName: 'Harris',
    phone: '(555) 567-0987',
    address: '357 Cedar Valley, Springfield, IL 62714',
    dateJoined: '2021-11-09',
    status: 'active',
    role: 'secretary',
    loginId: 'sharris_014',
    password: 'Secretary@1234',
  },
  {
    id: '15',
    memberId: 'MEM-015',
    firstName: 'Richard',
    lastName: 'Martin',
    phone: '(555) 678-0987',
    address: '468 Birch Lane, Springfield, IL 62715',
    dateJoined: '2020-05-25',
    status: 'inactive',
    role: 'member',
    loginId: 'rmartin_015',
    password: 'Member@1234',
  },
  {
    id: '16',
    memberId: 'MEM-016',
    firstName: 'Jessica',
    lastName: 'Garcia',
    phone: '(555) 789-0987',
    address: '579 Spruce Drive, Springfield, IL 62716',
    dateJoined: '2023-03-11',
    status: 'active',
    role: 'member',
    loginId: 'jgarcia_016',
    password: 'Member@1234',
  },
  {
    id: '17',
    memberId: 'MEM-017',
    firstName: 'Joseph',
    lastName: 'Rodriguez',
    phone: '(555) 890-0987',
    address: '681 Ash Avenue, Springfield, IL 62717',
    dateJoined: '2022-06-14',
    status: 'active',
    role: 'deacon',
    loginId: 'jrodriguez_017',
    password: 'Deacon@1234',
  },
  {
    id: '18',
    memberId: 'MEM-018',
    firstName: 'Karen',
    lastName: 'Clark',
    phone: '(555) 901-0987',
    address: '792 Willow Terrace, Springfield, IL 62718',
    dateJoined: '2020-09-07',
    status: 'active',
    role: 'member',
    loginId: 'kclark_018',
    password: 'Member@1234',
  },
]

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [deletingMember, setDeletingMember] = useState<Member | null>(null)

  // Calculate statistics
  const totalMembers = members.length
  const activeMembers = members.filter((m) => m.status === 'active').length
  const inactiveMembers = members.filter((m) => m.status === 'inactive').length
  const newThisMonth = members.filter((m) => {
    const joined = new Date(m.dateJoined)
    const now = new Date()
    return (
      joined.getMonth() === now.getMonth() &&
      joined.getFullYear() === now.getFullYear()
    )
  }).length

  const handleAddMember = (data: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...data,
      id: String(Math.max(...members.map((m) => parseInt(m.id, 10))) + 1),
    }
    setMembers([...members, newMember])
  }

  const handleEditMember = (data: Member) => {
    setMembers(members.map((m) => (m.id === data.id ? data : m)))
  }

  const handleDeleteMember = () => {
    if (deletingMember) {
      setMembers(members.filter((m) => m.id !== deletingMember.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Members</h1>
        <p className="mt-2 text-muted-foreground">Manage church members and their information.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MemberStatsCard
          title="Total Members"
          value={totalMembers}
          icon={Users}
          color="blue"
        />
        <MemberStatsCard
          title="Active Members"
          value={activeMembers}
          change={`${((activeMembers / totalMembers) * 100).toFixed(0)}% of total`}
          icon={UserCheck}
          color="green"
        />
        <MemberStatsCard
          title="Inactive Members"
          value={inactiveMembers}
          change={`${((inactiveMembers / totalMembers) * 100).toFixed(0)}% of total`}
          icon={UserX}
          color="red"
        />
        <MemberStatsCard
          title="New This Month"
          value={newThisMonth}
          icon={UserPlus}
          color="orange"
        />
      </div>

      {/* Members Table */}
      <MembersTable
        members={members}
        onAdd={() => setIsAddOpen(true)}
        onEdit={(member) => {
          setEditingMember(member)
          setIsEditOpen(true)
        }}
        onDelete={(member) => {
          setDeletingMember(member)
          setIsDeleteOpen(true)
        }}
      />

      {/* Dialogs */}
      <MemberDialogs
        isAddOpen={isAddOpen}
        isEditOpen={isEditOpen}
        isDeleteOpen={isDeleteOpen}
        editingMember={editingMember}
        deletingMember={deletingMember}
        onAddOpenChange={setIsAddOpen}
        onEditOpenChange={setIsEditOpen}
        onDeleteOpenChange={setIsDeleteOpen}
        onAddSubmit={handleAddMember}
        onEditSubmit={handleEditMember}
        onDeleteConfirm={handleDeleteMember}
      />
    </div>
  )
}

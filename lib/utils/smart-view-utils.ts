export interface SmartViewFilter {
  statuses?: string[]
  sources?: string[]
  loanTypes?: string[]
  stages?: string[]
  assignment?: 'all' | 'assigned' | 'unassigned' | 'mine'
  leadScoreRange?: [number, number]
  creditScoreRange?: [number, number]
  taskFilters?: {
    noTasks?: boolean
    upcomingTasks?: boolean
    pastDueTasks?: boolean
  }
  dateRange?: {
    from?: Date
    to?: Date
  }
}

export interface SmartViewSort {
  key: string
  direction: 'asc' | 'desc'
}

export interface SmartView {
  id: string
  name: string
  description?: string
  filters: SmartViewFilter
  sort?: SmartViewSort
  columns?: string[]
  itemsPerPage?: number
  isDefault?: boolean
  isShared?: boolean
  createdAt: Date
  updatedAt: Date
}

const SMART_VIEWS_KEY = 'smart-views'
const ACTIVE_VIEW_KEY = 'active-smart-view'

// Default smart views
const defaultViews: Omit<SmartView, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'all-leads',
    name: 'All Leads',
    description: 'View all leads in the system',
    filters: {},
    isDefault: true,
  },
  {
    id: 'my-leads',
    name: 'My Leads',
    description: 'Leads assigned to me',
    filters: {
      assignment: 'mine'
    },
    isDefault: true,
  },
  {
    id: 'hot-leads',
    name: 'Hot Leads',
    description: 'High priority leads ready to convert',
    filters: {
      statuses: ['hot', 'qualified'],
      leadScoreRange: [80, 100]
    },
    isDefault: true,
  },
  {
    id: 'new-this-week',
    name: 'New This Week',
    description: 'Leads created in the last 7 days',
    filters: {
      dateRange: {
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    },
    isDefault: true,
  },
  {
    id: 'follow-up-today',
    name: 'Follow-up Today',
    description: 'Leads requiring follow-up today',
    filters: {
      taskFilters: {
        upcomingTasks: true
      }
    },
    isDefault: true,
  },
  {
    id: 'unassigned',
    name: 'Unassigned',
    description: 'Leads not assigned to any loan officer',
    filters: {
      assignment: 'unassigned'
    },
    isDefault: true,
  }
]

export function getSmartViews(): SmartView[] {
  if (typeof window === 'undefined') return []
  
  const saved = localStorage.getItem(SMART_VIEWS_KEY)
  if (!saved) {
    // Initialize with default views
    const initialViews = defaultViews.map(view => ({
      ...view,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    localStorage.setItem(SMART_VIEWS_KEY, JSON.stringify(initialViews))
    return initialViews
  }
  
  try {
    const views = JSON.parse(saved)
    // Convert date strings back to Date objects
    return views.map((view: SmartView) => ({
      ...view,
      createdAt: new Date(view.createdAt),
      updatedAt: new Date(view.updatedAt)
    }))
  } catch (e) {
    console.error('Failed to parse smart views:', e)
    return []
  }
}

export function saveSmartView(view: Omit<SmartView, 'createdAt' | 'updatedAt'>): SmartView {
  const views = getSmartViews()
  const now = new Date()
  
  const newView: SmartView = {
    ...view,
    createdAt: now,
    updatedAt: now
  }
  
  const existingIndex = views.findIndex(v => v.id === view.id)
  if (existingIndex >= 0) {
    // Update existing view
    newView.createdAt = views[existingIndex].createdAt
    views[existingIndex] = newView
  } else {
    // Add new view
    views.push(newView)
  }
  
  localStorage.setItem(SMART_VIEWS_KEY, JSON.stringify(views))
  return newView
}

export function deleteSmartView(id: string): boolean {
  const views = getSmartViews()
  const filtered = views.filter(v => v.id !== id || v.isDefault)
  
  if (filtered.length < views.length) {
    localStorage.setItem(SMART_VIEWS_KEY, JSON.stringify(filtered))
    
    // If deleted view was active, switch to 'all-leads'
    const activeId = getActiveSmartView()
    if (activeId === id) {
      setActiveSmartView('all-leads')
    }
    
    return true
  }
  
  return false
}

export function duplicateSmartView(id: string, newName: string): SmartView | null {
  const views = getSmartViews()
  const viewToDuplicate = views.find(v => v.id === id)
  
  if (!viewToDuplicate) return null
  
  const newView = {
    ...viewToDuplicate,
    id: `custom-${Date.now()}`,
    name: newName,
    isDefault: false,
    isShared: false
  }
  
  return saveSmartView(newView)
}

export function getActiveSmartView(): string {
  if (typeof window === 'undefined') return 'all-leads'
  return localStorage.getItem(ACTIVE_VIEW_KEY) || 'all-leads'
}

export function setActiveSmartView(id: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ACTIVE_VIEW_KEY, id)
}

export function exportSmartView(id: string): string | null {
  const views = getSmartViews()
  const view = views.find(v => v.id === id)
  
  if (!view) return null
  
  const exportData = {
    ...view,
    id: undefined, // Remove ID so it gets a new one on import
    isDefault: false,
    isShared: false,
    exportedAt: new Date()
  }
  
  return JSON.stringify(exportData, null, 2)
}

export function importSmartView(jsonString: string): SmartView | null {
  try {
    const data = JSON.parse(jsonString)
    
    // Validate required fields
    if (!data.name || !data.filters) {
      throw new Error('Invalid smart view format')
    }
    
    const newView = {
      id: `imported-${Date.now()}`,
      name: data.name,
      description: data.description,
      filters: data.filters,
      sort: data.sort,
      columns: data.columns,
      itemsPerPage: data.itemsPerPage,
      isDefault: false,
      isShared: false
    }
    
    return saveSmartView(newView)
  } catch (e) {
    console.error('Failed to import smart view:', e)
    return null
  }
}
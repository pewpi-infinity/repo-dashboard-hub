import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { MagnifyingGlass, ArrowUp, ArrowDown } from '@phosphor-icons/react'
import type { SortOption, SortDirection } from '../App'

interface SearchSortProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: SortOption
  onSortByChange: (sort: SortOption) => void
  sortDirection: SortDirection
  onSortDirectionChange: (direction: SortDirection) => void
  resultCount: number
  totalCount: number
}

export function SearchSort({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortDirection,
  onSortDirectionChange,
  resultCount,
  totalCount,
}: SearchSortProps) {
  const toggleDirection = () => {
    onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1 w-full">
        <MagnifyingGlass 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
          size={18}
        />
        <Input
          type="text"
          placeholder="Search repositories, descriptions, or topics..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
        />
      </div>

      <div className="flex gap-2 items-center w-full sm:w-auto">
        <Select value={sortBy} onValueChange={(value) => onSortByChange(value as SortOption)}>
          <SelectTrigger className="w-full sm:w-[160px] bg-card/50 border-border/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="stars">Stars</SelectItem>
            <SelectItem value="language">Language</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleDirection}
          className="shrink-0 bg-card/50 border-border/50 hover:bg-accent/10 hover:border-accent/50"
          title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
        >
          {sortDirection === 'asc' ? (
            <ArrowUp size={18} className="text-accent" />
          ) : (
            <ArrowDown size={18} className="text-accent" />
          )}
        </Button>
      </div>

      {searchQuery && (
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {resultCount} of {totalCount} repositories
        </div>
      )}
    </div>
  )
}

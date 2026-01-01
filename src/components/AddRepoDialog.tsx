import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Badge } from './ui/badge'
import { Plus, GitBranch, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { ComponentCategory } from '@/lib/types'

interface AddRepoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (repoData: {
    name: string
    description: string
    category: ComponentCategory
    emoji: string
    isPrivate: boolean
  }) => void
}

const categoryOptions: { value: ComponentCategory; label: string; emoji: string }[] = [
  { value: 'brain', label: 'Brain Core', emoji: '🧠' },
  { value: 'quantum', label: 'Quantum Processor', emoji: '⚛️' },
  { value: 'time', label: 'Time Machine', emoji: '⏰' },
  { value: 'os', label: 'Operating System', emoji: '🖥️' },
  { value: 'other', label: 'Other Component', emoji: '🎛️' }
]

const emojiOptions = [
  '👑', '🧱', '🎵', '🪡', '🌐', '🟦', '🟡', '💵', '💰', '🔱', 
  '✨', '🍄', '🪐', '⭐', '🦾', '💲', '🎛️', '🧠', '⚛️', '⏰',
  '🖥️', '🕹️', '📀', '🎬', '🎨', '⚪', '🟩', '🟧', '🟥', '🟪', '🟨'
]

export function AddRepoDialog({ open, onOpenChange, onAdd }: AddRepoDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ComponentCategory>('other')
  const [emoji, setEmoji] = useState('🎛️')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      toast.error('Repository name is required')
      return
    }

    setIsCreating(true)
    
    try {
      await onAdd({
        name: name.trim(),
        description: description.trim(),
        category,
        emoji,
        isPrivate
      })
      
      toast.success(`🎉 Repository "${name}" created successfully!`)
      
      setName('')
      setDescription('')
      setCategory('other')
      setEmoji('🎛️')
      setIsPrivate(false)
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to create repository')
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-primary/30 glow-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Plus className="text-accent" size={28} weight="bold" />
            Create New Machine
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new repository to the Pewpi Infinity quantum system. Each repo becomes a connected component in the legend architecture.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <GitBranch size={16} />
              Repository Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="legend-new-component"
              className="bg-background/50 border-primary/30 focus:border-accent"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
              required
            />
            <p className="text-xs text-muted-foreground">
              Use kebab-case (e.g., legend-robot-core)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this component does in the quantum system..."
              className="bg-background/50 border-primary/30 focus:border-accent min-h-[100px]"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Component Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as ComponentCategory)}>
                <SelectTrigger className="bg-background/50 border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <span>{cat.emoji}</span>
                        <span>{cat.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emoji">Legend Emoji</Label>
              <Select value={emoji} onValueChange={setEmoji}>
                <SelectTrigger className="bg-background/50 border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <div className="grid grid-cols-8 gap-1 p-2">
                    {emojiOptions.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setEmoji(em)}
                        className="text-2xl p-2 hover:bg-accent/20 rounded transition-colors"
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
            <input
              type="checkbox"
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4 rounded border-primary/30"
            />
            <Label htmlFor="private" className="cursor-pointer flex-1">
              Make this repository private
            </Label>
          </div>

          <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/30">
            <Sparkle size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-accent mb-1">Preview</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-base">
                  {emoji}
                </Badge>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {name || 'repository-name'}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || isCreating}
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Plus size={16} weight="bold" />
              {isCreating ? 'Creating...' : 'Create Repository'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

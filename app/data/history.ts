import type { HistoryEntry } from '#shared/types/content'

// Replaced by the read-only published snapshot collection when persistence is connected.
// Entries are appended after a successful takeover and are never overwritten by owner edits.
export const historyEntries: HistoryEntry[] = []

export const findHistoryEntry = (slug: string) => historyEntries.find(entry => entry.slug === slug)

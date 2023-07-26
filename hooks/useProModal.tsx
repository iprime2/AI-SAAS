import { create } from 'zustand'

import { FC } from 'react'

interface useProModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useProModal = create<useProModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

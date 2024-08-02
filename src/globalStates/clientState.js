import {create} from 'zustand'

export const useClientState = create(set => ({
  selectedClient: null,
  setSelectedClient: client => set({selectedClient: client}),
}))

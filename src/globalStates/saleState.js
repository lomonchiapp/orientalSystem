import {create} from 'zustand'

export const useSaleState = create(set => ({
  selectedSale: null,
  setSelectedSale: sale => set({selectedSale: sale}),
}))

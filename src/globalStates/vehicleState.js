import {create} from 'zustand'

export const useVehicleState = create(set => ({
  selectedVehicle: null,
  setSelectedVehicle: vehicle => set({selectedVehicle: vehicle}),
}))

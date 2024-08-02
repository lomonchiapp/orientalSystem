import {create} from 'zustand'
import {database} from '../firebase'
import {getDocs, collection} from 'firebase/firestore'

export const getVehicles = async () => {
  const querySnapshot = await getDocs(collection(database, 'vehicles'))
  const vehicles = querySnapshot.docs.map(doc => doc.data())

  return vehicles
}

export const getClients = async () => {
  const querySnapshot = await getDocs(collection(database, 'clients'))
  const clients = querySnapshot.docs.map(doc => doc.data())

  return clients
}

export const useDealerState = create(set => ({
  vehicles: [],
  clients: [],
  setVehicles: vehicles => set({vehicles}),
  setClients: clients => set({clients}),
}))

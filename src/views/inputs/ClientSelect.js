/* eslint-disable lines-around-comment */
import React from 'react'
// ** MUI IMPORTS
import { Box, Autocomplete, TextField, Swit} from '@mui/material'
// ** ICONS IMPORT
import { PlusCircle } from '@phosphor-icons/react'
// ** FIREBASE IMPORT
import { database } from 'src/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'
// ** DIALOG
import { NewDialog } from 'src/views/dialogs/NewDialog'
import { NewClient } from 'src/views/clients/NewClient'
// ** GLOBAL STATE
import { useVehicleState } from 'src/globalStates/vehicleState'


export const ClientSelect = ({ client, setClient }) => {
  const [clients, setClients] = useState([])
  const [newClient, setNewClient] = useState(false)
  const [clientSelected, setClientSelected] = useState(null)

  // ** REAL-TIME FETCHING CLIENTS

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, 'clients'),
      querySnapshot => {
        const clients = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setClients(clients)
      },
      error => {
        // Handle the error
        console.error('Error fetching categories:', error)
        // Optionally, update the state to reflect the error
      }
    )

    return () => unsubscribe() // Clean up the subscription on component unmount
  }, [])


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Autocomplete
        id="client"
        options={clients}
        getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
        sx={{ width: 300 }}
        onChange={(e, value) => setClientSelected(value)}
        renderInput={(params) => <TextField {...params} label="Cliente" />}
      />
    </Box>
  )
}

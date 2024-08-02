/* eslint-disable lines-around-comment */
import React from 'react'
// ** MUI IMPORTS
import { Box, Button, Grid, Typography, FormControl, TextField, Select, MenuItem, InputLabel, Autocomplete } from '@mui/material'
// ** ICONS IMPORT
import { PlusCircle } from '@phosphor-icons/react'
// ** FIREBASE IMPORT
import { database } from 'src/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'
// ** DIALOG
import { NewDialog } from 'src/views/dialogs/NewDialog'
import { NewVehicle } from 'src/views/vehicles/NewVehicle'
// ** GLOBAL STATE
import { useVehicleState } from 'src/globalStates/vehicleState'



export const VehicleSelect = ({ vehicle, setVehicle }) => {
  const [vehicles, setVehicles] = useState([])
  const [newVehicle, setNewVehicle] = useState(false)
  const [vehicleSelected, setVehicleSelected] = useState(null)


  // ** REAL-TIME FETCHING CLIENTS

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, 'vehicles'),
      querySnapshot => {
        const vehicles = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setVehicles(vehicles)
      },
      error => {
        // Handle the error
        console.error('Error fetching categories:', error)
        // Optionally, update the state to reflect the error
      }
    )

    return () => unsubscribe() // Clean up the subscription on component unmount
  }
  , [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        my: 4
      }}
    >
      <Autocomplete
        id="vehicle"
        options={vehicles}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Vehículo" />}
        onChange={(e, value) => setVehicleSelected(value)}
      />
    </Box>
  )
}

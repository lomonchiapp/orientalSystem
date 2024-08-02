/* eslint-disable lines-around-comment */
// ** React Imports
import React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Typography, Card, TextField, Button, Box } from '@mui/material'

// ** Icon Imports

// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
// ** TABLE IMPORTS
import { VehiclesTable } from 'src/views/tables/VehiclesTable'
import { PlusCircle } from '@phosphor-icons/react'
// ** Custom Components
import { AddDrawer } from 'src/views/drawer/AddDrawer'
// ** Form Imports
import { NewVehicle } from 'src/views/vehicles/NewVehicle'
import { EditVehicle } from 'src/views/vehicles/EditVehicle'
// ** Global State
import { useVehicleState } from 'src/globalStates/vehicleState'
import { ToastContainer } from 'react-toastify'
// ** Search Input
import { SearchVehicle } from 'src/views/inputs/searchVehicle'

export const Vehicles = () => {
  // ** States
  const [searchText, setSearchText] = useState('')
  const [vehicles, setVehicles] = useState([])
  const { selectedVehicle } = useVehicleState()
  const [editMode, setEditMode] = useState(false)
  const [newVehicle, setNewVehicle] = useState(false)

  // ** UseEffect
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'vehicles'), querySnapshot => {
      const vehicles = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setVehicles(vehicles)
    })

    return () => unsubscribe() // Clean up the subscription on component unmount
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
        item
        xs={12}
      >
        <Box>
          <Typography variant='h5'>Vehículos</Typography>
          <Typography variant='body2'>Aquí puedes ver los vehículos disponibles.</Typography>
        </Box>
        <Box>
          <Button variant='contained' color='primary' onClick={() => setNewVehicle(true)} startIcon={<PlusCircle />}>
            Agregar Vehículo
          </Button>
          <AddDrawer form={<NewVehicle />} open={newVehicle} setOpen={setNewVehicle} />

          {selectedVehicle ? (
            <AddDrawer
              form={<EditVehicle open={editMode} setOpen={setEditMode} />}
              open={editMode}
              setOpen={setEditMode}
            />
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid sx={{mb:3}} item xs={5}>
          <SearchVehicle searchText={searchText} setSearchText={setSearchText} />
        </Grid>
        <Card>

          <VehiclesTable searchText={searchText} setEditMode={setEditMode} editMode={editMode} vehicles={vehicles} />
        </Card>
      </Grid>
      <ToastContainer />
    </Grid>
  )
}

export default Vehicles

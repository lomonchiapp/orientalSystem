/* eslint-disable lines-around-comment */
// ** React Imports
import React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Typography, Card, Button, Box } from '@mui/material'

// ** Icon Imports

// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
// ** TABLE IMPORTS
import { ClientsTable } from 'src/views/tables/ClientsTable'
import { PlusCircle } from '@phosphor-icons/react'
// ** Custom Components
import { AddDrawer } from 'src/views/drawer/AddDrawer'
// ** Form Imports
import { NewClient } from 'src/views/clients/NewClient'
import { EditClient } from 'src/views/clients/EditClient'
// ** Global State
import { useClientState } from 'src/globalStates/clientState'
import { ToastContainer } from 'react-toastify'

export const Clients = () => {
  // ** States
  const [clients, setClients] = useState([])
  const { selectedClient } = useClientState()
  const [editMode, setEditMode] = useState(false)
  const [newClient, setNewClient] = useState(false)

  // ** UseEffect
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'clients'), querySnapshot => {
      const clients = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      console.log(clients)
      setClients(clients)
    })

    return () => unsubscribe() // Clean up the subscription on component unmount
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid sx={{
        display:'flex',
        justifyContent:'space-between',

      }} item xs={12}>
        <Box>
          <Typography variant='h5'>
            Clientes
          </Typography>
          <Typography variant='body2'>
            Aquí puedes ver los clientes.
          </Typography>
        </Box>
        <Box>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setNewClient(true)}
            startIcon={<PlusCircle />}
          >
            Agregar Cliente
          </Button>
        <AddDrawer
        form={<NewClient open={newClient} setOpen={setNewClient} />}
        open={newClient}
        setOpen={setNewClient}/>

        {selectedClient ?
          (<AddDrawer
        form={<EditClient open={editMode} setOpen={setEditMode} />}
        open={editMode}
        setOpen={setEditMode}/>) : null}
        </Box>

      </Grid>
      <Grid item xs={12}>
        <Card>
          <ClientsTable setEditMode={setEditMode} editMode={editMode} clients={clients}/>
        </Card>

      </Grid>
      <ToastContainer />
    </Grid>
  )
}

export default Clients

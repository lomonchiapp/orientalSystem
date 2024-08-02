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
import { SalesTable } from 'src/views/tables/SalesTable'
import { PlusCircle } from '@phosphor-icons/react'
// ** Custom Components
import { AddDrawer } from 'src/views/drawer/AddDrawer'
// ** Form Imports
import { NewSale } from 'src/views/sales/NewSale'
import { EditSale } from 'src/views/sales/EditSale'
// ** Global State
import { useSaleState } from 'src/globalStates/saleState'
import { ToastContainer } from 'react-toastify'

export const Sales = () => {
  // ** States
  const [sales, setSales] = useState([])
  const { selectedSale } = useSaleState()
  const [editMode, setEditMode] = useState(false)
  const [newSale, setNewSale] = useState(false)

  // ** UseEffect
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'sales'), querySnapshot => {
      const sales = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      console.log(sales)
      setSales(sales)
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
            Ventas
          </Typography>
          <Typography variant='body2'>
            Aquí puedes ver los ventas.
          </Typography>
        </Box>
        <Box>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setNewSale(true)}
            startIcon={<PlusCircle />}
          >
            Nueva Venta
          </Button>
        <AddDrawer
        form={<NewSale open={newSale} setOpen={setNewSale} />}
        open={newSale}
        setOpen={setNewSale}/>

        {selectedSale ?
          (<AddDrawer
        form={<EditSale open={editMode} setOpen={setEditMode} />}
        open={editMode}
        setOpen={setEditMode}/>) : null}
        </Box>

      </Grid>
      <Grid item xs={12}>
        <Card>
          <SalesTable setEditMode={setEditMode} editMode={editMode} sales={sales}/>
        </Card>

      </Grid>
      <ToastContainer />
    </Grid>
  )
}

export default Sales

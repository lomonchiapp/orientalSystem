/* eslint-disable lines-around-comment */
import React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import {
  Grid,
  Typography,
  Card,
  Divider,
  TextField,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  FormControlLabel,
  InputLabel
} from '@mui/material'
// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage'
// ** Icon Imports
import { CheckCircle, PlusCircle, Upload } from '@phosphor-icons/react'
// ** Cities
import { cities } from './cities'
// ** Toastify
import { toast } from 'react-toastify'
// ** Input Mask
import InputMask from 'react-input-mask'
// ** Select Inputs
import { ClientSelect } from 'src/views/inputs/ClientSelect'
import { VehicleSelect } from 'src/views/inputs/VehicleSelect'

export const NewSale = ({ open, setOpen }) => {

  // ** New Client Field States
  const [client, setClient] = useState(null)
  const [product, setProduct] = useState(null)
  const [date, setDate] = useState(new Date())
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)
  const [finMonths, setFinMonths] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  // ** Create New Sale
  const createSale = async e => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(database, 'sales'), {
        client,
        product,
        date,
        quantity,
        total,
        paymentMethod
      })
      setOpen(false)
      toast.success('Cliente agregado exitosamente')
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      toast.error('Error al agregar el cliente')
      console.error('Error adding document: ', e)
    }
  }

  return (
    <form onSubmit={createSale}>
      <Grid sx={styles.formContainer} spacing={3}>
        <Box maxWidth={300} sx={{ mb: 3 }}>
          <Typography variant='h5'>Nueva Venta</Typography>
          <Typography variant='body2'>Llena los campos para crear una venta.</Typography>
        </Box>
        <Divider />
        {/* Client Select */}
        <Box>
          <ClientSelect client={client} setClient={setClient} />
        </Box>
        {/* Product Select */}
        <Grid>
          <VehicleSelect product={product} setProduct={setProduct} />
        </Grid>
        {/* Phone Field */}

        {/* Email Field */}

        {/* City Field */}

        {/* Address Field */}

        {/* Submit Button */}
        <Grid>
          <Button type='submit' variant='contained' color='primary'>
            Agregar Cliente
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    ml: 10,
    marginTop: '2rem'
  },
  uploadInput: {
    display: 'none'
  },
  selectInput: {
    width: 250,
    mb: 3
  },
  textInput: {
    width: '100%',
    mb: 3
  }
}

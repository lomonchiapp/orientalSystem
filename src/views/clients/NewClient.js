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

export const NewClient = ({ open, setOpen }) => {
  const storage = getStorage()

  // ** New Client Field States
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')

  // ** Create New Client
  const createClient = async e => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(database, 'clients'), {
        firstName,
        lastName,
        email,
        phone,
        address,
        city
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
    <form onSubmit={createClient}>
      <Grid sx={styles.formContainer} spacing={3}>
        <Box maxWidth={300} sx={{ mb: 3 }}>
          <Typography variant='h5'>Nuevo Cliente</Typography>
          <Typography variant='body2'>Llena los campos para agregar un nuevo cliente.</Typography>
        </Box>
        <Divider />
        <Box>
          <TextField
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            sx={styles.textInput}
            label='Nombres'
            name='firstName'
            required
          />
        </Box>
        {/* Last Name Field */}
        <Grid>
          <TextField
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            sx={styles.textInput}
            label='Apellidos'
            name='lastName'
            required
          />
        </Grid>
        {/* Phone Field */}
        <Grid>
          <InputMask
            mask='(999) 999-9999'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            disabled={false}
            maskChar=' '
          >
            {() => (
              <TextField
                sx={{ width: '100%' }} // Adjust the style as needed
                label='No. de Contacto'
                name='phone'
              />
            )}
          </InputMask>
        </Grid>
        {/* Email Field */}
        <Grid>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={styles.textInput}
            label='E-mail'
            name='email'
          />
        </Grid>
        {/* City Field */}
        <Grid>
          <FormControl>
            <InputLabel id='city-label'>Ciudad</InputLabel>
            <Select
              sx={styles.selectInput}
              onChange={e => setCity(e.target.value)}
              value={city}
              label='Ciudad'
              name='city'
            >
              <MenuItem value=''>Selecciona una ciudad</MenuItem>
              {cities.map(city => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Address Field */}
        <Grid>
          <TextField
            value={address}
            onChange={e => setAddress(e.target.value)}
            multiline
            rows={3}
            sx={styles.textInput}
            label='Dirección'
            name='address'
          />
        </Grid>
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

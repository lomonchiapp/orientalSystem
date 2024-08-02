/* eslint-disable padding-line-between-statements */
/* eslint-disable lines-around-comment */
import React from 'react'
import { useState, useEffect } from 'react'
// ** MUI Imports
import { Grid, Typography, Card, Divider, TextField, Button, Box, FormControl, MenuItem, Select } from '@mui/material'
// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, updateDoc, getDoc, doc } from 'firebase/firestore'
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage'
// ** Icon Imports
import { CheckCircle, PlusCircle, Swap, Upload } from '@phosphor-icons/react'
// ** Custom Components
import { cities } from './cities'
// ** Global Sate
import { useClientState } from 'src/globalStates/clientState'
// ** Toastify
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** Input Mask
import InputMask from 'react-input-mask'

export const EditClient = ({ open, setOpen }) => {
  const storage = getStorage()
  const { selectedClient, setSelectedClient } = useClientState()
  // ** New Client Field States
  const [firstName, setFirstName] = useState(selectedClient.firstName)
  const [lastName, setLastName] = useState(selectedClient.lastName)
  const [phone, setPhone] = useState(selectedClient.phone)
  const [email, setEmail] = useState(selectedClient.email)
  const [address, setAddress] = useState(selectedClient.address)
  const [city, setCity] = useState(selectedClient.city)

  // ** Create New Vehicle
  const updateClient = async e => {
    e.preventDefault()
    try {
      const docRef = doc(database, 'clients', selectedClient.id)
      let updateData = {} // Initialize as empty object

      // Conditionally add fields if they have values
      if (firstName) updateData.firstName = firstName
      if (lastName) updateData.lastName = lastName
      if (phone) updateData.phone = phone
      if (email) updateData.email = email
      if (address) updateData.address = address
      if (city) updateData.city = city

      await updateDoc(docRef, updateData)
      toast.success('Cliente actualizado con éxito')
      setOpen(false)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      toast.error('Error actualizando cliente. Contacte soporte.')
      console.error('Error adding document: ', e)
    }
  }

  // ** Handlers

  const handleFirstNameChange = e => setFirstName(e.target.value)
  const handleLastNameChange = e => setLastName(e.target.value)
  const handlePhoneChange = e => setPhone(e.target.value)
  const handleEmailChange = e => setEmail(e.target.value)
  const handleAddressChange = e => setAddress(e.target.value)
  const handleCityChange = e => setCity(e.target.value)

  return (
    <form onSubmit={updateClient}>
      <Grid sx={styles.formContainer} spacing={3}>
        <Box maxWidth={300} sx={{ mb: 3 }}>
          <Typography variant='h5'>Editar</Typography>
          <Typography variant='body2'>{selectedClient.name}</Typography>
        </Box>
        <Divider />
        {/* First name Field */}
        <Box>
          <TextField
            value={firstName}
            onChange={handleFirstNameChange}
            sx={styles.textInput}
            label='Nombres'
            name='firstName'
            required
          />
        </Box>

        {/* Last name Field */}
        <Grid>
          <TextField
            value={lastName}
            onChange={handleLastNameChange}
            sx={styles.textInput}
            label='Apellidos'
            name='lastName'
          />
        </Grid>
        {/* Phone Field */}
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
          {/* Email Field */}
        <Grid>
          <TextField
            value={email}
            onChange={handleEmailChange}
            sx={styles.textInput}
            label='Correo Electrónico'
            name='email'
          />
        </Grid>
        {/* City Field */}
        <Grid>
          <Select
            value={city}
            onChange={handleCityChange}
            sx={styles.textInput}
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
        {/* Address Field */}
        <Grid>
          <TextField
            value={address}
            onChange={handleAddressChange}
            sx={styles.textInput}
            label='Dirección'
            name='address'
          />
        </Grid>
          <Button sx={{ mr: 2 }} type='submit' variant='contained' color='primary'>
            GUARDAR
          </Button>
          <Button type='submit' variant='contained' color='secondary'>
            CANCELAR
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
  textInput: {
    width: '100%',
    mb: 3
  },
  priceInput: {
    width: 124,
    mr: 2,
    mb: 3,
    mt: 3
  },
  pricesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  categoryContainer: {
    my: 3
  },
  imageContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 3,
    mb: 5,
    border: '1px dashed #EBEBEB'
  },
  image: {
    width: '80%',
    height: 200,
    objectFit: 'cover'
  }
}

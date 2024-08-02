/* eslint-disable lines-around-comment */
import React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Typography, Card, Divider, TextField, Button, Box, FormControl, MenuItem, Select } from '@mui/material'
// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage'
// ** Icon Imports
import { CheckCircle, PlusCircle, Upload } from '@phosphor-icons/react'

// ** Custom Components
import { VehicleCategories } from '../inputs/VehicleCategories'
import { VehicleBrands } from '../inputs/VehicleBrands'
// ** v4
import { v4 } from 'uuid'

export const NewVehicle = () => {
  const storage = getStorage()

  // ** New Vehicle Field States
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [cc, setCc] = useState('')
  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)
  const [salePrice, setSalePrice] = useState(0)
  const [suggPrice, setSuggPrice] = useState(0)
  const [initPrice, setInitPrice] = useState(0)

  // ** Handle Image Upload
  const handleImageUpload = event => {
    // Check if files are selected
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const fileExtension = file.name.slice(file.name.lastIndexOf('.'))
      const storageRef = ref(storage, `images/vehicles/${v4()}${fileExtension}`)
      uploadBytes(storageRef, file)
        .then(snapshot => {
          console.log('Uploaded a blob or file!', snapshot)
          getDownloadURL(storageRef)
            .then(url => {
              setImage(url)
            })
            .catch(error => {
              console.error('Error getting download URL:', error)
            })
        })
        .catch(error => {
          console.error('Error uploading logo:', error)
        })
    } else {
      console.error('No file selected')
    }
  }

  // ** Create New Vehicle
  const createVehicle = async e => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(database, 'vehicles'), {
        image,
        name,
        cc,
        salePrice,
        suggPrice,
        initPrice
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handlePriceChange = event => {
    // Remove non-numeric characters
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    // Format as price (simple formatting)
    const formattedPrice = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const priceWithPrefix = `$${formattedPrice}`
    setSalePrice(priceWithPrefix)
  }

  const handleInitPriceChange = event => {
    // Remove non-numeric characters
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    // Format as price (simple formatting)
    const formattedPrice = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // Add $ as prefix
    const priceWithPrefix = `$${formattedPrice}`
    setInitPrice(priceWithPrefix)
  }

  return (
    <form onSubmit={createVehicle}>
      <Grid sx={styles.formContainer} spacing={3}>
        <Box maxWidth={300} sx={{ mb: 3 }}>
          <Typography variant='h5'>Nuevo Vehículo</Typography>
          <Typography variant='body2'>Llena los campos para agregar un nuevo vehículo.</Typography>
        </Box>
        <Divider />
        <Box>
          <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            sx={styles.textInput}
            label='Nombre'
            name='name'
            required
          />
        </Box>
        {/* Select Vehicle Category */}
        <Box>
          <VehicleCategories setCategory={setCategory} />
        </Box>
        {/* Select Vehicle Brand */}
        <Box>
          <VehicleBrands setBrand={setBrand} />
        </Box>
        {/* Image Field */}
        <FormControl>
          <Button
            startIcon={image ? <CheckCircle /> : <Upload />}
            variant={image ? 'contained' : 'outlined'}
            component='label'
            sx={{ my: 4, height: 56 }}
          >
            {image ? 'Imagen Subida' : 'Imagen del producto*'}
            <input style={styles.uploadInput} type='file' onChange={handleImageUpload} />
          </Button>

          {/* Cilindraje Field */}
        </FormControl>
        <Grid>
          <TextField
            value={cc}
            onChange={e => setCc(e.target.value)}
            sx={styles.textInput}
            label='Cilindraje'
            name='cc'
            required
          />
        </Grid>
        <Grid>
          <TextField
            sx={styles.textInput}
            value={salePrice}
            onChange={handlePriceChange}
            label='Precio de Venta'
            name='salePrice'
            required
          />
        </Grid>
        <Grid>
          <TextField
            onChange={handleInitPriceChange}
            value={initPrice}
            sx={styles.textInput}
            label='Precio Inicial'
            name='initPrice'
            required
          />
        </Grid>
        <Grid>
          <Button type='submit' variant='contained' color='primary'>
            Agregar Vehículo
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
  }
}

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
import { VehicleCategories } from '../inputs/VehicleCategories'
import { VehicleBrands } from '../inputs/VehicleBrands'
// ** v4
import { v4 } from 'uuid'
import { useVehicleState } from 'src/globalStates/vehicleState'
// ** Toastify
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const EditVehicle = ({ open, setOpen }) => {
  const storage = getStorage()
  const { selectedVehicle, setSelectedVehicle } = useVehicleState()
  // ** New Vehicle Field States
  const [image, setImage] = useState(selectedVehicle.image)
  const [name, setName] = useState(selectedVehicle.name)
  const [cc, setCc] = useState(selectedVehicle.cc)
  const [category, setCategory] = useState(selectedVehicle.category)
  const [brand, setBrand] = useState(selectedVehicle.brand)
  const [salePrice, setSalePrice] = useState(selectedVehicle.salePrice)
  const [suggPrice, setSuggPrice] = useState(selectedVehicle.suggPrice)
  const [initPrice, setInitPrice] = useState(selectedVehicle.initPrice)

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
          toast.success('Imagen subida con éxito')
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
  const updateVehicle = async e => {
    e.preventDefault()
    try {
      const docRef = doc(database, 'vehicles', selectedVehicle.id)
      let updateData = {} // Initialize as empty object

      // Conditionally add fields if they have values
      if (name) updateData.name = name
      if (cc) updateData.cc = cc
      if (category) updateData.category = category
      if (brand) updateData.brand = brand
      if (salePrice) updateData.salePrice = salePrice
      if (suggPrice) updateData.suggPrice = suggPrice
      if (initPrice) updateData.initPrice = initPrice
      if (image) updateData.image = image

      await updateDoc(docRef, updateData)
      toast.success('Vehículo actualizado con éxito')
      setOpen(false)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      toast.error('Error actualizando vehículo')
      console.error('Error adding document: ', e)
    }
  }

  // ** Handlers

  const handleNameChange = event => {
    setName(event.target.value)
    setSelectedVehicle({ ...selectedVehicle, name: event.target.value })
  }

  const handleCcChange = event => {
    setCc(event.target.value)
    setSelectedVehicle({ ...selectedVehicle, cc: event.target.value })
  }

  const handleSalePriceChange = event => {
    setSalePrice(event.target.value)
    setSelectedVehicle({ ...selectedVehicle, salePrice: event.target.value })
  }

  const handleInitPriceChange = event => {
    setInitPrice(event.target.value)
    setSelectedVehicle({ ...selectedVehicle, initPrice: event.target.value })
  }

  const handleSuggPriceChange = event => {
    setSuggPrice(event.target.value)
    setSelectedVehicle({ ...selectedVehicle, suggPrice: event.target.value })
  }

  return (
    <form onSubmit={updateVehicle}>
      <Grid sx={styles.formContainer} spacing={3}>

        <Box maxWidth={300} sx={{ mb: 3 }}>
          <Typography variant='h5'>Editar</Typography>
          <Typography variant='body2'>{selectedVehicle.name}</Typography>
        </Box>
        <Divider />
        <Box>
          <TextField
            value={name}
            onChange={handleNameChange}
            sx={styles.textInput}
            label='Nombre'
            name='name'
            required
          />
        </Box>
        {/* Select Vehicle Category */}
        <Box sx={styles.categoryContainer}>
          <VehicleCategories setCategory={setCategory} category={category} />
        </Box>
        {/* Select Vehicle Brand */}
        <Box>
          <VehicleBrands selectedBrand={selectedVehicle.brand} setBrand={setBrand} />
        </Box>
        {/* Image Field */}
        <Card sx={styles.imageContainer}>
          <FormControl>
            <Button
              startIcon={image ? <Swap /> : <Upload />}
              variant={image ? 'contained' : 'outlined'}
              component='label'
              sx={{ my: 4 }}
            >
              {image ? 'Cambiar Imagen' : 'Imagen del producto*'}
              <input style={styles.uploadInput} type='file' onChange={handleImageUpload} />
            </Button>
          </FormControl>
          {/* Image placeholder */}

          {image ? (
            <img src={image} alt='Vehicle' style={styles.image} />
          ) : (
            <div
              style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              Sin Imagen
            </div>
          )}
        </Card>
        {/* Cilindraje Field */}

        <Grid>
          <TextField value={cc} onChange={handleCcChange} sx={styles.textInput} label='Cilindraje' name='cc' required />
        </Grid>
        <Grid sx={styles.pricesContainer} container item>
          <Grid>
            <TextField
              sx={styles.priceInput}
              value={salePrice}
              onChange={handleSalePriceChange}
              label='Precio de Venta'
              name='salePrice'
              required
            />
          </Grid>
          <Grid>
            <TextField
              onChange={handleInitPriceChange}
              value={initPrice}
              sx={styles.priceInput}
              label='Precio Inicial'
              name='initPrice'
              required
            />
          </Grid>
        </Grid>
        <Grid>
          <TextField
            value={suggPrice}
            onChange={handleSuggPriceChange}
            sx={styles.textInput}
            label='Precio sugerido (Para vendedores)'
            name='suggPrice'
          />
        </Grid>
        <Grid>
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
    mt:3,
    mb:5,
    border: '1px dashed #EBEBEB',
  },
  image: {
    width: '80%',
    height: 200,
    objectFit: 'cover'
  }
}

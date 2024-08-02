import React, { useState, useEffect } from 'react'

// ** MUI IMPORTS
import { Box, Button, Grid, Typography, FormControl, TextField } from '@mui/material'

// ** ICONS IMPORT
import { PlusCircle } from '@phosphor-icons/react'
import { CheckCircle, Upload } from '@phosphor-icons/react'

// ** FIREBASE IMPORT
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage'
import { v4 } from 'uuid'

export const NewBrand = ({open, setOpen}) => {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState(null)
  const storage = getStorage()

 const createBrand = async e => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(database, 'brands'), {
        name,
        logo
      })
      setOpen(false)
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handleImageUpload = event => {
    // Check if files are selected
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const fileExtension = file.name.slice(file.name.lastIndexOf('.'))
      const storageRef = ref(storage, `images/brands/${v4()}${fileExtension}`)
      uploadBytes(storageRef, file)
        .then(snapshot => {
          console.log('Uploaded a blob or file!', snapshot)
          getDownloadURL(storageRef)
            .then(url => {
              setLogo(url)
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

  return (
    <form>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        container
        spacing={6}
      >
        <Grid item xs={12}>
          <Typography variant='h5'>Nueva Marca</Typography>
          <Typography variant='body2'>Aquí puedes agregar una nueva marca y mejorar el manejo de los vehiculos</Typography>
        </Grid>
        <Grid item xs={7}>
          <FormControl fullWidth>
            <TextField label='Nombre' variant='outlined' value={name} onChange={e => setName(e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl>
            <Button
              startIcon={logo ? <CheckCircle /> : <Upload />}
              variant={logo ? 'contained' : 'outlined'}
              component='label'
              sx={{ my: 4, height: 56 }}
            >
              {logo ? 'Logo Subida' : 'Subir Logo'}
              <input style={styles.uploadInput} type='file' onChange={handleImageUpload} />
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={createBrand}>
            <PlusCircle size={20} color='primary.main' />
            <span className='align-middle ml-50'>Agregar Marca</span>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: '100%',
    marginBottom: 4
  },
  uploadInput: {
    display: 'none'
  }
}

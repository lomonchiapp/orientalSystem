/* eslint-disable lines-around-comment */
import React from 'react'
// ** MUI IMPORTS
import { Box, Button, Grid, Typography, FormControl, TextField, Select, MenuItem } from '@mui/material'
// ** ICONS IMPORT
import { PlusCircle } from '@phosphor-icons/react'
// ** FIREBASE IMPORT
import { database } from 'src/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'
// ** DIALOG
import { NewDialog } from 'src/views/dialogs/NewDialog'
import { NewCategory } from '../vehicles/categories/NewCategory'
import { NewBrand } from '../vehicles/brands/NewBrand'

export const VehicleBrands = () => {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [newBrand, setNewBrand] = useState(false)

  // ** REAL-TIME FETCHING CATEGORIES

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, 'brands'),
      querySnapshot => {
        const brands = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setBrands(brands)
      },
      error => {
        // Handle the error
        console.error('Error fetching brands:', error)
        // Optionally, update the state to reflect the error
      }
    )

    return () => unsubscribe() // Clean up the subscription on component unmount
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Select sx={{ width: 220, mr: 2 }}>
        <MenuItem value=''>Seleccione una Marca</MenuItem>
        {brands.map(brand => (
          <MenuItem key={brand.id} value={brand.id}>
            {brand.name}
          </MenuItem>
        ))}
      </Select>
      <PlusCircle
        onClick={() => setNewBrand(true)}
      size={24} />
      <NewDialog form={<NewBrand open={newBrand} setOpen={setNewBrand} />}
      open={newBrand}
      setOpen={setNewBrand}
      />
    </Box>
  )
}

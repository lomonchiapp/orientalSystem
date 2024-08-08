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
// ** GLOBAL STATE
import { useVehicleState } from 'src/globalStates/vehicleState'
import { set } from 'nprogress'

export const VehicleCategories = ({category, setCategory}) => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState(false)
  const {selectedVehicle, setSelectedVehicle} = useVehicleState()


  // ** REAL-TIME FETCHING CATEGORIES

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, 'categories'),
      querySnapshot => {
        const categories = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setCategories(categories)
      },
      error => {
        // Handle the error
        console.error('Error fetching categories:', error)
        // Optionally, update the state to reflect the error
      }
    )

    return () => unsubscribe() // Clean up the subscription on component unmount
  }, [])

  const handleCategoryChange = (event) => {
    setCategory(categories.find(category => category.name === event.target.value))
    setSelectedVehicle({...selectedVehicle, category: categories.find(category => category.name === event.target.value)})
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Select
      sx={{ width: 220, mr: 2 }}
      value={category?.name}
      onChange={handleCategoryChange}
    >
      <MenuItem value=''>Seleccione una categoría</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.name}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
      <PlusCircle
        onClick={() => setNewCategory(true)}
      size={24} />
      <NewDialog form={<NewCategory open={newCategory} setOpen={setNewCategory}/>}
      open={newCategory}
      setOpen={setNewCategory}
      />
    </Box>
  )
}

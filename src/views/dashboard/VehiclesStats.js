import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useDealerState } from 'src/globalStates/dealerState'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { database } from 'src/firebase'
import { BorderRadius } from 'mdi-material-ui'

const VehiclesStats = () => {
  const [vehicles, setVehicles] = useState([])
  const passolas = vehicles.filter(vehicle => vehicle.category?.name === 'Passola')
  const motocicletas = vehicles.filter(vehicle => vehicle.category?.name === 'Motocicleta')
  const atvs = vehicles.filter(vehicle => vehicle.category?.name === 'ATV')
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesCollection = collection(database, 'vehicles')
      const vehiclesSnapshot = await getDocs(vehiclesCollection)
      const vehiclesList = vehiclesSnapshot.docs.map(doc => doc.data())
      setVehicles(vehiclesList)
    }
    fetchVehicles()
  }, [])

  return (
    <Card>
      <CardHeader
        title='Datos de Vehiculos'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent>
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography>Total de Vehiculos: {vehicles.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={styles.passolas}>
              <Typography sx={styles.categoryName}>Passolas </Typography>{' '}
              <Typography sx={styles.qty}>{passolas.length}</Typography>
            </Box>
            <Box sx={styles.motocicletas}>
              <Typography sx={styles.categoryName}>Motocicletas </Typography>{' '}
              <Typography sx={styles.qty}>{motocicletas.length}</Typography>
            </Box>
            <Box sx={styles.atvs}>
              <Typography sx={styles.categoryName}>ATVs </Typography>{' '}
              <Typography sx={styles.qty}>{atvs.length}</Typography>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  )
}

const styles = {
  cardHeader: {
    pt: 5.5,
    alignItems: 'center',
    '& .MuiCardHeader-action': { mt: 0.6 }
  },

  categoryName: {
    fontSize: 10,
    color: 'white',
    pr: 2
  },
  passolas: {
    mr: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    p: 2,
    borderRadius: 2.5
  },
  motocicletas: {
    mr: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    p: 2,
    borderRadius: 2.5
  },
  atvs: {
    mr: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    p: 2,
    borderRadius: 2.5
  },
  qty: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 9,
    borderRadius: 2.5,
    p: 1
  }
}

export default VehiclesStats

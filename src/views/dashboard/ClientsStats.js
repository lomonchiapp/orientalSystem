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

const ClientsStats = () => {
  const [clients, setclients] = useState([])

  useEffect(() => {
    const fetchClients = async () => {
      const clientsCollection = collection(database, 'clients')
      const clientsSnapshot = await getDocs(clientsCollection)
      const clientsList = clientsSnapshot.docs.map(doc => doc.data())
      setclients(clientsList)
    }
    fetchClients()
  }, [])

  return (
    <Card>
      <CardHeader
        title='Datos de Clientes'
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
        <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography>Clientes Registrados {clients.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={styles.debts}>
              <Typography sx={styles.categoryName}>Deudas </Typography>{' '}
              <Typography sx={styles.qty}>$0</Typography>
            </Box>
            <Box sx={styles.earnings}>
              <Typography sx={styles.categoryName}>Ganancias </Typography>{' '}
              <Typography sx={styles.qty}>$0</Typography>
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
  earnings: {
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor: 'green',
    color: 'white',
    fontSize: 9,
    borderRadius: 2.5,
    p: 1,
    ml: 1
  },
  debts: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: 'red',
    color: 'white',
    fontSize: 9,
    borderRadius: 2.5,
    p: 1
  },
  qty: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 9,
    borderRadius: 2.5,
    p: 1
  }
}

export default ClientsStats

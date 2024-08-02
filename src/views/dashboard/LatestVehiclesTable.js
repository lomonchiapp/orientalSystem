// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'

// ** Global Dealer State
import { useDealerState, getVehicles, getClients } from 'src/globalStates/dealerState'

import { CardHeader } from '@mui/material'
import { useEffect } from 'react'
import { Image } from '@phosphor-icons/react'
import { useRouter } from 'next/router'


const LatestVehiclesTable = () => {
  const { vehicles, clients } = useDealerState()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicles = await getVehicles();
        let displayedVehicles;

        if (vehicles.length >= 5) {
          displayedVehicles = vehicles.slice(-5);
        } else {
          displayedVehicles = vehicles.sort(() => 0.5 - Math.random());
        }

        useDealerState.setState({ vehicles: displayedVehicles });

        const clients = await getClients();
        useDealerState.setState({ clients });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card sx={{position:'relative'}}>
      <CardHeader title='Ultimos Vehiculos' />
      <Button
        variant='contained'
        sx={{ position:'absolute', top: 10, right: 10 }}
        onClick={() => router.push('/vehicles')}
      >Ver Todos</Button>
      <TableContainer>
        <Table aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>Img</TableCell>
              <TableCell>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map(vehicle => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <Box display='flex' alignItems='center'>
                    {vehicle.image?
                      <img
                      className='w-10 h-10 object-cover rounded'
                      src={vehicle.image}
                      alt='vehicle'
                    /> : <Image alt='img' size={32} />}

                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography style={styles.vehicleName}>{vehicle.name}</Typography>
                    <Typography style={styles.salePrice}>
                      ${vehicle.salePrice}
                    </Typography>
                  </Box>
                  </TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

const styles = {
  vehicleName: {
    fontSize: 14
  },
  salePrice: {
    fontSize: 12,
    color: 'text.secondary'
  }
}

export default LatestVehiclesTable

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
  const {  clients } = useDealerState()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await getClients();
        let displayedClients;

        if (clients.length >= 5) {
          displayedClients = clients.slice(-5);
        } else {
          displayedClients = clients.sort(() => 0.5 - Math.random());
        }

        // Store all clients in the global state
        useDealerState.setState({ clients });

        // Store the displayed clients in a separate state if needed
        useDealerState.setState({ displayedClients });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card sx={{position:'relative'}}>
      <CardHeader title='Ultimos Clientes' />
      <Button
        variant='contained'
        sx={{ position:'absolute', top: 10, right: 10 }}
        onClick={() => router.push('/vehicles')}
      >Ver Todos</Button>
      <TableContainer>
        <Table aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>Nombre</TableCell>
              <TableCell>Ult Compra</TableCell>
              <TableCell>Deuda</TableCell>
              <TableCell>Prox Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id}>
                <TableCell>
                <Typography style={styles.clientName}>{client.firstName} {client.lastName}</Typography>
                </TableCell>
                <TableCell>
                  <Box>

                    <Typography style={styles.debt}>
                      ${client.amountDue}
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

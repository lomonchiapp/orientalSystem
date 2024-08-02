// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import LatestVehiclesTable from 'src/views/dashboard/LatestVehiclesTable'
import LatestClientsTable from 'src/views/dashboard/LatestClientsTable'
import VehiclesStats from 'src/views/dashboard/VehiclesStats'

// ** Protected Route Component
import ProtectedRoute from './ProtectedRoute'

// ** User
import { useAuth } from 'src/@core/context/AuthProvider'
import { useDealerState } from 'src/globalStates/dealerState'
import ClientsStats from 'src/views/dashboard/ClientsStats'

const Dashboard = () => {
  const { user } = useAuth()
  const { vehicles } = useDealerState()

  return (
    <ProtectedRoute>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant='h4'>Dashboard</Typography>
            <Typography variant='body2'>Bienvenido {user?.email}</Typography>
          </Grid>
          <Grid sx={{display:'flex', flexDirection:'row', gap:5}} item spacing={6} xs={12}>
            <Grid xs={3}>
              <VehiclesStats />
            </Grid>
            <Grid xs={3}>
              <ClientsStats />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <LatestVehiclesTable />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <LatestClientsTable />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </ProtectedRoute>
  )
}

export default Dashboard

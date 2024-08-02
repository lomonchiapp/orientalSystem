// ** Icon imports
import Login from 'mdi-material-ui/Login'
import { UsersThree, Motorcycle, CurrencyCircleDollar, MoneyWavy } from '@phosphor-icons/react'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Panel de Control',
      icon: HomeOutline,
      path: '/',
      items: [
        {
          title: 'Analytics',
          path: '/dashboard/analytics'
        },
      ]
    },
    {
      title: 'Configuración',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Dealer / Concesionario'
    },
    {
      title: 'Clientes',
      icon: UsersThree,
      path: '/clients',
      openInNewTab: false
    },
    {
      title: 'Vehiculos',
      icon: Motorcycle,
      path: '/vehicles',
    },
    {
      sectionTitle: 'Financiamiento'
    },
    {
      title: 'Ventas',
      icon: CurrencyCircleDollar,
      path: '/sales'
    },
    {
      title: 'Pagos',
      path: '/payments',
      icon: MoneyWavy
    },
  ]
}

export default navigation

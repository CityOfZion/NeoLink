import home from '../img/homeSolid.svg'
import paperplane from '../img/paper-planeSolid.svg'
import cog from '../img/cogSolid.svg'
import swap from '../img/syncSolid.svg'
import powerOff from '../img/power-offSolid.svg'

export default [
  {
    title: 'Home',
    img: home,
    alt: 'House',
    path: '/',
    id: 1,
  },
  {
    title: 'Send',
    img: paperplane,
    alt: 'Paper plane',
    path: '/send',
    id: 2,
  },
  {
    title: 'Settings',
    img: cog,
    alt: 'Cog',
    path: '/config',
    id: 3,
  },
  {
    title: 'Switch Accounts',
    img: swap,
    alt: 'Arrows in circles',
    path: '/config',
    id: 4,
  },
  {
    title: 'Log Out',
    img: powerOff,
    alt: 'Power off icon',
    path: '/logout',
    id: 5,
  },
]

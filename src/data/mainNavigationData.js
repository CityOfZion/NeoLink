import homeSVG from '../img/homeSolid.svg'
import paperplaneSVG from '../img/paper-planeSolid.svg'
import cogSVG from '../img/cogSolid.svg'
import swapSVG from '../img/syncSolid.svg'
import powerOffSVG from '../img/power-offSolid.svg'

export default [
  {
    title: 'Home',
    img: homeSVG,
    alt: 'House',
    path: '/',
    id: 1,
  },
  {
    title: 'Send',
    img: paperplaneSVG,
    alt: 'Paper plane',
    path: '/send',
    id: 2,
  },
  {
    title: 'Settings',
    img: cogSVG,
    alt: 'Cog',
    path: '/config',
    id: 3,
  },
  {
    title: 'Switch Accounts',
    img: swapSVG,
    alt: 'Arrows in circles',
    path: '/config',
    id: 4,
  },
  {
    title: 'Log Out',
    img: powerOffSVG,
    alt: 'Power off icon',
    path: '/logout',
    id: 5,
  },
]

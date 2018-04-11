import homeSVG from '../img/homeSolid.svg'
import paperplaneSVG from '../img/paper-planeSolid.svg'
import cogSVG from '../img/cogSolid.svg'
import swapSVG from '../img/syncSolid.svg'
import powerOffSVG from '../img/power-offSolid.svg'
import testSVG from '../img/flaskSolid.svg'

export default [
  {
    title: 'Home',
    img: homeSVG,
    alt: 'House',
    path: '/home',
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
    path: '/',
    id: 5,
  },
  {
    title: 'Test Invoke',
    img: testSVG,
    alt: 'test',
    path: '/testInvoke',
    id: 6,
  },
  {
    title: 'Send Invoke',
    img: testSVG,
    alt: 'test',
    path: '/sendInvoke',
    id: 7,
  },
  {
    title: 'Create Wallet',
    img: testSVG,
    alt: 'test',
    path: '/createWallet',
    id: 10,
  },
  {
    title: 'Create Wallet From WIF',
    img: testSVG,
    alt: 'test',
    path: '/newAccountFromWIF',
    id: 11,
  },
  {
    title: 'Import Wallet',
    img: testSVG,
    alt: 'test',
    path: '/importWallet',
    id: 12,
  },
  {
    title: 'Export Wallet',
    img: testSVG,
    alt: 'test',
    path: '/exportWallet',
    id: 13,
  },
]

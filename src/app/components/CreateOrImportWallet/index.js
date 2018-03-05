import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { Button } from 'rmwc/Button'
import '@material/button/dist/mdc.button.min.css'

const CreateOrImportWallet = ({ history }) => (
  <form>
    <Button raised ripple onClick={ () => history.push('/createWallet') }>Create Wallet</Button>
    <Button raised ripple onClick={ () => history.push('/newAccountFromWIF') }>Create Account From WIF</Button>
    <Button raised ripple onClick={ () => history.push('/importWallet') }>Import Wallet</Button>
  </form>
)

CreateOrImportWallet.propTypes = {
  history: PropTypes.object,
}

export default withRouter(CreateOrImportWallet)

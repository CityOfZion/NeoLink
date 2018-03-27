import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  accounts: {},
}

const actionsMap = {
  [ActionTypes.ADD_WALLET_ACCOUNT](state, action) {
    const accounts = { ...state.accounts }
    accounts[action.account.address] = action.account.export()

    return {
      ...state,
      accounts,
    }
  },
  [ActionTypes.DELETE_WALLET_ACCOUNT](state, action) {
    const accounts = { ...state.accounts }
    delete accounts[action.account.address]

    return {
      ...state,
      accounts,
    }
  },
  [ActionTypes.CHANGE_WALLET_LABEL](state, action) {
    const accounts = { ...state.accounts }
    Object.keys(accounts).forEach(account => {
      if (account === action.account.address) {
        accounts[account].label = action.account.label
      }
    })

    return {
      ...state,
      accounts,
    }
  },
}

export default function wallet(state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}

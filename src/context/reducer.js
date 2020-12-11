export const initialState = {
  user:
    JSON.parse(localStorage.getItem('slack_user')) === null
      ? null
      : JSON.parse(localStorage.getItem('slack_user')),
}

export const actionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
}

const reducer = (state, action) => {
  console.log(action)

  switch (action.type) {
    case actionTypes.SET_USER:
      localStorage.setItem('slack_user', JSON.stringify(action.user))
      return {
        ...state,
        user: action.user,
      }
    case actionTypes.LOGOUT_USER:
      localStorage.removeItem('slack_user')
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export default reducer

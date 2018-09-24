import { logoutUser } from './authActions';



export function errorHandler(dispatch, error, type) {
  console.log('Error type: ', type);
  console.log(error, 'ini');

  let errorMessage = error.error ? error.error.stack : error.error;

  //  // NOT AUTHENTICATED ERROR
  if (error.status === 401 || error.error.status === 401) {
    errorMessage = 'You are not authorized to do this.';
    return dispatch(logoutUser(errorMessage));
  }

  dispatch({
    type,
    payload: errorMessage,
  });
}
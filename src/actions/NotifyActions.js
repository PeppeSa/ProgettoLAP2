import { Permissions, Notifications } from 'expo';
import { TOKEN_TAKEN, SEND_NOTIFY } from './types';
import { aggiornAlert } from './MapActions';

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export const registerForPushNotificationsAsync = async (dispatch) => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();

  return dispatch({
    type: TOKEN_TAKEN,
    token
  });
};

export const mandaNotifica = (dispatch, token, title, body) => {
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        to: token,
        sound: 'default',
        body,
        data: { title: 'DATA' }
      }),
    });
    aggiornAlert(dispatch, 'Notifiche inviate con successo!');
    return dispatch({ type: SEND_NOTIFY });
};

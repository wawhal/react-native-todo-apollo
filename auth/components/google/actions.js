import {Alert} from 'react-native';
import {storeSession} from '../../actions';
import {clusterName} from '../../../Hasura';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
 trygooglelogin = async(user, loginCallback, stopLoadingIndicator)=>{
   const hasuraAuthUrl = `https://auth.${clusterName}.hasura-app.io/v1/signup`;
   const options = {
     "method": "POST",
     "headers": {
       "Content-Type": "application/json"
     },
     "body": JSON.stringify({
       "provider": "google",
       "data": {
         "access_token": user.accessToken
       }
     })
   };
   try {
     fetch(hasuraAuthUrl, options)
     .then((res) => res.json())
     .then((respObj)=>{
       respObj['success'] = true;
       respObj['google_profile_info'] = user;
       storeSession({
         id: respObj.hasura_id,
         token: respObj.auth_token,
         googleInfo: respObj.google_profile_info,
         type: "google"
       });
       loginCallback({
         id: respObj.hasura_id,
         token: respObj.auth_token,
         googleInfo: respObj.google_profile_info,
         type: "google"
       });
       stopLoadingIndicator();
     });
   } catch (e) {
   console.log(e);
   stopLoadingIndicator();
   }
 }
const handleGoogleAuth = async(androidClientId, iosClientid, loginCallback, startLoadingIndicator, stopLoadingIndicator) => {
  startLoadingIndicator();
  GoogleSignin.hasPlayServices({ autoResolve: true });
  GoogleSignin.configure({
    iosClientId: iosClientid,
    webClientId: androidClientId
  })
  .then(() => {
    GoogleSignin.signIn()
    .then((user) => {
      trygooglelogin(user, loginCallback, stopLoadingIndicator);
    })
    .catch((err) => {
    console.log('WRONG SIGNIN', err);
    stopLoadingIndicator();
    })
    .done();
  });
}
export {
  handleGoogleAuth
};

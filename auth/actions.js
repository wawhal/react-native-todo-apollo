import {AsyncStorage} from 'react-native';
import React from 'react';
import {clusterName, useHasuraApis, config} from '../Hasura';

const fetchAuthConf = async () => {
  if (useHasuraApis === false) {
    config["success"] = true;
    return config;
  }
  const url = `https://auth.${clusterName}.hasura-app.io/ui/conf`;
  const options = {
    'method': 'GET'
  }
  try {
    const response = await fetch(url, options);
    const respObj = await response.json();
    if (response.status == 200) {
      respObj["success"] = true;
    }
    return respObj;
  }
  catch (error) {
    console.log(error);
    return {
      message: error
    };
  }
};

const storeSession = async (sessionObj) => {
  try {
    await AsyncStorage.setItem(`@${clusterName}:myapp`, JSON.stringify(sessionObj));
  } catch (e) {
  }
}

const fetchSession = async () => {
  try {
    const sessionString = await AsyncStorage.getItem(`@${clusterName}:myapp`);
    const sessionObj = await JSON.parse(sessionString);
    return sessionObj;
  } catch (e) {
    console.log(e);
    return null;
  }
};


export {
  fetchAuthConf,
  storeSession,
  fetchSession,
};

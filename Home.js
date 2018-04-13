import {default as AppIndexScreen} from './src/AppScreen';
import { Platform, StatusBar} from 'react-native';
import React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {Spinner} from 'native-base';
import AuthHome from './auth/components/AuthHome';
import {clusterName} from './Hasura';
import {fetchSession} from './auth/actions';
import {home} from './auth/stylesheet';
import {GoogleSignin} from 'react-native-google-signin';

export default class Index extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    session: {
      isLoggedIn: false,
      sessionInfo: {}
    },
    loading: true
  }

  setLoadingIndicator = () => {
    this.setState({
      ...this.state,
      loading: true
    });
  }

  stopLoadingIndicator = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  }

  async componentWillMount() {
    try {
      const sessionInfo = await fetchSession();
      if (sessionInfo) {
        const userInfoResp = await this.getUserInfo(sessionInfo);
      }
      else {
        this.stopLoadingIndicator();
      }
    }
    catch (e) {
      console.log(e);
      this.stopLoadingIndicator();
    }
  }

  getUserInfo = async (sessionInfo) => {
    const userInfoResp = await fetch(`https://auth.${clusterName}.hasura-app.io/v1/user/info`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionInfo.token,
        'Content-Type': 'application/json'
      }
    });
    if (userInfoResp.status == 200) {
      const userInfo = await userInfoResp.json();
      this.setState({
        ...this.state,
        session: {
          isLoggedIn: true,
          sessionInfo,
          userInfo
        },
        loading: false
      });
    } else {
      this.stopLoadingIndicator();
    }
  }

  completeLogin = (sessionInfo) => {
    this.setState({
      ...this.state,
      session: {
        isLoggedIn: true,
        sessionInfo
      }
    })
  }

  deleteLocalSession = async () => {
    await AsyncStorage.removeItem(`@${clusterName}:myapp`);
  }

  logout = async () => {
    this.setLoadingIndicator();
    this.deleteLocalSession();
    try {
      await fetch(`https://auth.${clusterName}.hasura-app.io/v1/user/logout`, {
        'method': 'POST',
        'headers': {
          'Authorization': 'Bearer ' + this.state.session.sessionInfo.token
        }
      });
      this.setState({
        ...this.state,
        session: {
          isLoggedIn: false,
          sessionInfo: null
        },
        loading: false
      });
    } catch (e) {
      console.log(e);
      this.setState({
        ...this.state,
        session: {
          isLoggedIn: false,
          sessionInfo: null
        },
        loading: false
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container} >
          <Spinner />
        </View>
      );
    }
    if (this.state.session.isLoggedIn) {
      return (
        <AppIndexScreen logoutCallback={this.logout} sessionInfo={this.state.session.sessionInfo}/>
      );
    }
    return (
      <View style={styles.container} >
        <AuthHome loginCallback={this.completeLogin}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

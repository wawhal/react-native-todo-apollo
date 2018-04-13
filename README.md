# React Native Auth Kit

This is a React Native Boilerplate that is equipped with the following authentication methods:

- Username/Password
- Email
- Mobile with OTP
- Google

> If you wish to use the Expo SDK, [click here](https://github.com/hasura/react-native-auth-boilerplate/blob/master/expo).

## Contents

- [Getting started](#getting-started)
- [Adding your own source code](#adding-your-own-source-code)
  - [Logging out](#logging-out)
  - [Getting user info](#getting-user-information)
- [Login Methods](#login-methods)
  - [Username/Password](#username)
  - [Email](#email)
  - [Mobile-OTP](#mobile-otp)
  - [Google](#google)


## Getting started

### With Hasura APIs

**Note**: You need to install [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) to use the Hasura APIs

1. Clone the repo and cd into the vanilla directory. This will be referred to as the root directory from now on.

```bash
$ git clone https://github.com/hasura/react-native-auth-boilerplate && cd react-native-auth-boilerplate/vanilla
```

2. Quickstart the base Hasura project and apply the configurations of the project to the newly created [Hasura cluster](https://docs.hasura.io/0.15/manual/cluster/index.html). Run the following commands.

> The `hasura quickstart` command clones a base Hasura project with basic configuration and creates a free tier [Hasura cluster](https://docs.hasura.io/0.15/manual/cluster/index.html). Running a `git push` to the `hasura` remote applies the configuration from the project (here base) to the cluster.

```bash
$ hasura quickstart base
$ cd base
$ git add . && git commit -m "Applying configuration"
$ git push hasura master
```

> The above commands need not be run from the same directory. Run these commands wherever you want to keep your backend configuration.

3. You will obtain a cluster name after running the `hasura quickstart` command. Copy this cluster name. (You can also run `hasura cluster status` from the `base` directory to know your cluster name).

4. Modify the clusterName in `Hasura.js`.

```javascript
const clusterName = "clusterName45";
```

5. [Run the app](#running-the-app)

(By default, only "login with username" is enabled. To configure more login methods, go to the [individual sections](#username))

### Without Hasura APIs

Clone this repo and `cd` into the `vanilla` directory. This will be referred to as your main directory from now on.

```bash
$ git clone https://github.com/hasura/react-native-auth-boilerplate && cd react-native-auth-boilerplate/vanilla
```

Check the following sections to see how to configure the login methods without using Hasura APIs.

- [Username/Password](#username)
- [Email](#email)
- [Mobile OTP](#mobile-otp)
- [Google](#google)

After configuring, simply [run the app](#running-the-app).

## Adding your own source code

After the authentication is complete, the following screen is rendered.

![success](https://raw.githubusercontent.com/hasura/react-native-auth-boilerplate/master/readme-assets/ios/iossuccess.jpeg)


It is present at `src/AppScreen.js`. You can modify it as you like.

### Logging out

The screen mentioned above receives the logout function as a prop called ``logoutCallback``. Execute that function to make a user logout. Example of a logout button is:

```javascript
<Button title="Logout" onPress={this.props.logoutCallback} />
```

### Getting user information

Your screen also receives a prop called `sessionInfo` which is an object like so

```javascript
sessionInfo = {
  id: <a unique user id>,
  token: "<session_token",
  type: "mobile",
  ...
  ...
}
```

> The `sessionInfo` object differs a bit for every login method. So it will be helpful to log it once so you can handle it as desired.


## Running the app

1. Install node modules

```
$ npm install
```

2. Connect your device or emulator and run the following commands to run the app.

**For Android**: `react-native run-android`
**For iOS**: `react-native run-ios`

Run `npm install -g react-native-cli` if you don't have it installed.

## Login methods

### Username

#### With Hasura APIs

It is already configured. Just [create and configure the cluster](#getting-started) and it'll work.

#### Without Hasura APIs

1. Open `Hasura.js`
2. Set `useHasuraApis` to `false` and set the `username` field in `config` to `true`

```javascript
const clusterName = "clusterName45";
const useHasuraApis = false;

const config = {
  "username":true,
  "email":false,
  "mobileOtp":false,
  "googleArray": null,
  "facebook": null
};
```

3. Implement your own custom `tryLogin` and `trySignup` functions in ``auth/components/username/actions.js``.

4. Look at ``auth/components/username/Signup`` and ``auth/components/username/Login`` to see how the responses are handled.

### Email

#### With Hasura APIs

Note: This section assumes that you have already [created a Hasura cluster](#getting-started)

1. Run the following commands from the `base` directory:

```bash
# Get the user info
$ hasura user-info

# Copy the Token from the output of above command and run this
$ hasura secret update notify.hasura.token <Token>
```

2. Open ``conf/auth.yaml`` from the `base` directory and enable email provider by changing `defaultProviders > email > enabled` to true. (Don't change anything else unless you are sure about it).

```yaml
defaultProviders:
  email:
    enabled: "true"
    defaultRoles: []

```

3. Apply the changes you made by running the following commands from `base` directory.

```
$ git add .
$ git commit -m "Made changes to conf"
$ git push hasura master
```

*Disclaimer: The Emails are sent using [Hasura Test Provider](https://docs.hasura.io/0.15/manual/notify/email/hasura-test-provider.html). Before going into production, you will have to [configure SparkPost](https://docs.hasura.io/0.15/manual/notify/email/sparkpost.html) or [ configure SMTP](https://docs.hasura.io/0.15/manual/notify/email/smtp.html) in `conf/auth.yaml`.*

#### Without Hasura APIs

1. Open `Hasura.js`
2. Set `useHasuraApis` to `false` and set the `email` field in `config` to `true`

```javascript
const clusterName = "clusterName45";
const useHasuraApis = false;

const config = {
  "username":true,
  "email":true,
  "mobileOtp":false,
  "googleArray": null,
  "facebook": null
};
```

3. Implement your own custom `tryEmailLogin` and `tryEmailSignup`, `forgotPassword` and `resendVerification` functions in ``auth/components/email/actions.js``.

4. Look at ``auth/components/email/Signup`` and ``auth/components/email/Login`` to see how the responses are handled.


### Mobile OTP

#### With Hasura APIs

Note: This section assumes that you have already [created a Hasura cluster](#getting-started)

1. Run the following commands from the `base` directory:

```bash
# Get the user info
$ hasura user-info

# Copy the Token from the output of above command and run this
$ hasura secret update notify.hasura.token <Token>
```

2. Open ``conf/auth.yaml`` from the `base` directory and enable email provider by changing `defaultProviders > mobileOtp > enabled` to true. (Don't change anything else unless you are sure about it).

```yaml
defaultProviders:
  mobile:
    enabled: "true"
    defaultRoles: []
```

3. Apply the changes you made by running the following commands from `base` directory.

```
$ git add .
$ git commit -m "Made changes to the conf"
$ git push hasura master
```


*Disclaimer: The SMS are sent using Hasura Test Provider(https://docs.hasura.io/0.15/manual/notify/sms/hasura-test-provider.html). Before going into production, you will have to [configure Twilio](https://docs.hasura.io/0.15/manual/notify/sms/twilio.html) or [configure MSG91](https://docs.hasura.io/0.15/manual/notify/sms/msg91.html) in `conf/auth.yaml`.*


#### Without Hasura APIs

1. Open `Hasura.js`
2. Set `useHasuraApis` to `false` and set the `mobileOtp` field in `config` to `true`

```javascript
const clusterName = "clusterName45";
const useHasuraApis = false;

const config = {
  "username":true,
  "email":true,
  "mobileOtp": true,
  "googleArray": null,
  "facebook": null
};
```

3. Implement your own custom `sendOtp` and `verifyOtp` functions in ``auth/components/otp/actions.js``.

4. Look at ``auth/components/otp/SendOtp`` and ``auth/components/otp/Verify`` to see how the responses are handled.


### Google

We are using `react-native-google-signin` module for google sign in.
There are some configurations you need to add for iOS/android in order to enable Google login.

- For iOS:
  - add `react-native-auth-boilerplate/vanilla/ios/vanilla.xcodeproj` to your xcode project
  - Open [https://developers.google.com/identity/sign-in/ios/sdk/](https://developers.google.com/identity/sign-in/ios/sdk/)

  - Scroll down and click ```Get a configuration file``` button

  - Download the ```GoogleService-Info.plist``` file at the end of the process
  - Configure URL types in the ```Info``` panel
  - add a URL with scheme set to your ```REVERSED_CLIENT_ID``` (found inside the plist)
  - add a URL with scheme set to your ```bundle id```

  - Add the end of this step, your Xcode config should look like this:
  - [![xcode config](https://github.com/apptailor/react-native-google-signin/raw/master/img/url-config.png)](#config)
  - You are good to go for iOS.

- For android:
  - Open [Firebase Console](https://console.firebase.google.com/) and generate a configuration file for your application, for doing so you will need two things
    - ```package-name e.g. com.myapp``` from ```AndroidManifest.xml```
    -  Your SHA1 key which can be easily generated by running following command in terminal/cmd:
    ```bash
    $ keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
    ```

  - Download the ```google-services.json``` file at the end of the process
  - Copy this google-services.json to ```react-native-auth-boilerplate/vanilla/android/app``` folder.
  - Done, that's it! You are good to go for android.
  - Also if your android stimulator/device lack Google services you will get an error similar to following, to avoid this error simply install google play services:
    ![gservices](https://github.com/dvkcool/react-native-auth-boilerplate/raw/vanilla-revamp/readme-assets/android/gplayabs.png)

#### With Hasura APIs

Note: This section assumes that you have already [created a Hasura cluster](#getting-started)

1. Open ``conf/auth.yaml`` from the `base` directory and enable google login method by setting `defaultProviders > google > enabled` to `true`.

```yaml
defaultProviders:
  google:
    enabled: "true"
    defaultRoles: []
```

2. Also enter your `android client ID` and `iOS client ID` (same client ID(s) which were generated while configuring your application) as second and third elements of the `google > cliendIds` array respectively.

```yaml
google:
  clientIds: ["webClientId", "androidClientId", "iOSClientId"]
```

3. Apply the configuration to the cluster by running the following commands from the `base` directory

```
$ git add .
$ git commit -m "Made changes to the conf"
$ git push hasura master
```

#### Without Hasura API(s)

1. Open `Hasura.js`.

2. Set `useHasuraApis` to `false`. Enter your `android client ID` and `iOS client ID` as second and third elements of `config.googleArray` array respectively.

```javascript
const clusterName = "clusterName45";
const useHasuraApis = false;

const config = {
  "username":true,
  "email":true,
  "mobileOtp": true,
  "googleArray": ["webClientId", "androidClientId", "iosClientId"],
  "facebook": null
};
```

3. Implement your own implementation of handling the "auth_token" in the `tryGooglelogin` function in ``auth/components/google/actions.js``.

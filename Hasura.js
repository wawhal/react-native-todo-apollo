const clusterName = "conversion36";
const useHasuraApis = true;

// modify the configuration below only if userHasuraApis = false
const config = {
  "username":true, //set this field to true to enable username login
  "email":false, //set this field to true to enable email login
  "mobileOtp":false, // set this field to true to enable OTP login
  "googleArray": ["<webClientId>", "<androidClientId>", "<iosClientId>"], //set this field to null if you want to disable this method
  "facebook": "facebookClientId" // set this field to null if you want to disable facebook login
}

export {
  clusterName,
  useHasuraApis,
  config
};

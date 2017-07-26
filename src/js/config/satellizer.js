angular
.module('scubaApp')
.config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;


  $authProvider.facebook({
    url: `${API_URL}/oauth/facebook`,
    clientId: '137261886843519'
  });
}

angular
  .module('scubaApp')
  .config(Router);

Router.inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/js/views/statics/home.html'
    })
    .state('diveSitesIndex', {
      url: '/diveSites',
      templateUrl: 'js/views/diveSites/index.html',
      controller: 'DiveSitesIndexCtrl as diveSitesIndex'
    })
    .state('diveSitesNew', {
      url: '/diveSites/new',
      templateUrl: 'js/views/diveSites/new.html',
      controller: 'DiveSitesNewCtrl as diveSitesNew'
    })
    .state('diveSitesShow', {
      url: '/diveSites/:id',
      templateUrl: 'js/views/diveSites/show.html',
      controller: 'DiveSitesShowCtrl as diveSitesShow'
    })
    .state('diveSitesEdit', {
      url: '/diveSites/:id/edit',
      templateUrl: 'js/views/diveSites/edit.html',
      controller: 'DiveSitesEditCtrl as diveSitesEdit'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });

  $urlRouterProvider.otherwise('/');
}

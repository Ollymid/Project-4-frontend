angular
.module('scubaApp')
.controller('UsersShowCtrl', UsersShowCtrl);



UsersShowCtrl.$inject = ['$auth', 'User', 'Log', '$state', '$stateParams', 'DiveSite'];

function UsersShowCtrl($auth, User, Log, $state, $stateParams, DiveSite) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({
    id: $auth.getPayload().id
  });

  vm.user = User.get($stateParams);
  vm.site = DiveSite.query();

  function profileDelete() {
    User
    .remove(vm.user)
    .$promise
    .then(() => {
      $auth.logout();
      $state.go('login');
    });
  }

  vm.delete = profileDelete;


  vm.log = Log.get($stateParams);

  function logDelete() {
    vm.log
      .$remove()
      .then(() => $state.go('usersShow'));
  }

  vm.log.delete = logDelete;
}

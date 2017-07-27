angular
.module('scubaApp')
.controller('UsersShowCtrl', UsersShowCtrl);



UsersShowCtrl.$inject = ['$auth', 'User', '$state', '$stateParams'];

function UsersShowCtrl($auth, User, $state, $stateParams) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({
    id: $auth.getPayload().id
  });

  vm.user = User.get($stateParams);

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
}

angular
  .module('scubaApp')
  .controller('ProfileShowCtrl', ProfileShowCtrl);

ProfileShowCtrl.$inject = ['$auth', 'User', '$state', 'DiveSite', 'Log'];

function ProfileShowCtrl($auth, User, $state, DiveSite, Log) {
  const vm = this;
  vm.user = User.get($state.params);

  vm.logs = Log.query({
    createdBy: $state.params.id
  });

  vm.logout = logout;

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  function profilesDelete() {
    User
      .remove(vm.user)
      .$promise
      .then(() => {
        $auth.logout();
        $state.go('login');
      });
  }

  vm.delete = profilesDelete;
}

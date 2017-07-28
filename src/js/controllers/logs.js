angular
.module('scubaApp')
.controller('LogsNewCtrl', LogsNewCtrl)
.controller('LogsEditCtrl', LogsEditCtrl);


LogsNewCtrl.$inject = ['Log', '$state', 'DiveSite'];
function LogsNewCtrl(Log, $state, DiveSite) {
  const vm = this;
  vm.log = {};
  vm.diveSites = DiveSite.query();

  function logCreate() {
    Log
      .save(vm.log)
      .$promise
      .then(() => $state.go('diveSitesIndex'));
  }

  vm.create = logCreate;
}


LogsEditCtrl.$inject = ['$state', 'Log', 'User', 'DiveSite', '$stateParams', '$auth'];

function LogsEditCtrl($state, Log, User, DiveSite, $stateParams, $auth) {
  const vm = this;
  
  vm.diveSites = DiveSite.query();
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  Log.get($stateParams).$promise.then((log) => {
    vm.log = log;
    vm.log.date = new Date(log.date);
  });

  function logUpdate() {
    Log
    .update({ id: vm.log.id }, vm.log)
    .$promise
    .then(() => {
      $state.go('usersShow', { id: vm.currentUser.id }
    );
    });
  }
  vm.update = logUpdate;
}

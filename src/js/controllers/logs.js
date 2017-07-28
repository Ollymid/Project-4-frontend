angular
.module('scubaApp')
.controller('LogsNewCtrl', LogsNewCtrl)
.controller('LogsShowCtrl', LogsShowCtrl)
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

LogsShowCtrl.$inject = ['Log', 'User', '$stateParams', '$state', '$auth'];
function LogsShowCtrl(Log, User, $stateParams, $state, $auth) {
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

}

LogsEditCtrl.$inject = ['$state', 'Log', 'DiveSite', '$stateParams'];

function LogsEditCtrl($state, Log, DiveSite, $stateParams) {
  const vm = this;
  vm.diveSites = DiveSite.query();

  Log.get($stateParams).$promise.then((log) => {
    vm.log = log;
    vm.log.date = new Date(log.date);
  });

  function logUpdate() {
    Log
    .update({ id: vm.log.id }, vm.log)
    .$promise
    .then(() => {
      $state.go('usersShow', $state.params);
    });
  }
  vm.update = logUpdate;
}

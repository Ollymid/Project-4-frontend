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

  vm.log = Log.get($stateParams);

  function logDelete() {
    vm.log
      .$remove()
      .then(() => $state.go('logsIndex'));
  }

  vm.delete = logDelete;

}

LogsEditCtrl.$inject = ['$state', 'Log', '$stateParams'];

function LogsEditCtrl($state, Log, $stateParams) {
  const vm = this;

  Log.get($stateParams).$promise.then((log) => {
    vm.log = log;
    vm.log.date = new Date(log.date);
  });

  function logUpdate() {
    Log
    .update({ id: vm.log.id }, vm.log)
    .$promise
    .then(() => {
      $state.go('logsShow', $state.params);
    });
  }
  vm.update = logUpdate;
}

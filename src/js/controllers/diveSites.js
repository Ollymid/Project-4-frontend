angular
.module('scubaApp')
.controller('DiveSitesIndexCtrl', DiveSitesIndexCtrl);


DiveSitesIndexCtrl.$inject = ['DiveSite'];
function DiveSitesIndexCtrl(DiveSite) {
  const vm = this;

  vm.all = DiveSite.query();

}

DiveSitesNewCtrl.$inject = ['DiveSite', 'User', '$state'];
function DiveSitesNewCtrl(DiveSite, User, $state) {
  const vm = this;
  vm.site = {};
  vm.users = User.query();

  function diveSiteCreate() {
    DiveSite
      .save(vm.site)
      .$promise
      .then(() => $state.go('diveSitesIndex'));
  }

  vm.create = diveSiteCreate;
}

DiveSitesShowCtrl.$inject = ['DiveSite', 'User', '$stateParams', '$state', '$auth'];
function DiveSitesShowCtrl(DiveSite, User, $stateParams, $state, $auth) {
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.site = DiveSite.get($stateParams);


  function diveSiteDelete() {
    vm.site
      .$remove()
      .then(() => $state.go('diveSitesIndex'));
  }

  vm.delete = diveSiteDelete;

}

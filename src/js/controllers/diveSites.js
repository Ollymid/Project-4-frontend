angular
.module('scubaApp')
.controller('DiveSitesIndexCtrl', DiveSitesIndexCtrl)
.controller('DiveSitesNewCtrl', DiveSitesNewCtrl)
.controller('DiveSitesShowCtrl', DiveSitesShowCtrl)
.controller('DiveSitesEditCtrl', DiveSitesEditCtrl);

DiveSitesIndexCtrl.$inject = ['DiveSite'];
function DiveSitesIndexCtrl(DiveSite) {
  const vm = this;

  vm.all = DiveSite.query();

}

DiveSitesNewCtrl.$inject = ['DiveSite', '$state'];
function DiveSitesNewCtrl(DiveSite, $state) {
  const vm = this;
  vm.site = {};

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

DiveSitesEditCtrl.$inject = ['$state', 'DiveSite', '$stateParams'];

function DiveSitesEditCtrl($state, DiveSite, $stateParams) {
  const vm = this;

  DiveSite
  .get($stateParams)
  .$promise
  .then((site) => {
    vm.site = site;
  });

  function siteUpdate() {
    console.log(vm.site.id, vm.site);
    DiveSite
    .update({ id: vm.site.id }, vm.site)
    .$promise
    .then(() => {
      $state.go('diveSitesShow', $state.params);
    });
  }
  vm.update = siteUpdate;
}

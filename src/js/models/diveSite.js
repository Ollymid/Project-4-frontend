angular
.module('scubaApp')
.factory('DiveSite', DiveSite);

DiveSite.$inject = ['$resource', 'API_URL'];
function DiveSite($resource, API_URL) {
  return new $resource(`${API_URL}/dive_sites/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

angular
.module('scubaApp')
.factory('Log', Log);

Log.$inject = ['$resource', 'API_URL'];
function Log($resource, API_URL) {
  return new $resource(`${API_URL}/logs/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

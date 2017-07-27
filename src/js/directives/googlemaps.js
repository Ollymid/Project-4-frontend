/* global google */

angular
.module('scubaApp')
.directive('googleMapCreate', googleMapCreate)
.directive('googleMapEdit', googleMapEdit)
.directive('googleMapIndex', googleMapIndex);

function googleMapCreate() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">GOOGLE MAP HERE</div>',
    scope: {
      center: '=',
      lat: '=',
      lng: '='
    },
    link(scope, element) {

      let map = null;
      let marker = null;

      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);

      console.log(initMap());
      function initMap(center) {
        if (!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: center,
          scrollwheel: false
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
          });
        }


        map.addListener('click', (e) => {
          if(marker){
            marker.setPosition(e.latLng);
            const position = (e.latLng.toJSON());
            // console.log(position.lat);
            // console.log(position.lng);

            scope.lat = position.lat;
            scope.lng = position.lng;
            scope.$apply();

          } else {
            const position = (e.latLng.toJSON());
            scope.lat = position.lat;
            scope.lng = position.lng;
            scope.$apply();

            marker = new google.maps.Marker({
              position: e.latLng,
              map: map

            });
          }
        });
      }

      function destroyMap() {
        console.log('bye Create map');
        marker.setMap(null);
        marker = null;
      }

    }
  };
}

function googleMapEdit() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">GOOGLE MAP HERE</div>',
    scope: {
      center: '=',
      lat: '=',
      lng: '='
    },
    link(scope, element) {

      let map = null;
      let marker = null;

      scope.$watchGroup(['lat', 'lng'], () => {
        const location = { lat: scope.lat, lng: scope.lng };
        console.log(scope.lat);
        // console.log(marker, location);
        if(marker) {
          marker.setPosition(location);
          map.setCenter(location);
          return false;
        }

        marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: true

        });
        map.setCenter(location);

        marker.addListener('dragend', function (e) {
          const position = (e.latLng.toJSON());
          scope.lat = position.lat;
          scope.lng = position.lng;
          scope.$apply();
        });

      });

      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);


      function initMap(center) {
        if (!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: center,
          scrollwheel: false
        });


      }

      function destroyMap() {
        console.log('bye Create map');
        marker.setMap(null);
        marker = null;
        map = null;
      }

    }
  };
}


function googleMapIndex() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">GOOGLE MAP HERE</div>',
    scope: {
      center: '=',
      sites: '='
    },
    link(scope, element) {

      let map = null;
      let infowindow = null;
      let markers = [];

      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);

      function initMap(center) {
        if(!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 7,
          center: center,
          scrollwheel: false
        });

        scope.$watch('sites', addMarkers, true);


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map.setCenter(pos);
          });
        }

        function addMarkers(sites) {
          sites.forEach((site) => {
            addMarker(site);
          });
        }

        function addMarker(site){
          const marker = new google.maps.Marker({
            position: site,
            map
          });


          marker.addListener('click', () => {
            if(infowindow) infowindow.close();
            console.log(site.name);

            infowindow = new google.maps.InfoWindow({
              content: `
                <h1><a href="/diveSites/${site.id}">${site.name}</a></h1>
                <p>Max Depth: ${site.max_depth}</p>
              `
            });

            infowindow.open(map, marker);
          });

          markers.push(marker);

        }
      }

      function destroyMap() {
        console.log('bye Index map');
        markers.forEach(marker => marker.setMap(null));
        markers = [];
        map = null;
      }


    }
  };
}

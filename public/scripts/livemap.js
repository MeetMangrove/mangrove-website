window.MapSection = function (opts) {
  this.locations = opts.elements;

  this.init = function() {

    var map = new google.maps.Map(document.getElementById(opts.mapDiv), {
        zoom: 2,
        maxZoom: 6,
        minZoom:3,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#2c3e50"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "color": "#e42d67"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "100"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ff512f"
                    },
                    {
                        "lightness": "56"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#2c3e50"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "color": "#e42d67"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#e5eff5"
                    }
                ]
            }
        ],
        center: {lat: 32.57710, lng: 9.8196},
        scrollwheel: false
    });

    var markers = this.locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        map: map,
        icon: '../images/pin.png',
        label: {text: '1', color: 'white', fontSize: "11px", fontWeight:'bold'}
      });
    });

    var clusterStyles = [
      {
        textColor: 'white',
        url: '../images/pin.png',
        height: 32,
        width: 32
      },
     {
        textColor: 'white',
        url: '../images/pin.png',
        height: 32,
        width: 32
      },
     {
        textColor: 'white',
        url: '../images/pin.png',
        height: 32,
        width: 32
      }
    ];

    var markerCluster = new MarkerClusterer(map, markers, {
        styles: clusterStyles
    });
  }
}
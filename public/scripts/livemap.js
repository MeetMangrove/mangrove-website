window.MapSection = function (opts) {
    this.locations = [
        {lat:48.87862699999999,lng:2.3284617},
        {lat:48.82918129999999,lng:2.3530289},
        {lat:44.138441,lng:5.9534343},
        {lat:48.8205824,lng:2.3904769},
        {lat:48.6779126,lng:2.1573291},
        {lat:48.8662838,lng:2.3991762},
        {lat:48.87936029999999,lng:2.3970929},
        {lat:48.8394912,lng:2.3924922},
        {lat:45.7471225,lng:4.8221375},
        {lat:37.7333546,lng:-122.4239516},
        {lat:51.5073509,lng:-0.1277583},
        {lat:48.8893399,lng:2.3280508},
        {lat:37.769533,lng:-122.4499269},
        {lat:48.8846475,lng:2.3345134},
        {lat:41.3843132,lng:2.1593565},
        {lat:5.6037168,lng:-0.1869644},
        {lat:33.7764415,lng:-96.59969629999999},
        {lat:48.8749185,lng:2.1905021},
        {lat:47.366786,lng:0.7803416},
        {lat:48.8686897,lng:2.3452805},
        {lat:48.8588587,lng:2.4220204},
        {lat:47.77592569999999,lng:7.315732199999998},
        {lat:48.8476904,lng:2.4358414},
        {lat:48.8805044,lng:2.3529502},
        {lat:52.54154,lng:13.4247},
        {lat:51.5146688,lng:-0.1223889},
        {lat:-8.3405389,lng:115.0919509},
        {lat:48.8941393,lng:2.2480997},
        {lat:48.85498310000001,lng:2.4388168},
        {lat:47.66606669999999,lng:8.704689},
        {lat:48.8831092,lng:2.3373665},
        {lat:51.5123744,lng:-0.075699},
        {lat:48.8462717,lng:2.3754695},
        {lat:48.83937659999999,lng:2.2281465},
        {lat:37.839575,lng:-122.281442},
        {lat:48.8562878,lng:2.3360008},
        {lat:50.567939,lng:5.8035402},
        {lat:48.8885785,lng:2.3779309},
        {lat:48.8800855,lng:2.3033626},
        {lat:48.87311560000001,lng:2.3165914},
        {lat:38.0611706,lng:23.8473136},
        {lat:48.855963,lng:2.3575282},
        {lat:37.7641914,lng:-122.4315536},
        {lat:52.3537184,lng:4.903535000000001},
        {lat:48.8639641,lng:2.3551267},
        {lat:48.8635818,lng:2.3494028},
        {lat:48.8803043,lng:2.3599229},
        {lat:48.8179774,lng:2.1334491},
        {lat:48.8503143,lng:2.2658955},
        {lat:48.872871,lng:2.3618929},
        {lat:48.851615,lng:2.3185997},
        {lat:37.7925749,lng:-122.3945751},
        {lat:35.2768128,lng:-120.6598219},
        {lat:50.8575804,lng:4.3744682},
        {lat:34.035259,lng:-118.480851},
        {lat:48.8708446,lng:2.3426874},
        {lat:37.2552359,lng:-122.040704},
        {lat:48.8401666,lng:2.3887086},
        {lat:48.83969039999999,lng:2.4835705},
        {lat:48.829397,lng:2.244145},
        {lat:48.8830105,lng:2.3825185},
        {lat:48.8847775,lng:2.345948},
        {lat:48.83765589999999,lng:2.2978837},
        {lat:48.8676031,lng:2.3585126},
        {lat:48.8327243,lng:2.251755},
        {lat:48.8884355,lng:2.3245805},
        {lat:40.7446072,lng:-73.9874105},
        {lat:37.7249839,lng:-122.4761803},
        {lat:48.89746239999999,lng:2.2879547},
        {lat:48.8579668,lng:2.3526608},
        {lat:41.3818523,lng:2.1592114},
        {lat:47.47284519999999,lng:-0.571126},
        {lat:48.8512374,lng:2.3939384},
        {lat:42.624703,lng:-83.8308165},
        {lat:45.5259929,lng:-73.5742965},
        {lat:37.4254237,lng:-122.1530483},
        {lat:48.8420526,lng:2.3247932},
        {lat:48.8810917,lng:2.363433},
        {lat:48.8562579,lng:2.3074244},
        {lat:48.968713,lng:2.1880276},
        {lat:45.8384499,lng:1.204852},
        {lat:39.7057498,lng:-105.0758867},
        {lat:36.110785,lng:-115.072594},
        {lat:-31.97481,lng:115.91672},
        {lat:38.7168154,lng:-9.1208346},
        {lat:48.850517,lng:2.3197663},
        {lat:48.8279347,lng:2.3560074},
        {lat:48.8839318,lng:2.3116215},
        {lat:34.0243702,lng:-118.5096128},
        {lat:48.8737422,lng:2.3852674},
        {lat:29.9720726,lng:-90.05207349999999},
        {lat:48.8568394,lng:2.3556681},
        {lat:39.4670175,lng:-0.3661065},
        {lat:38.7175133,lng:-9.150739999999999},
        {lat:48.8270721,lng:2.372746},
        {lat:48.84445299999999,lng:2.2635143},
        {lat:48.8887848,lng:2.3787838}
      ]

  this.init = function() {

    var map = new google.maps.Map(document.getElementById(opts.mapDiv), {
        zoom: 2,
        maxZoom: 6,
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

    google.maps.event.addListener(map, 'zoom_changed', function() {
        var z = map.getZoom();
        //console.log(map.getCenter().lat() + "----" + map.getCenter().lng());
    });
  }
}
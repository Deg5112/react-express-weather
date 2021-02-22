class GeoService {
  getCurrentPosition = callback => {
    const geolocateSuccess = pos => callback(pos)
    const geolocateError = error => {
      let geolocateCodeError = '';

      switch (error.code) {
        case error.PERMISSION_DENIED:    geolocateCodeError = "user denied the request for geolocatelocation."; break;
        case error.POSITION_UNAVAILABLE: geolocateCodeError = "Location information is unavailable.";           break;
        case error.TIMEOUT:              geolocateCodeError = "The request to get user location timed out.";    break;
        case error.UNKNOWN_ERROR:        geolocateCodeError = "An unknown error occurred.";                     break;
      }

      console.error(geolocateCodeError);
    };

    navigator.geolocation.getCurrentPosition(geolocateSuccess, geolocateError, {
      enableHighAccuracy: false,
      timeout: 20000
    });
  }

  reverseGeoCode(lat, lng, cb) {
    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({'location': {lat, lng}}, (results, status)  => {
      if (status === 'OK' && results.length) {
          const {cityLong, stateLong, countryShort} = this.getLocationDataFromAddressComponents(results[0].address_components)
          cb(cityLong, stateLong, countryShort)
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  initAutoComplete(el, cb) {
    const self = this;
    new google.maps.places.Autocomplete(el, { types: ["geocode"] }).addListener(
      "place_changed",
      function() {
        const place = this.getPlace();

        if (!place.address_components) {
          return cb({
            formattedAddress: null,
            geometry: null,
            lat: null,
            lng: null,
            locationData: null
          });
        }

        const locationData = self.getLocationDataFromAddressComponents(
          place.address_components
        );
        cb({
          formattedAddress: place.formatted_address,
          geometry: place.geometry,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          locationData: locationData
        });
      }
    );
  }

  addressComponentsOnlyContainCountry(locationData) {
    return (
      Object.keys(locationData).length === 2 &&
      locationData.hasOwnProperty("countryLong") &&
      locationData.hasOwnProperty("countryShort")
    );
  }

  addressComponentsContainCity(locationData) {
    return (
      locationData.hasOwnProperty("cityLong") &&
      locationData.hasOwnProperty("cityShort")
    );
  }

  geocodeFromSearchQuery(searchObject) {
    let vm = this;

    return new Promise(resolve => {
      this.geocoder.geocode(searchObject, (results, status) => {
        if (status !== "OK") return this.notifyError("no results");

        let googleApiResult = results[0];

        resolve({
          formattedAddress: googleApiResult.formatted_address,
          locationData: vm.getLocationDataFromAddressComponents(
            googleApiResult.address_components
          ),
          geometry: googleApiResult.geometry
        });
      });
    });
  }

  getLocationDataFromAddressComponents(addressComponents) {
    let locationDetails = {};

    for (let i = 0; i < addressComponents.length; i++) {
      const componentType = addressComponents[i].types[0];

      switch (componentType) {
        case "locality":
          locationDetails.cityLong = addressComponents[i].long_name;
          locationDetails.cityShort = addressComponents[i].short_name;
          break;
        case "administrative_area_level_1":
          locationDetails.stateLong = addressComponents[i].long_name;
          locationDetails.stateShort = addressComponents[i].short_name;
          break;
        case "administrative_area_level_2":
          locationDetails.countyLong = addressComponents[i].long_name;
          locationDetails.countyShort = addressComponents[i].short_name;
          break;
        case "country":
          locationDetails.countryLong = addressComponents[i].long_name;
          locationDetails.countryShort = addressComponents[i].short_name;
          break;
        case "postal_code":
          locationDetails.zipLong = addressComponents[i].long_name;
          locationDetails.zipShort = addressComponents[i].short_name;
          break;
      }
    }

    console.log({locationDetails})
    return locationDetails;
  }
}

export default GeoService

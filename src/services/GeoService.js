class GeoService {
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          alert('it works');
          console.log(position)
        },
        function(error) {
          console.log(error)
        },
      );
    }else{
      alert('no geolocation support');
    }
  }
}

export default GeoService

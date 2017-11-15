/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
var recentlyPlayedSource = document.getElementById('rp-template').innerHTML,
    recentlyPlayedTemplate = Handlebars.compile(recentlyPlayedSource),
    recentlyPlayedPlaceholder = document.getElementById('rp-tracks');
var rpAnalysisSource = document.getElementById('rp-analysis-template').innerHTML,
    rpAnalysisTemplate = Handlebars.compile(rpAnalysisSource),
    rpAnalysisPlaceholder = document.getElementById('rp-analysis');
var params = getHashParams();
var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;
if (error) {
  alert('There was an error during the authentication');
} else {
  if (access_token) {
    google.charts.load('current', {'packages':['corechart']});
    $.ajax({
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=20',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
          recentlyPlayedPlaceholder.innerHTML = recentlyPlayedTemplate(response);
          var recentlyPlayedAnalysis = getRecentlyPlayedAnalysis(response);

          var ids = "";
          response.items.forEach(function(item) {
            ids += item.track.id + ',';
          });

          ids = ids.slice(0, -1);

          $.ajax({
            url: 'https://api.spotify.com/v1/audio-features/?ids=' + ids,
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              console.log(response);
              var trackAnalysis = getTrackAnalysis(response.audio_features);

              rpAnalysisPlaceholder.innerHTML = rpAnalysisTemplate(trackAnalysis);

              google.charts.setOnLoadCallback(drawCharts(recentlyPlayedAnalysis, trackAnalysis));

            }
          });

          $('#login').hide();
          $('#loggedin').show();
        }
    });
  } else {
      // render initial screen
      $('#login').show();
      $('#loggedin').hide();
  }
}
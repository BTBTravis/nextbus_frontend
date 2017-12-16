/**
 * Populates error message in red text on the screen
 * @param {string} e error txt
 */
function displayErr (e) {
  document.querySelector('#errortxt').textContent = e;
}

/**
 * Format time in the form of mins away
 * @param {obj} time prediction record returne by api
 */
function formatTime (time) {
  // 2017-12-14T19:03:00Z
  var t = moment().to(moment(time.arrival_time, 'YYYY-MM-DDTHH:mm:ss'));
  var str = t.match(/in (\d+ min)/);
  return (typeof str[1] !== 'undefined' ? str[1] : '?');
}

/**
 * When the pop up renders make an ajax call to the api to get bus times
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('onload' + Date());
  var request = new XMLHttpRequest();
  request.open('GET', 'http://104.131.105.4:8081/', true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      console.log(data);
      var times = data.map((t) => {
        return formatTime(t.with[0]);
      });
      var els = document.querySelectorAll('p[id*=time');
      console.log({els:els});
      for (var i = 0; i < els.length; ++i) {
        els[i].textContent = times[i];
        els[i].classList.remove('loading');
      }
      console.log(times);
    } else {
      displayErr('Server returned error');
    }
  };
  request.onerror = function () {
    displayErr('Failed to connect to server');
  };
  request.send();
});

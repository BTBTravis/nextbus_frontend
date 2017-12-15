/**
 * Change the background color of the current page.
 *
 * @param {array} times and array contains how many min away each bus is
 */
function updateTime (times) {


}

function formatTime (time) {
  // 2017-12-14T19:03:00Z
  var t = moment().to(moment(time.arrival_time, 'YYYY-MM-DDTHH:mm:ss'));
  var str = t.match(/in (\d+ min)/);
  console.log({str:str});
  return str[1];
}
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
      var els = document.querySelectorAll('p[id*=time'), i;
      console.log({els:els});
      for (i = 0; i < els.length; ++i) {
        els[i].textContent = times[i];
        els[i].classList.remove('loading');
      }

      console.log(times);
    } else {
      // We reached our target server, but it returned an error
  
    }
  };
  
  request.onerror = function () {
    // There was a connection error of some sort
  };
  
  request.send();
  // getCurrentTabUrl((url) => {
  //   var dropdown = document.getElementById('dropdown');

  //   // Load the saved background color for this page and modify the dropdown
  //   // value, if needed.
  //   getSavedBackgroundColor(url, (savedColor) => {
  //     if (savedColor) {
  //       changeBackgroundColor(savedColor);
  //       dropdown.value = savedColor;
  //     }
  //   });

  //   // Ensure the background color is changed and saved when the dropdown
  //   // selection changes.
  //   dropdown.addEventListener('change', () => {
  //     changeBackgroundColor(dropdown.value);
  //     saveBackgroundColor(url, dropdown.value);
  //   });
  // });
});

// ___UTILS___
var Impure = {
  // getJSON: R.curry(function (callback, url) {
  //   var request = new XMLHttpRequest();
  //   request.open('GET', url, true);
  //   request.onload = function () {
  //     if (request.status >= 200 && request.status < 400) {
  //       return 
  //     } else {
  //       displayErr('Server returned error');
  //     }
  //   };
  //   request.onerror = function () {
  //     displayErr('Failed to connect to server');
  //   };
  //   request.send();
  // }),
  getJSON: function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      // Make the request
      req.send();
    });
  },
  setHtml: R.curry(function (sel, html) {
    $(sel).html(html);
  })
};

// var trace = R.curry(function (tag, x) {
//     console.log(tag, x);
//     return x;
// });

// ___END UTIL___
// var url = function (t) {
//   return 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' +
//     t + '&format=json&jsoncallback=?';
// };

// var mediaUrl = R.compose(R.prop('m'), R.prop('media'));
// var srcs = R.compose(R.map(mediaUrl), R.prop('items'));
// var images = R.compose(R.map(img), srcs);
// var renderImages = R.compose(Impure.setHtml('body'), images);
// var app = R.compose(Impure.getJSON(renderImages), url);
// var app = R.compose(Impure.getJSON, renderImages, url);

// a => [b]
var parseJson = function(r){
  return JSON.parse(r);
};

// const f = () => console.log('it is true')
// const g = () => console.log('nope')
// const condition = true

// // separate condition
// function truthyEither(c) {
//   return c ? RF.Either.Right("right") : RF.Either.Left("LEFT")
// }
// console.log(truthyEither(true));

var trace = R.curry(function (tag, x) {
  console.log(tag, x);
  return x;
});
var formatTime = (str) => {
  // 2017-12-14T19:03:00Z
  // str = 'afsd';
  var ts = moment().to(moment(str, 'YYYY-MM-DDTHH:mm:ss'));
  return ts.match(/in (\d+ min)/) ? RF.Either.Right(ts) : RF.Either.Left("No time");
};

var first = (arr) => {
  return arr.length > 0 ? RF.Either.Right(arr[0]) : RF.Either.Left("Missing First Elment of array");
};
// var log = (tag, x) => {
//   console.log(x)
// }
var time = (a) => a[0].arrival_time;
var arrivalTime = R.compose(formatTime, trace('arrival_time'), R.map(R.prop('arrival_time')),trace('first'), first, trace('with'), R.prop('with'));
var arrivalTimes = R.compose(R.map(arrivalTime), parseJson);

var testData = [
  {
    with: [
      {
        arrival_time: '2018-12-14T19:03:00Z'
      }
    ]
  }
];
console.log({test: testData.map(arrivalTime)});

var app = function(){
  Impure.getJSON('http://104.131.105.4:8081/').then((r) => {
    var sum = arrivalTimes(r);
    console.log({sum: sum});
  }).catch((e) => {
    console.log({error: e});
    document.querySelector('#errortxt').textContent = e;
  });
};
document.addEventListener('DOMContentLoaded', () => {
  // app();
});



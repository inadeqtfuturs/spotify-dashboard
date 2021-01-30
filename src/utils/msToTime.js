// return number w/ 0 in front if < 10
function setBase(t) {
  return ('0' + t).slice(-2);
}

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60 || null;

  if (hrs) {
    return setBase(hrs) + ':' + setBase(mins) + ':' + setBase(secs);
  }

  return setBase(mins) + ':' + setBase(secs);
}

export default msToTime;

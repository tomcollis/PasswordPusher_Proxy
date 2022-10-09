// Initialise Materialize
document.addEventListener('DOMContentLoaded', function() {
    // Modal Popup
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // Input Form
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });
// Function - Submit Ticket
function submitPWP() {
  // Variables
  let myExpiryDays = "1";
  let myExpiryViews = "3";
  let brandedUrl = "https://pwpush.com/en/p/";
  // Get Form Values
  tContents = document.getElementById('contentValue').value;
  // Create Body
  console.log(tContents);
  // Send Data
      let apiUrl = 'https://pwpush.com/p.json';
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("password[payload]", tContents);
      urlencoded.append("password[expire_after_days]", myExpiryDays);
      urlencoded.append("password[expire_after_views]", myExpiryViews);
      urlencoded.append("password[deletable_by_viewer]", "true");
      urlencoded.append("password[retrieval_step]", "true");
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      
       fetch(apiUrl, requestOptions).then(response => response.json())
         .then(result => {
          console.log(result.url_token)
        }).catch(error => console.log('error', error));

};
// Wait for Click - Submit
  // Create Variables
  var lastClickTime = 0;
  var clickTimeoutHandle;
document.getElementById('submit').addEventListener('click', function() {
  var thisClickTime = (new Date()).getTime();
  if (thisClickTime - lastClickTime < 500) {
    // Double Click Action
    window.clearTimeout(clickTimeoutHandle);
    submitPWP();
  } else {
    clickTimeoutHandle = setTimeout(function() {
      // Single Click Action
      submitPWP();
      },500);
  }
  lastClickTime = thisClickTime;
});
// Variables
  let myExpiryDays = "1";
  let myExpiryViews = "3";
  let choiceDeletable = "true";
  let enableAddStep = "true";
  // let brandedUrl = "https://passwordpusher-proxy.pages.dev?token=";
  let pwpushServer = "https://pwpush.com/en/p/";
// Get URL Parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// Create BrandedUrl from HREF
  let baseURL = window.location.origin + window.location.pathname;
  let queryURL = "?token=";
  let brandedUrl = baseURL + queryURL;
// Initialise Materialize
document.addEventListener('DOMContentLoaded', function() {
    // Modal Popup
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    // Input Form
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });
// Hide Container for Response
$(document).ready(function(){
  $('#resultURL').hide();
  $('#retrieveSecret').hide();
  if (urlParams.has('token')){
    if (enableAddStep === "true"){
      // Show retrieval message
      $('#submitSecret').hide();
      $('#retrieveSecret').show();
      document.getElementById('retrievedValue').value = urlParams.get('token');
    } else {
      // Immediately Redirect
      fullUrl = pwpushServer + urlParams.get('token');
      window.location.href = fullUrl;
    }
  }
});
// Function - Retrieval Step
function redirectToSecret() {
  // Immediately Redirect
  fullUrl = pwpushServer + urlParams.get('token');
  window.location.href = fullUrl;
}
// Function - Submit Ticket
function submitPWP() {
  // Get Form Values
  scrtValue = document.getElementById('contentValue').value;
  // Create Body
  let apiUrl = 'https://pwpush.com/p.json';
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = new URLSearchParams();
  urlencoded.append("password[payload]", scrtValue);
  urlencoded.append("password[expire_after_days]", myExpiryDays);
  urlencoded.append("password[expire_after_views]", myExpiryViews);
  urlencoded.append("password[deletable_by_viewer]", choiceDeletable);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  // Send Data
  fetch(apiUrl, requestOptions).then(response => response.json())
    .then(result => {
    $('#submitSecret').hide();
    $('#resultURL').show();
    // Clear Previous Secret
    document.getElementById('contentValue').value = "";
    // Set URL to Text Box
    document.getElementById('urlValue').value = brandedUrl+result.url_token;
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
// Button - Copy to Clipboard
document.getElementById('copyClipboard').addEventListener('click', function() {
  // Get the text field
  var copyText = document.getElementById("urlValue");
  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
  // Alert the copied text
  alert("Copied the text: " + copyText.value);
});
// Button - Reset Form
document.getElementById('reset').addEventListener('click', function() {
  $('#submitSecret').show();
  $('#resultURL').hide();
  $('#retrieveSecret').hide();
});

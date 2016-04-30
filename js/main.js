//$("#q").append("haha");
/*function Main() {
            var cx = '010883068300123991560:yplkhrsjnem';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
};*/
google.load("search", "1");

function onLoad() {
  // Create a Custom Search Element that uses a
  // Custom Search Engine restricted to code.google.com.
  // Change the customSearchId string to the CSE ID of
  // your own Custom Search engine.
  var customSearchControl =
    new google.search.CustomSearchControl('010883068300123991560:yplkhrsjnem');
  //customSearchControl.enableAds(/* your publisher ID */);

  // Set drawing options to set the root element for the
  // search form (where you have defined a div such as
  // <div id="search-form">)
  var drawOptions = new google.search.DrawOptions();
  //drawOptions.setSearchFormRoot('hombre');

  // Draw the search results in the results div
  customSearchControl.draw('hombre'/*, drawOptions*/);
}

google.setOnLoadCallback(onLoad);
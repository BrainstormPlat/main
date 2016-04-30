google.load("search", "1");

function onLoad() {
  // Create a Custom Search Element that uses a
  // Custom Search Engine restricted to code.google.com.
  // Change the customSearchId string to the CSE ID of
  // your own Custom Search engine.
  var customSearchControl = new google.search.CustomSearchControl('010883068300123991560:yplkhrsjnem');
  //customSearchControl.enableAds(/* your publisher ID */);

  // Set drawing options to set the root element for the
  // search form (where you have defined a div such as
  // <div id="search-form">)
  //var drawOptions = new google.search.DrawOptions();
  //drawOptions.setSearchFormRoot('searchbox');

  // Draw the search results in the results div
  customSearchControl.execute("haha", 1, "");
  customSearchControl.draw('searchbox'/*, drawOptions*/);
}

google.setOnLoadCallback(onLoad);
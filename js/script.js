
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    
    // NT Times AJAX request
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?p=' + cityStr + '&sort=newest&api-key=917a1805c40d437f8dfe923c64b7c0a2';
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_rul + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
            '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    return false;
};

$('#form-container').submit(loadData);

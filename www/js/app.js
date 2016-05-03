var callbackFunction = function(data) {
    var temp = ((data.query.results.channel.item.condition.temp) - 32) * (5 / 9);
    temp = temp.toFixed(0);
    $("#temperature").html(temp);
    code = data.query.results.channel.item.condition.code;
    $("#temperature-text").html(data.query.results.channel.item.condition.text);
    amimatedIcon(code);
    var el = document.querySelector('#temperature');
    od = new Odometer({
        el: el,
        value: 00,
        format: '',
        theme: 'default'
    });
    od.update(temp);
};

function amimatedIcon(code) {
    var skycons = new Skycons({
        "color": "white"
    });

    $(".weather-icon").html('<canvas id="weather-icon" width="128" height="128"></canvas>');
    switch (code) {
        case '28':
            skycons.add("weather-icon", Skycons.PARTLY_CLOUDY_DAY);
            break;
        case '27':
            skycons.add("weather-icon", Skycons.PARTLY_CLOUDY_NIGHT);
            break;
        case '16':
            skycons.add("weather-icon", Skycons.SNOW);
            break;
        case '31':
            skycons.add("weather-icon", Skycons.CLEAR_NIGHT);
            break;
        case '32':
            skycons.add("weather-icon", Skycons.CLEAR_DAY);
            break;
        case '26':
            skycons.add("weather-icon", Skycons.CLOUDY);
            break;
        case '35':
            skycons.add("weather-icon", Skycons.RAIN);
            break;
        case '18':
            skycons.add("weather-icon", Skycons.SLEET);
            break;
        case '24':
            skycons.add("weather-icon", Skycons.WIND);
            break;
        case '20':
            skycons.add("weather-icon", Skycons.FOG);
            break;
        case '4':
            $(".weather-icon").html('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
            break;
    }
    skycons.play();
}


function loadNews() {
    /*var url = "http://bangla.bdnews24.com/?widgetName=rssfeed&widgetId=1151&getXmlFeed=true";
    $.ajax({
        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function(data) {
            var news = [];
            data = data.responseData.feed.entries;
            for (var i = 0; i < data.length; i++) {
                news[i] = data[i].title;
            }
            document.news = news;
        }
    });*/
    var url = "http://bangla.bdnews24.com/?widgetName=rssfeed&widgetId=1151&getXmlFeed=true";
    $.jsonp({
        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=?&q=' + encodeURIComponent(url),
        callbackParameter: '?',
        success: function(data, status) {
            var news = [];
            data = data.responseData.feed.entries;
            for (var i = 0; i < data.length; i++) {
                news[i] = data[i].title;
            }
            document.news = news;
        },
        error: function() {
            console.log('data');
        }
    });
}



loadNews();
setTimeout(loadNews, 900000); // every 15 min

function showNews() {
    var i = 0;
    (function loop() {
        if (i == document.news.length - 1) {
            i = -1;
        }
        $(".news").html('<div class="">' + document.news[i] + '</div>');
        if (++i < document.news.length) {
            setTimeout(loop, 4000);
        }
    })();
}
setTimeout(showNews, 3000);

function loadWather() {
    $.ajax({
        url: "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='bangladesh,dhaka')&format=json&callback=callbackFunction",
        success: function() {}
    });
}
loadWather();
setTimeout(loadWather, 1000 * 300);


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    time = checkTime(h) + ":" + m + ":" + s + " " + ampm;
    date = dayName(today.getDay()) + ", " + today.getDate() + ' ' + monthName(today.getMonth()) + " " + today.getFullYear();
    $("#time").html(time);
    $("#date").html(date);
    var t = setTimeout(startTime, 1000);
}

startTime();

function dayName(id) {
    data = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return data[id];
}

function monthName(id) {
    data = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return data[id];
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}
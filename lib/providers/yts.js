var request = require('request');
var url = "https://yts.to/api/v2/list_movies.json?";
var url_details = "https://yts.to/api/v2/movie_details.json?with_images=true&movie_id=";

function getMovies(sort, genre) {
    sort = typeof sort !== 'undefined' ? sort : 'download_count';

    request({
        url: url + "sort_by=" + sort,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response

            var m = body['data']['movies'];
            /*var movie2 = new Movie({
                title: m['title'],
                genres: m['genres'],
                imdb: m['imdb_code'],
                runtime: m['runtime'],
                cover_image: m['medium_cover_image'],
                year: m['year'],
                mpa_rating: m['mpa_rating'],
                rating: m['rating'],
                torrent: new Torrent({
                    date_uploaded: t['date_uploaded'],
                    hash: t['hash'],
                    peers: t['peers'],
                    seeds: t['seeds'],
                    quality: t['quality'],
                    size: t['size'],
                    url: t['url']
                })
            });*/
            var count = 10;//body['data']['movie_count'];
            var movies = "";
            for(var i=0; i<count; i++)
            {
                movies += '<a href="javascript:loadMovieDetail('+m[i]['id']+')"><div class="movie"><img src="'+m[i]['medium_cover_image']+'" class="movie_poster"><p>'+ m[i]['title']+'</p></div></a>';
            }

            $('#dingen').html(movies);
        }

    });
}

function getMovie(id) {
    request({
        url: url_details+id,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
            var m = body['data'];
            var movie = '<div class="movie_banner_wrapper"><img class="movie_banner" src="' + m['images']['large_screenshot_image1'] + '"></div>';
            movie += '<div class="movie_detail_content"><h1>'+ m['title'] +'</h1>';
            movie += '<img class="movie_poster_small" src="' + m['images']['medium_cover_image'] + '"><p>'+m['description_full']+'</p></div>';
            movie += '<div class="watch_buttons"><button class="watch_now">Watch</button></div>';

            $('#movie_detail').html(movie);
        }

    });
}

function loadMovieDetail(id) {
    $("#content").empty();
    $("#content").load("pages/movie_detail.html");
    getMovie(id);
}


var express = require('express');
var router = express.Router();
var xtorrent = require('xtorrent');
var Q = require("q");
var torrentStream = require('torrent-stream');
var path = require('path');

var basePath = path.normalize('C:\\Users\\Ellen\\AppData\\Local\\Temp\\torrent-stream\\');

/* GET home page. */
router.get('/', function(req, res, next) {
    getList()
        .then(function(list) {
            res.render('index', { title: 'Express', data: list});
        });
});

router.post('/', function(req, res) {
    console.log(req.body.url);
    getMagnet(req.body.url)
        .then(function(magnet) {
            var engine = torrentStream('magnet:'+magnet);
            engine.on('ready', function() {
                engine.files.forEach(function(file) {
                    if(path.extname(file.name) == '.mp4') {
                        console.log('Filename: ', file.name);
                        var stream = file.createReadStream();
                        var test = path.normalize(stream._engine.torrent.infoHash+'\\'+stream._engine.torrent.name+'\\'+file.name);
                        res.send(path.normalize(basePath+test));
                    }
                });
            });
        });
});

function getList() {
    var deferred = Q.defer();
    xtorrent.search({query:"Ex machina 2015"},function(err,list){
        if(err) { throw err; }
        else{
            deferred.resolve(list);
        }
    });
    return deferred.promise;
}

function getMagnet(url) {
    var deferred = Q.defer();
    xtorrent.info(url, function (err, torrent) {
        if (err) throw err
        else {
            deferred.resolve(torrent['download']['magnet']);
        }
    });
    return deferred.promise;
}

module.exports = router;



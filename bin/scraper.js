/**
 * Created by Ellen on 2-6-2015.
 */
var xtorrent = require('xtorrent');
var Q = require("q");

//var listSearch = Q.when(getList()).then(console.log(test));

function getList() {
    var deferred = Q.defer();
    xtorrent.search({query:"Ex machine 2015"},function(err,list){
        if(err) { throw err; }
        else{
            deferred.resolve(list[0]);
            //console.log(list[0]);
        }
    });
    return deferred.promise;
}

function getMagnet() {
    var torList = [];
    xtorrent.search({query:"Ex Machina"}, function(err,list) {
            if(err) { throw err; }
            else{
                //console.log(list[0]);
                for(var i = 0; i < list.length; i++) {
                    xtorrent.info(list[i].href, function (err, torrent) {
                        if (err) throw err
                        else {
                            //console.log(torrent);
                            list[i].magnet = torrent['download']['magnet'];
                            torList.push(list[i]);
                            console.log(list[i]);
                            console.log(torList[0]);
                        }
                    });
                }

            }
        }
    );
}

var test = xtorrent.search({query: "Ex Machina"}, function (err, list) {
            //console.log(list[0]);
            callback(list[0]);
            return list[0];
            });

Q.when(test).then(function(val) {
    console.log(val);
});
var nw = require('nw.gui');
var win = nw.Window.get();
win.isMaximized = false;

/* MAXIMIZE AND RESTORE WINDOW SIZE */
var maximizeWindow = function(event){
    switch(win.isMaximized){
        case true :
            win.restore();
            win.isMaximized = false;
            $('.titlebar #max-btn').toggleClass('max-restore-button');
            $('.titlebar #max-btn').toggleClass('maximize-button');
            break;

        case false :
            win.maximize();
            win.isMaximized = true;
            $('.titlebar #max-btn').toggleClass('max-restore-button');
            $('.titlebar #max-btn').toggleClass('maximize-button');
            break;
    };
};

/* SET CLICK EVENT SYSTEM BUTTONS */
window.onload = function() {
    $('.titlebar .minimize-button').on('click', function() {win.minimize()});
    $('.titlebar #max-btn').on('click', function(event) {maximizeWindow()});
    $('.titlebar .close-button').on('click', function() {win.close()});

    $('#link_films').on('click', function() {
        $("#content").empty();
        $("#content").load("pages/main.html");
    });

    $("#content").load("pages/main.html");
    //$("#content").load("pages/movie_detail.html");

}


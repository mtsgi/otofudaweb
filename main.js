$(function() {
    $.scrollify({
        section : "section",
        scrollbars: true,
        touchScroll: true,
        scrollSpeed: 800,
        overflowScroll: true,
        updateHash: false,
        before: (index) => {
            if( index == 0 ) $(".bgimg").addClass("show");
            else $(".bgimg").removeClass("show");
        }
    });
    $("#to-top").on("click", () => {
        $.scrollify.move("#title");
    });
    $("#scroll").on("click", () => {
        $.scrollify.next();
    });
});
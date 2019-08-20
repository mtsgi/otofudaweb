$(function() {
    $.scrollify({
        section : "section",
        scrollbars: false,
        touchScroll:true,
        scrollSpeed: 1200,
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
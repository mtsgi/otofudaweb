$(function() {
    $.scrollify({
        section : "section",
        scrollbars: false,
        touchScroll:true,
        scrollSpeed: 1200,
        overflowScroll: true,
        updateHash: false
    });
    $("#to-top").on("click", () => {
        $.scrollify.move("#title");
    });
    $("#scroll").on("click", () => {
        $.scrollify.next();
    });
});
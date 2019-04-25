$(function() {
    $.scrollify({
        section : "section",
        scrollbars: false,
        touchScroll:true,
        scrollSpeed: 1100,
        updateHash: false
    });
    $("#to-top").on("click", () => {
        $.scrollify.move("#title");
    });
    $("#scroll").on("click", () => {
        $.scrollify.next();
    });
});
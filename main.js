$(function() {
    $.scrollify({
        section : "section",
        scrollbars: false,
        touchScroll:true,
        scrollSpeed: 1100,
        updateHash: false
    });
    $("header").on("click", () => {
        $.scrollify.move("#title");
    });
    $("#scroll").on("click", () => {
        $.scrollify.next();
    });
});
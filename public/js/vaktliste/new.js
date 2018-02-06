$(function(){
    $("#generate").click(function(){
        var data = {
            start: $("#start").val(),
            end: $("#end").val()
        };
        $.ajax({
            url: '/api/vaktliste',
            method: "POST",
            data: data,
            success: function(){
                window.location = '/admin/vaktliste';
            },
            error: console.error
        });
    });
});
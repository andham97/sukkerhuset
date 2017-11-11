var prev;
$(function(){
    $('td[contenteditable=true]').focusout(function(){
        if($(this).text() === prev)
            return;
        $.ajax({
            url: '/api/vaktliste',
            type: 'POST',
            data: {
                type: $(this).data('type'),
                pos: $(this).data('pos'),
                value: $(this).text(),
                semester: $("table[data-semester]").data("semester")
            },
            error: console.error
        });
    });
    $('td[contenteditable=true]').focusin(function(){
        prev = $(this).text();
    });
});
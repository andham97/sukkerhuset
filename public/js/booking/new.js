$(function(){
    $("#save").click(function(){
        $.ajax({
            url: '/api/booking',
            type: 'POST',
            data: {
                name: $("#eventName").val(),
                date: new Date($("#eventDate").val()),
                contact: {
                    name: $("#contactName").val(),
                    email: $("#contactMail").val()
                },
                type: $("#eventType").val(),
                closed: $("#eventClosed").prop("checked"),
                amtGuests: Number($("#eventAmtGuests").val()),
                desc: $("#eventDesc").val()
            },
            success: console.log,
            error: console.error
        });
    });
});
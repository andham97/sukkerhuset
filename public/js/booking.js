var prev, edit = false, curTD, id, menu;
$(function(){
    id = setInterval(reload, 5000);
    $('td[contenteditable=false]').click(function(e){
        if(e.target.tagName != "A") {
            if(menu)
                $(menu).remove();
            var type = $(this).data('type');
            if (['kontrakt', 'faktura'].includes(type)) {
                menu = $("#" + type + "-menu").clone();
                $(menu).css({display: "block"});
                $(this).append($(menu));
                curTD = this;
                $("a").click(function () {
                    $(curTD).html($(this).text());
                    $(menu).remove();
                    fout(null, curTD);
                });
            }
        }

    }).focusout(fout);
    $('td[contenteditable=true]').focusout(fout).focusin(function(){
        prev = $(this).text();
    }).click(function(e){
        if(e.target.tagName != "A") {
            if(menu)
                $(menu).remove();
        }
    }).dblclick(function(){
        edit = true;
    }).keydown(function(e){
        var pos, type, npos;
        if(e.which == 13 && $(this).data('type') != "comment"){
            e.preventDefault();
            pos = $(this).data('pos') + "";
            type = $(this).data('type');
            pos = pos.split('-');
            npos = "";
            if(pos[1] === '1')
                npos += (Number(pos[0]) + 1) + "-0";
            else if(pos.length > 1)
                npos += pos[0] + "-1";
            else
                npos += Number(pos[0]) + 1 + "";
            if(pos.length === 3)
                npos += "-" + pos[2];
            $('td[data-pos=' + npos + '][data-type=' + type + ']').focus();
        }
        else if([37, 38, 39, 40].includes(e.which) && !edit){
            e.preventDefault();
            pos = $(this).data('pos') + "";
            type = $(this).data('type');
            pos = pos.split('-');
            npos = "";
            switch(e.which){
                case 37:
                    if(type === "arrangement")
                        return;
                    switch(type){
                        case "start":
                            type = "arrangement";
                            npos = pos[0];
                            break;
                        case "end":
                            type = "start";
                            npos = pos[0] + "-" + pos[1];
                            break;
                        case "kontaktperson":
                            type = "end";
                            npos = pos[0] + "-0";
                            break;
                        case "kontaktmail":
                            type = "end";
                            npos = pos[0] + "-1";
                            break;
                        case "kontrakt":
                            type = "kontaktperson";
                            npos = pos[0];
                            break;
                        case "faktura":
                            type = "kontrakt";
                            npos = pos[0];
                            break;
                        case "antallgjester":
                            type = "faktura";
                            npos = pos[0];
                            break;
                        case "comment":
                            type = "antallgjester";
                            npos = pos[0];
                            break;
                    }
                    break;
                case 38:
                    if(pos.length == 1 && pos[0] == 0 && type != "kontaktmail")
                        return;
                    if(pos.length == 2 && pos[0] == 0 && pos[1] == 0)
                        return;
                    switch(type){
                        case "arrangement":
                            npos = (Number(pos[0]) - 1) + "";
                            break;
                        case "start":
                            if(pos[1] == 0)
                                npos = (Number(pos[0]) - 1) + "-1";
                            else
                                npos = pos[0] + "-0";
                            break;
                        case "end":
                            if(pos[1] == 0)
                                npos = (Number(pos[0]) - 1) + "-1";
                            else
                                npos = pos[0] + "-0";
                            break;
                        case "kontaktperson":
                            type = "kontaktmail";
                            npos = (Number(pos[0]) - 1);
                            break;
                        case "kontaktmail":
                            type = "kontaktperson";
                            npos = pos[0];
                            break;
                        case "kontrakt":
                            npos = (Number(pos[0]) - 1) + "";
                            break;
                        case "faktura":
                            npos = (Number(pos[0]) - 1) + "";
                            break;
                        case "antallgjester":
                            npos = (Number(pos[0]) - 1) + "";
                            break;
                        case "comment":
                            npos = (Number(pos[0]) - 1) + "";
                            break;
                    }
                    break;
                case 39:
                    if(type === "comment")
                        return;
                    switch(type){
                        case "arrangement":
                            type = "start";
                            npos = pos[0] + "-0";
                            break;
                        case "start":
                            type = "end";
                            npos = pos[0] + "-" + pos[1];
                            break;
                        case "end":
                            type = "kontaktperson";
                            npos = pos[0];
                            break;
                        case "kontaktperson":
                            type = "kontrakt";
                            npos = pos[0];
                            break;
                        case "kontaktmail":
                            type = "kontrakt";
                            npos = pos[0];
                            break;
                        case "kontrakt":
                            type = "faktura";
                            npos = pos[0];
                            break;
                        case "faktura":
                            type = "antallgjester";
                            npos = pos[0];
                            break;
                        case "antallgjester":
                            type = "comment";
                            npos = pos[0];
                            break;
                    }
                    break;
                case 40:
                    if(pos.length == 1 && pos[0] == (Number($("#data").data('mainrows')) - 1) && type != "kontaktperson")
                        return;
                    if(pos.length == 2 && pos[0] == (Number($("#data").data("mainrows")) - 1) && pos[1] == 1)
                        return;
                    switch(type){
                        case "arrangement":
                            npos = (Number(pos[0]) + 1) + "";
                            break;
                        case "start":
                            if(pos[1] == 0)
                                npos = pos[0] + "-1";
                            else
                                npos = (Number(pos[0]) + 1) + "-0";
                            break;
                        case "end":
                            if(pos[1] == 0)
                                npos = pos[0] + "-1";
                            else
                                npos = (Number(pos[0]) + 1) + "-0";
                            break;
                        case "kontaktperson":
                            type = "kontaktmail";
                            npos = pos[0];
                            break;
                        case "kontaktmail":
                            type = "kontaktperson";
                            npos = (Number(pos[0]) + 1) + "";
                            break;
                        case "kontrakt":
                            npos = (Number(pos[0]) + 1) + "";
                            break;
                        case "faktura":
                            npos = (Number(pos[0]) + 1) + "";
                            break;
                        case "antallgjester":
                            npos = (Number(pos[0]) + 1) + "";
                            break;
                        case "comment":
                            npos = (Number(pos[0]) + 1) + "";
                            break;
                    }
                    break;
            }
            $('td[data-pos=' + npos + '][data-type=' + type + ']').focus();
        }
    });

    $(window).on("blur focus", function(e) {
        var prevType = $(this).data("prevType");

        if (prevType != e.type) {
            switch (e.type) {
                case "blur":
                    clearInterval(id);
                    break;
                case "focus":
                    setInterval(reload, 5000);
                    break;
            }
        }

        $(this).data("prevType", e.type);
    });
});

function fout(e, elem){
    console.log(elem);
    if(!elem)
        elem = this;
    if(menu)
        $(menu).remove();
    edit = false;
    if($(elem).text() === prev)
        return;
    $.ajax({
        url: '/api/booking',
        type: 'PUT',
        data: {
            type: $(elem).data('type'),
            pos: $(elem).data('pos'),
            value: $(elem).html(),
            semester: $("#data").data("semester")
        },
        success: function(){
            window.location.reload();
        },
        error: console.error
    });
}

function reload(){
    if(edit || $(this).text() !== prev)
        return;
    window.location.reload();
}
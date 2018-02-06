var prev, edit = false, curTD, id;
$(function(){
    $('td[contenteditable=true]').focusout(function(){
        if($(this).text() === prev)
            return;
        $.ajax({
            url: '/api/vaktliste',
            type: 'PUT',
            data: {
                type: $(this).data('type'),
                pos: $(this).data('pos'),
                value: $(this).text(),
                semester: $("#data").data("semester")
            },
            error: console.error
        });
    });
    $('td[contenteditable=true]').focusin(function(){
        prev = $(this).text();
    });
    $('td[contenteditable=true]').keydown(function(e){
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
        else if([37, 38, 39, 40].includes(e.which)){
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
                        case "va":
                            type = "end";
                            npos = pos[0] + "-" + pos[1];
                            break;
                        case "komite":
                            if(pos[2] == 0){
                                type = "va";
                                npos = pos[0] + "-" + pos[1];
                            }
                            else
                                npos = pos[0] + "-" + pos[1] + "-" + (Number(pos[2]) - 1);
                            break;
                        case "comment":
                            type = "komite";
                            npos = pos[0] + "-0-" + (Number($("#data").data('komiteamt')) - 1);
                            break;
                    }
                    break;
                case 38:
                    switch(type){
                        case "arrangement":
                            if(pos[0] == 0)
                                npos = pos[0];
                            else
                                npos = (Number(pos[0]) - 1);
                            break;
                        case "start":
                        case "end":
                        case "va":
                            if(pos[1] == 0){
                                if(pos[0] == 0)
                                    npos = pos[0] + "-" + pos[1];
                                else
                                    npos = (Number(pos[0]) - 1) + "-1";
                            }
                            else
                                npos = pos[0] + "-" + (Number(pos[1]) - 1);
                            break;
                        case "komite":
                            if(pos[1] == 0){
                                if(pos[0] == 0)
                                    npos = pos[0] + "-" + pos[1] + "-" + pos[2];
                                else
                                    npos = (Number(pos[0]) - 1) + "-1" + "-" + pos[2];
                            }
                            else
                                npos = pos[0] + "-" + (Number(pos[1]) - 1) + "-" + pos[2];
                            break;
                        case "comment":
                            if(pos[0] == 0)
                                npos = pos[0];
                            else
                                npos = (Number(pos[0]) - 1);
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
                            type = "va";
                            npos = pos[0] + "-" + pos[1];
                            break;
                        case "va":
                            type = "komite";
                            npos = pos[0] + "-" + pos[1] + "-0";
                            break;
                        case "komite":
                            if(pos[2] == Number($("#data").data('komiteamt')) - 1){
                                type = "comment";
                                npos = pos[0];
                            }
                            else
                                npos = pos[0] + "-" + pos[1] + "-" + (Number(pos[2]) + 1);
                            break;
                    }
                    break;
                case 40:
                    switch(type){
                        case "arrangement":
                            if(pos[0] == Number($("#data").data('mainrows')) - 1)
                                npos = pos[0];
                            else
                                npos = (Number(pos[0]) + 1);
                            break;
                        case "start":
                        case "end":
                        case "va":
                            if(pos[1] == 1){
                                if(pos[0] == Number($("#data").data('mainrows')) - 1)
                                    npos = pos[0] + "-" + pos[1];
                                else
                                    npos = (Number(pos[0]) + 1) + "-0";
                            }
                            else
                                npos = pos[0] + "-" + (Number(pos[1]) + 1);
                            break;
                        case "komite":
                            if(pos[1] == 1){
                                if(pos[0] == Number($("#data").data('mainrows')) - 1)
                                    npos = pos[0] + "-" + pos[1] + "-" + pos[2];
                                else
                                    npos = (Number(pos[0]) + 1) + "-0-" + pos[2];
                            }
                            else
                                npos = pos[0] + "-" + (Number(pos[1]) + 1) + "-" + pos[2];
                            break;
                        case "comment":
                            if(pos[0] == Number($("#data").data('mainrows')) - 1)
                                npos = pos[0];
                            else
                                npos = (Number(pos[0]) + 1);
                            break;
                    }
                    break;
            }
            $('td[data-pos=' + npos + '][data-type=' + type + ']').focus();
        }
    });
});
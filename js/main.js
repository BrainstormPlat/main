//some events

$(document).ready(function() {
    $(".idea p, .idea h3").dblclick(function() {
        $(this).attr('contenteditable','true');        
        $(this).append('<button class="save_button">save</button>');        
    });
});

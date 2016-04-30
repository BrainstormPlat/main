//some events

$(document).ready(function() {
    $(".idea p, .idea h3").dblclick(function() {
        $(this).attr('contenteditable', 'true');
        $(this).append('<button class="save_button">save</button>');
    });
    $('#step_1').click(function() {
        $('.step').removeClass('active_step');
        $('.working_class').hide();
        $('#add_board').fadeIn();
        $(this).addClass('active_step');
    });
    $('#step_2').click(function() {
        $('.step').removeClass('active_step');
        $('.working_class').hide();
        $('#ideas').fadeIn();
        $(this).addClass('active_step');
    });
    $('#step_3').click(function() {
        $('.step').removeClass('active_step');
        $('.working_class').hide();
        $('#ideas').fadeIn();
        $(this).addClass('active_step');
    });
    $('#step_4').click(function() {
        $('.step').removeClass('active_step');
        $('.working_class').hide();
        $('#ideas').fadeIn();
        $(this).addClass('active_step');
    });
});

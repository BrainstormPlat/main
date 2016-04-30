//some events

$(document).ready(function() {
    $('#ideas').hide();
    $('.idea').draggabilly({});
    $(".idea p, .idea h3").click(function() {
        $(this).attr('contenteditable', 'true');
        // $(this).after('<button class="save_button">save</button>');
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
    $('#add_idea').click(function() {
        $(this).before('<div class="idea idea_container">' + '<h3>header</h3>' + '<p>text</p>' + '</div>');
        $('.idea').draggabilly({});
        /*$('#ideas').masonry({
            // options
            itemSelector: '.idea',
            columnWidth: 200
        });*/
    });
});

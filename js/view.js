//some events
var h = new Handler();
var drawIdea =
    '<div class="idea">' +
    '<h3 contenteditable="true">header</h3>' +
    '<p contenteditable="true">text</p>' +
    '<button class="ok_idea"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button>' +
    '<select class="rating">' +
    '<option value="1">5</option>' +
    '<option value="2">4</option>' +
    '<option value="3">3</option>' +
    '<option value="4">2</option>' +
    '<option value="5">1</option>' +
    '</select>' +
    '</div>';

$(document).ready(function() {
    $('#ideas').hide();
    $('.idea').draggabilly({});
    $('#add_participant').click(function() {
            $('#participant').after('<input type="text" placeholder="Enter participant name" class="form-control participant_cl" name="participant">');
        })
        /*$(".idea p, .idea h3").click(function() {
            $(this).attr('contenteditable', 'true');
            // $(this).after('<button class="save_button">save</button>');
        });*/
    $('#step_1').click(function() {
        $('.step').removeClass('active_step');
        $('.working_class').hide();
$('.user_block').show();
        $('#add_board').fadeIn();
        $(this).addClass('active_step');
    });
    $('#step_2').click(function() {
        $('.step').removeClass('active_step');
        $('.rating_container').css('display', 'none');
        $('.working_class').hide();
        $('.rating').hide();
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $(this).addClass('active_step');
    });
    $('#step_3').click(function() {
        $('.step').removeClass('active_step');
        $('.rating_container').css('display', 'flex');
        $('.working_class').hide();
        $('.rating').show();
        $('.rating').prop( "disabled", false );
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $(this).addClass('active_step');
    });
    $('#step_4').click(function() {
        $('.step').removeClass('active_step');
        $('.working_class').hide();
        $('.rating').attr('disabled', 'disabled');
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $(this).addClass('active_step');
    });
    $('#add_idea').click(function() {
        $(this).before(drawIdea);
        $('.idea').draggabilly({});
        /*$('#ideas').masonry({
            // options
            itemSelector: '.idea',
            columnWidth: 200
        });*/
    });
    $('.idea').mouseover(function() {
        $('.rating_container').css('opacity', '1');
    });
    $('.idea').mouseleave(function() {
        $('.rating_container').css('opacity', '0');
    });
    $('#register').click(function() {
        h.UpdateMainForm($('#main_form').serialize());
    });
    $('#add_user').click(function() {
        h.Authenticate($('#username').val());
    });
    $('#begin_storm').click(function() {
        h.Start();
    });
    $('.rating').click(function() {
        var tmp = $('.rating').serialize();
        console.log(tmp);
        h.UpdateRatings(tmp);
    });    
});

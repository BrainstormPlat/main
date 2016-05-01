//some events
var h = new Handler();
var drawIdea = '<fieldset class="rating">' + 
                        '<input type="radio" id="star5" name="rating" value="5" />' + 
                        '<label class="full" for="star5" title="Awesome - 5 stars"></label>'+
                        '<input type="radio" id="star4half" name="rating" value="4 and a half" />'+
                        '<label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>'+
                        '<input type="radio" id="star4" name="rating" value="4" />'+
                        '<label class="full" for="star4" title="Pretty good - 4 stars"></label>'+
                        '<input type="radio" id="star3half" name="rating" value="3 and a half" />'+
                        '<label class="half" for="star3half" title="Meh - 3.5 stars"></label>'+
                        '<input type="radio" id="star3" name="rating" value="3" />'+
                        '<label class="full" for="star3" title="Meh - 3 stars"></label>'+
                        '<input type="radio" id="star2half" name="rating" value="2 and a half" />'+
                        '<label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>'+
                        '<input type="radio" id="star2" name="rating" value="2" />'+
                        '<label class="full" for="star2" title="Kinda bad - 2 stars"></label>'+
                        '<input type="radio" id="star1half" name="rating" value="1 and a half" />'+
                        '<label class="half" for="star1half" title="Meh - 1.5 stars"></label>'+
                        '<input type="radio" id="star1" name="rating" value="1" />'+
                        '<label class="full" for="star1" title="Sucks big time - 1 star"></label>'+
                        '<input type="radio" id="starhalf" name="rating" value="half" />'+
                        '<label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>'+
                    '</fieldset>';

$(document).ready(function() {
    $('#ideas').hide();
    $('.idea').draggabilly({});
    $('#add_participant').click(function () {
        $('#participant').after('<input type="text" placeholder="Enter participant name" class="form-control participant_cl">');
    })
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
        $('.rating_container').css('display', 'none');
        $('.working_class').hide();
        $('#ideas').fadeIn();
        $(this).addClass('active_step');
    });
    $('#step_3').click(function() {
        $('.step').removeClass('active_step');
        $('.rating_container').css('display', 'flex');
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
    $("#begin_storm").click(function() {
        h.UpdateTheme($("#theme").val());
    });
});

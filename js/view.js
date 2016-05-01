//some events
var h = new Handler();
var indexIdea = 1;
var ideaMap = {};
var ideaSelf;
function deleteIdeas() {
    $('.idea').remove();
}
function drawIdea (self, idea, description) {
    idea = (idea === undefined) ? 'idea' : idea;
    description = (description === undefined) ? 'description' : description;
    var idea =
        '<div class="idea"  id=idea_' + indexIdea + '>' +
        '<h3 contenteditable="true">' + idea + '</h3>' +
        '<p contenteditable="true">' + description + '</p>' +
        '<button class="ok_idea"><i class="fa fa-check-circle-o" area-hidden="true"></i></button>' +
        '<select class="rating">' +
        '<option value="5">5</option>' +
        '<option value="4">4</option>' +
        '<option value="3">3</option>' +
        '<option value="2">2</option>' +
        '<option value="1">1</option>' +
        '</select>' +
        '</div>';
        $('this h3,this p').click(function() {
            ideaSelf.focus();
        });
   indexIdea++;     
   $(ideaSelf).before(idea);
   $('.idea').draggabilly({});
   $('.rating').hide();     
   $('.ok_idea').click(function() {
        var id = $(ideaSelf).parent().attr('id');
        var idea = $("#"+id +" h3").text();
        var description = $("#"+id +" p").text();
        console.log(id);
  h.UpdateIdea(new Idea(id,idea,description,5));     
 });   
}

$(document).ready(function() {
    $('#ideas').hide();
    $('#results').hide();
    $('.idea').draggabilly({});
    $('#add_participant').click(function() {
            $('#participant').after('<input type="text" placeholder="Enter participant name" class="form-control participant_cl" name="participant">');
        });
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
        $('#go_from_2').show();
        $('#go_from_3').hide();
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
        $('#go_from_2').hide();
        $('#go_from_3').show();
    });
    $('#step_4').click(function() {
        $('.step').removeClass('active_step');
        $('.working_class').hide();
        $('.rating').attr('disabled', 'disabled');
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $(this).addClass('active_step');
        $('#go_from_2').hide();
        $('#go_from_3').hide();
    });
    $('#add_idea').click(function() {
       ideaSelf = this;
       drawIdea(self,"idea","description");        
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
        $('.step').removeClass('active_step');
        $('.rating_container').css('display', 'none');
        $('.working_class').hide();
        $('.rating').hide();
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $('#step_2').addClass('active_step');
        $('#go_from_3').hide();
    });
    $('#add_user').click(function() {
        h.Authenticate($('#username').val());
    });
    $('#begin_storm').click(function() {
        h.Start();
        $('.step').removeClass('active_step');
        $('.rating_container').css('display', 'none');
        $('.working_class').hide();
        $('.rating').hide();
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $('#step_2').addClass('active_step');
        $('#go_from_3').hide();
    });
    $('.rating').change(function() {
        var tmp = $('.rating').val();
        //console.log(tmp);
        h.UpdateRatings($('.rating').parent.id, tmp);
    });
    
    $('.ok_idea').click(function() {
        var id = $(this).parent().attr('id');
        var idea = $("#"+id +" h3").text();
        var description = $("#"+id +" p").text();
        console.log(id);
      h.UpdateIdea(new Idea(id,idea,description,5));
    });
    $('.idea h3,.idea p').click(function() {
        $(this).focus();
    });
    $('#go_from_2').click(function () {
        $('.step').removeClass('active_step');
        $('.rating_container').css('display', 'none');
        $('.working_class').hide();
        $('.rating').hide();
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $('#step_3').addClass('active_step');
        $('#go_from_2').hide();
        $('#go_from_3').show();
    });
    $('#go_from_3').click(function () {
        $('.step').removeClass('active_step');
        $('.rating_container').css('display', 'flex');
        $('.working_class').hide();
        $('.rating').show();
        $('.rating').prop( "disabled", false );
        $('#ideas').fadeIn();
        $('.user_block').hide();
        $('#step_4').addClass('active_step');
        $('#go_from_2').hide();
        $('#go_from_3').hide();
    });
});

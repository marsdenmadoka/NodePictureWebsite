$(function(){
   // hide the comment form by default, and then display it only when a user clicks on the Post Comment button
$('#post-comment').hide();
    $('#btn-comment').on('click', function(event) {
    event.preventDefault();
    $('#post-comment').show();
});

       //used AJAX to track likes instead of relying on afull page postback.
 $('#btn-like').on('click', function(event) {//attaches an onClick event handler to the btn-like button.
        event.preventDefault();
        var imgId = $(this).data('id');//first retrieves the data-id attribute from the Like button itself
        $.post('/images/' + imgId + '/like').done(function(data) { //performs a jQuery AJAX post to the /images/:image_id/like  in our routes.js file
        $('.likes-count').text(data.likes);//change the text of the HTML element with a likes-count class and replace it with the data that was returned from the AJAX call—in this case, the updated total count of likes
        });
 });

 });

//  The event.preventDefault() part is important because if we didn't include that, the action of
// clicking on the button would do what a browser expects it to do and try to execute
// our custom JavaScript function at the same time
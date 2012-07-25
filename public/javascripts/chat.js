function chat() {
    var message = $('#message').val();
    console.log(message);
    $.ajax({
        url: "/chat",
        data: {message: message},
        async: false,
        success: function(data){
            $("#message").val('');

            //do nothing.
        }
    });
    $('#form').submit(function() {
        return false; 
    });

}


var client = tuppari.createClient({
    applicationId: '6545f512-301b-4951-b36f-a750716cb3a1' // Replace this with your Application ID.
});
var channel = client.subscribe('chat');
channel.bind('your_event', function (data) {
    console.log('An event was triggered with message: %s', data);
    var date = new Date();
    $('#list').prepend($('<dt>' + date + '</dt><dd>' + data + '</dd>'));
});


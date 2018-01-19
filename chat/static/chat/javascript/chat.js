$( document ).ready(function() {

    Vue.component('message', {
        props: ['msg'],
        template: '<div>{{ msg.text }}</div>'
    });

    var app1 = new Vue({
      el: '#app1',
      data: {messages: []}
    });

    app1.messages = get_values();

});



// ----------------------------------------------- funcs ------------------------------------------------------

function get_values() {
    return [
              { id: 0, text: 'Vegetables' },
              { id: 1, text: 'Cheese' },
              { id: 2, text: 'Whatever else humans are supposed to eat' }
           ]
};

function get_new_messages(handleData) {
    $.ajax({
        url: $('#app1').attr('data-ajax-get_new_messages'),
        type: 'get',
        dataType: 'json',
        data: {'last_id': 1},
        success: function(data) {
                                    handleData(data);
                                }
    })
};
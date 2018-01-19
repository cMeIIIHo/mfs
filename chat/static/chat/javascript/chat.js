$( document ).ready(function() {

    Vue.component('message', {
        props: ['message'],
        template: '<div>{{ message.text }}</div>'
    });

    var app1 = new Vue({
      el: '#app1',
      data: {
        messages: []
      },
      methods: {
        update_messages: function() {
            $.ajax({
                url: $('#app1').attr('data-ajax-get_new_messages'),
                type: 'get',
                dataType: 'json',
                data: {'last_id': 0},
                success: function(data) {
                    app1.messages = data
                }
            })
        }
      },
    });

    app1.update_messages();

});



// ----------------------------------------------- funcs ------------------------------------------------------

//function get_values() {
//    return [
//              { id: 0, text: 'Vegetables' },
//              { id: 1, text: 'Cheese' },
//              { id: 2, text: 'Whatever else humans are supposed to eat' }
//           ]
//}
//
//function get_new_messages() {
//            $.ajax({
//                url: $('#app1').attr('data-ajax-get_new_messages'),
//                type: 'get',
//                dataType: 'json',
//                data: {'last_id': 1},
//                success: function(data) {
//                    app1.messages = [
//                         { id: 0, text: 'Vegasdaasdasdasdasdetables' },
//                         { id: 1, text: 'Cheese' },
//                         { id: 2, text: 'Whatever else humans are supposed to eat' }
//                    ]
//                }
//            })
//        }
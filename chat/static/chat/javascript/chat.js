$( document ).ready(function() {

Vue.component('message', {
    props: ['msg'],
    template: '<div>{{ msg.pk }}</div>'
})

var app1 = new Vue({
  el: '#app1',
  data: {
    messages: get_new_messages(function(data) {
        return data;
    })
  }
})

});

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
}
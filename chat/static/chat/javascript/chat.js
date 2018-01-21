$(document).ready(function() {

  Vue.component('message', {
    props: ['message'],
    template: '<div>{{ message.text }}, {{ message.id }}</div>'
  });

  var app1 = new Vue({
    el: '#app1',
    data: {
      messages: [],
      last_id: 0,
    },
    methods: {
      update_messages: function() {
        var self = this;
        $.ajax({
          url: '/api/get_messages',
          type: 'get',
          dataType: 'json',
          data: {
            'last_id': self.last_id,
          },
          success: function(new_messages) {
            if (!$.isEmptyObject(new_messages)) {
              for (var index in new_messages) {
                self.messages.unshift(new_messages[index]);
              };
              self.last_id = new_messages[new_messages.length - 1]['id'];
            }
          }
        })
      },
    },
    mounted: function() {
      this.update_messages();
      setInterval(this.update_messages, 10000);
    },
  });

});


//$(document).ready(function() {
//
//  Vue.component('message', {
//    props: ['message'],
//    template: '<div>{{ message.text }}</div>'
//  });
//
//  var app1 = new Vue({
//    el: '#app1',
//    data: {
//      messages: [],
//      last_id: 0,
//    },
//    methods: {
//      update_messages: function() {
//        $.ajax({
//          url: $('#app1').attr('data-ajax-get_new_messages'),
//          type: 'get',
//          dataType: 'json',
//          data: {
//            'last_id': app1.last_id,
//          },
//          success: function(data) {
//            app1.messages = data;
//          }
//        })
//      }
//    },
//  });
//
//  app1.update_messages();
//
//});
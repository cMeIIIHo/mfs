$(document).ready(function() {

  Vue.component('message', {
    props: ['message'],
    template: '<div>{{ message.text }}</div>'
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
            self.messages.push.apply(self.messages, new_messages);
          }
        })
      },
    },
    mounted: function() {
      this.update_messages();
      setInterval(this.update_messages, 5000);
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
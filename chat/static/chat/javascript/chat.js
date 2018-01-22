$(document).ready(function() {

  Vue.component('message', {
    props: ['message'],
    template: '<div>{{ message.date }}, {{ message.text }}</div>'
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
          type: 'GET',
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
$(document).ready(function() {

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

  Vue.component('message', {
    props: ['message'],
    template: `
      <div class="card">
        <div class="card-header">
        {{ timeConverter(message.date) }}
        </div>
        <div class="card-body">
          <p class="card-text">{{ message.text }}</p>
          <button type="button" class="btn btn-info" v-on:click="read">Read</button>
        </div>
      </div>
    `,
    methods: {
      read: function() {
        var self = this;
        $.ajax({
          url: '/api/mark_read',
          type: 'GET',
          dataType: 'json',
          data: {
            'message_id': self.message['id'],
          },
          success: function() {
            var element = self.$el;
            $(element).hide('slow');
          },
        });
      },
    },
  });
});

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


from django.conf.urls import url
from chat import views

app_name = 'chat'

urlpatterns = [
    url(r'^$', views.show_unread_messages, name='show_unread_messages'),
    url(r'^api/get_messages$', views.get_new_messages, name='get_new_messages'),
    url(r'^api/mark_read$', views.mark_read, name='mark_read'),
]

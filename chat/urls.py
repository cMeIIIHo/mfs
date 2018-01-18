from django.conf.urls import url
from chat import views

app_name = 'chat'

urlpatterns = [
    url(r'^$', views.show_messages, name='show_messages'),
]


# urlpatterns = [
#     url(r'^$', views.index, name='index'),
#     url(r'^product_filter/(?P<category_id>[0-9]+)/$', views.product_filter, name='product_filter'),
#     url(r'^product_filter/(?P<category_id>[0-9]+)/(?P<page_number>[0-9]+)/$', views.product_filter, name='product_filter'),
#     url(r'^product_page/(?P<product_id>[0-9]+)/$', views.product_page, name='product_page'),
#     url(r'^ajax/get_price/$', views.get_price, name='get_price'),
# ]


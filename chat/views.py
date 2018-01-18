from django.shortcuts import render
from chat.models import *


def show_unread_messages(request):
    unread_messages = MessageFromSpace.objects.filter(has_been_read=False)
    template = 'chat/show_unread_messages.html'
    context = {'unread_messages': unread_messages}
    return render(request, template, context)


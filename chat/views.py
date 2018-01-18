from django.shortcuts import render
from chat.models import *


def show_messages(request):
    messages = MessageFromSpace.objects.filter(has_been_read=False)
    template = 'chat/show_messages.html'
    context = {'messages': messages}
    return render(request, template, context)

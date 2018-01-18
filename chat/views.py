from django.shortcuts import render
from chat.models import *


def show_new_messages(request):
    new_messages = MessageFromSpace.objects.filter(has_been_read=False)
    template = 'chat/show_new_messages.html'
    context = {'new_messages': new_messages}
    return render(request, template, context)
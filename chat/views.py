from django.shortcuts import render
from chat.models import *


def show_messages(request):
    messages = MessageFromSpace.objects.all()
    template = 'chat/show_messages.html'
    context = {'messages': messages}
    return render(request, template, context)

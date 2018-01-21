from django.shortcuts import render
from chat.models import *
from django.http import JsonResponse
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist


def show_unread_messages(request):
    template = 'chat/show_unread_messages.html'
    return render(request, template)


def get_new_messages(request):
    try:
        last_message_id = int(request.GET['last_id'])
    except (KeyError, ValueError):
        pass
    else:
        new_messages = MessageFromSpace.get_new_messages(last_message_id)
        return JsonResponse(list(new_messages.values('id', 'text', 'date')), safe=False)
    raise Http404


def mark_read(request):
    try:
        message_id = int(request.GET['message_id'])
    except (KeyError, ValueError):
        pass
    else:
        try:
            message = MessageFromSpace.objects.get(pk=message_id)
        except ObjectDoesNotExist:
            pass
        else:
            message.has_been_read = True
            message.save()

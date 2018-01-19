from django.shortcuts import render
from chat.models import *
from django.core import serializers
from django.http import JsonResponse
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse


def show_unread_messages(request):
    unread_messages = MessageFromSpace.objects.filter(has_been_read=False)
    template = 'chat/show_unread_messages.html'
    context = {'unread_messages': unread_messages}
    print(serializers.serialize('json', unread_messages))
    return render(request, template, context)


def get_new_messages(request):
    try:
        last_message_id = int(request.GET['last_id'])
    except Exception:  # TODO point exceptions
        pass
    else:
        new_messages = MessageFromSpace.get_new_messages(last_message_id)
        if new_messages.exists():  #TODO empty messages should be returned, not 404
            return HttpResponse(serializers.serialize('json', new_messages), content_type='text/json')  #TODO pass list of dicts data
    raise Http404


def mark_read(request):
    try:
        message_id = int(request.GET['message_id'])
    except Exception:
        pass
    else:
        try:
            message = MessageFromSpace.objects.get(pk=message_id)
        except ObjectDoesNotExist:
            pass
        else:
            message.has_been_read = True
            message.save()

from django.shortcuts import render
from chat.models import MessageFromSpace
from django.http import JsonResponse, Http404
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime


def show_unread_messages(request):
    template = 'chat/show_unread_messages.html'
    return render(request, template)


def get_new_messages(request):
    try:
        last_message_id = int(request.GET['last_id'])
    except (KeyError, ValueError):
        raise Http404('invalid parameter or empty')
    else:
        new_messages = MessageFromSpace.get_new_messages(last_message_id)
        new_messages_data = list(new_messages.values('id', 'text', 'date'))
        unix_date = datetime(1970, 1, 1)
        for new_message_data in new_messages_data:
            our_date = new_message_data['date'].replace(tzinfo=None)
            new_message_data['date'] = int((our_date-unix_date).total_seconds())
        return JsonResponse(new_messages_data, safe=False)


def mark_message_read(request):
    try:
        message_id = int(request.GET['message_id'])
    except (KeyError, ValueError):
        raise Http404('invalid parameter or empty')
    else:
        try:
            message = MessageFromSpace.objects.get(pk=message_id)
        except ObjectDoesNotExist:
            raise Http404('No messages with id > %s' % message_id)
        else:
            message.has_been_read = True
            message.save()
            return JsonResponse({'request': 'success'})

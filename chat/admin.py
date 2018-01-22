from django.contrib import admin
from chat.models import MessageFromSpace


class MessageFromSpaceAdmin(admin.ModelAdmin):
    fields = ['date', 'text', 'has_been_read']
    readonly_fields = ['date']


admin.site.register(MessageFromSpace, MessageFromSpaceAdmin)
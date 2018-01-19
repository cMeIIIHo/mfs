from django.db import models


class MessageFromSpace(models.Model):

    class Meta:
        ordering = ['-date']

    date = models.DateTimeField(auto_now_add=True, verbose_name='Дата')
    text = models.TextField(verbose_name='Текст')
    has_been_read = models.BooleanField(default=False)

    def __str__(self):
        return '%s, %s' % (self.text, self.has_been_read)

    @classmethod
    def get_new_messages(cls, last_id):
        return MessageFromSpace.objects.filter(pk__gt=last_id, has_been_read=False)
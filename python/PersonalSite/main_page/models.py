from django.db import models
import re

# Create your models here.
# EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
NAME_REGEX = re.compile(r'^[a-zA-Z ]+$')


class ContactManager(models.Manager):
    def validator(self, postData):
        errors = {}
        if len(postData['Name']) < 3:
            errors['Name'] = 'Name must be atleast 3 characters long'
        if not NAME_REGEX.match(postData['Name']):
            errors['Name'] = 'Name must be comprised of letters only.'
        if len(postData['Email']) < 7:
            errors['Email'] = 'Email must be atleast 7 characters and in the format of: something@something.something'
        if len(postData['Company']) < 3:
            errors['Company'] = 'Company must be atleast 3 characters long'
        return errors

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    company = models.CharField(max_length=100)
    message = models.TextField(max_length=1000)

    objects = ContactManager()

    def __repr__(self):
        return 'name: {}, email: {}, company: {}, message: {}'.format(self.name, self.email, self.company, self.message)
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class RegistrationForm(UserCreationForm):
    username = forms.CharField(label='Имя пользователя',
                               widget=forms.TextInput(attrs={
                                   'placeholder': 'Имя пользователя',
                                   'class': 'tr__username',
                                   'id': 'username'
                               }))
    email = forms.CharField(label='Email',
                            widget=forms.EmailInput(attrs={
                                'placeholder': 'Email',
                                'class': 'tr__email',
                                'id': 'email'
                            }))
    password1 = forms.CharField(label='Пароль',
                                widget=forms.PasswordInput(attrs={
                                    'placeholder': 'Пароль',
                                    'class': 'tr__password1',
                                    'id': 'password1'
                                }))
    password2 = forms.CharField(label='Подтвердение пароля',
                                widget=forms.PasswordInput(attrs={
                                    'placeholder': 'Подтвердите пароль',
                                    'class': 'tr__password2',
                                    'id': 'password2'
                                }))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')
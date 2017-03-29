from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^message/', views.messages, name='message'),
    url(r'^about/', views.about, name='about_us'),
    url(r'^match/', views.match, name='matches'),
    url(r'^profile/', views.profile, name='my_profile'),
    url(r'^user/', views.user, name=('user_profile')),
]
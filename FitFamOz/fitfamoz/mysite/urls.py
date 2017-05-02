from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^message/$', views.messages, name='message'),
    url(r'^about/$', views.about, name='about_us'),
    url(r'^match/$', views.match, name='matches'),
    url(r'^friends/$', views.friends, name='friends'),
    url(r'^profile/$', views.profile, name='my_profile'),
    url(r'^user/$', views.user, name='user_profile'),
    url(r'^signup/$', views.signup1, name='signup1'),
    url(r'^signupcont/$', views.signup2, name='signup2'),
    url(r'^login/$', views.login, name='login'),
]

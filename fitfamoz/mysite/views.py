from django.shortcuts import render_to_response
# Create your views here.


def index(request):
    return render_to_response("index.html")

def messages(request):
    return render_to_response("messages.html")

def about(request):
    return render_to_response("about-us.html")

def match(request):
    return render_to_response("matches.html")

def friends(request):
    return render_to_response("friends.html")

def profile(request):
    return render_to_response("my-profile.html")

def user(request):
    return render_to_response("user-profile.html")

def signup1(request):
    return render_to_response("signup1.html")

def signup2(request):
    return render_to_response("signup2.html")

def login(request):
    return render_to_response("login.html")

from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='pages/home.html'), name='home'),
    path('cyberpunk/', TemplateView.as_view(template_name='pages/cyberpunk.html'), name='cyberpunk'),
    path('factions/', TemplateView.as_view(template_name='pages/factions.html'), name='factions'),
]
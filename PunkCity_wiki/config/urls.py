from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='pages/home.html'), name='home'),
    
    # Updated paths below:
    path('basics/whats-punk-city/', TemplateView.as_view(template_name='pages/basics/whatspunkcity.html'), name='whatspunkcity'),
    path('basics/vanilla-vs-punk-city/', TemplateView.as_view(template_name='pages/basics/vanillavspunkcity.html'), name='vanillavspunkcity'),
    
    path('factions/', TemplateView.as_view(template_name='pages/factions.html'), name='factions'),
]
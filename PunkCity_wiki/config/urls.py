from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='pages/home.html'), name='home'),
    
    # Updated paths below:
    path('basics/whats-punkcity/', TemplateView.as_view(template_name='pages/basics/whatspunkcity.html'), name='whatspunkcity'),
    path('basics/vanilla-vs-punkcity/', TemplateView.as_view(template_name='pages/basics/vanillavspunkcity.html'), name='vanillavspunkcity'),
    path('basics/get-started/', TemplateView.as_view(template_name='pages/basics/getstarted.html'), name='getstarted'),

    path('survival/resource-scarcity/', TemplateView.as_view(template_name='pages/survival/resourcescarcity.html'), name='resourcescarcity'),

    path('combat/ai-changes/', TemplateView.as_view(template_name='pages/combat/aichanges.html'), name='aichanges'),
    path('combat/damage-changes/', TemplateView.as_view(template_name='pages/combat/damagechanges.html'), name='damagechanges'),
    path('combat/weapons-cyberware/', TemplateView.as_view(template_name='pages/combat/weaponscyberware.html'), name='weaponscyberware'),
    
    path('factions/', TemplateView.as_view(template_name='pages/factions.html'), name='factions'),
]
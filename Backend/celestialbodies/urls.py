from django.urls import path
from .views import CelestialBodySearchView, CelestialBodyAutocompleteView

urlpatterns = [
    path('information/', CelestialBodySearchView.as_view()),
    path('search/', CelestialBodyAutocompleteView.as_view()),
]
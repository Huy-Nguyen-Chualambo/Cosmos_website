from django.urls import path
from .views import FavoriteListView, FavoriteToggleView, FavoriteCheckView

urlpatterns = [
    path('favorite', FavoriteListView.as_view()),
    path('favorite/toggle', FavoriteToggleView.as_view()),
    path('favorite/check', FavoriteCheckView.as_view()),
]
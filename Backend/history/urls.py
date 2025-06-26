from django.urls import path
from .views import HistoryListView, RecordViewView

urlpatterns = [
    path('history', HistoryListView.as_view()),
    path('history/record', RecordViewView.as_view()),
]
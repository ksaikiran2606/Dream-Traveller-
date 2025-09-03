

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('buses/', views.BusListCreateView.as_view(), name='bus-list'),
    path('buses/<int:pk>/', views.BusDetailView.as_view(), name='bus-detail'),
    path('booking/', views.BookingView.as_view(), name='booking'),
    path('user/<int:user_id>/bookings/', views.UserBookingView.as_view(), name='user-bookings'),
    path('booking/<int:booking_id>/', views.CancelBooking.as_view(), name='cancel-booking'),
]
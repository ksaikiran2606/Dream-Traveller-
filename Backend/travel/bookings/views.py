
# # authicate, permission, token, status, response, generics, apiviews
# from django.contrib.auth import authenticate
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.authtoken.models import Token
# from rest_framework import status, generics
# from rest_framework.views import APIView
# from .serializers import UserRegisterSerializer, BusSerializer, BookingSerializer
# from rest_framework.response import Response
# from .models import Bus, Seat, Booking

# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserRegisterSerializer(data=request.data)
#         try:
#             if serializer.is_valid():
#                 user = serializer.save()
#                 token, created = Token.objects.get_or_create(user=user)
#                 return Response({'token': token.key}, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(username= username, password=password)

#         if user:
#             token, created = Token.objects.get_or_create(user=user)
#             return Response({
#                 'token':token.key,
#                 'user_id': user.id
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error':'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# class BusListCreateView(generics.ListCreateAPIView):
#     queryset = Bus.objects.all()
#     serializer_class = BusSerializer

# class BusDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Bus.objects.all()
#     serializer_class = BusSerializer

# class BookingView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         seat_id = request.data.get('seat')
#         if not seat_id:
#             return Response({"error": "Seat ID is required"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             seat = Seat.objects.get(id=seat_id)
#         except Seat.DoesNotExist:
#             return Response({"error": "Invalid Seat ID"}, status=status.HTTP_400_BAD_REQUEST)

#         if seat.is_booked:
#             return Response({"error": "Seat already booked"}, status=status.HTTP_400_BAD_REQUEST)

#         seat.is_booked = True
#         seat.save()

#         booking = Booking.objects.create(
#             user=request.user,
#             bus=seat.bus,
#             seat=seat
#         )
#         serializer = BookingSerializer(booking)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

        
# class UserBookingView(APIView):
#     permission_classes= [IsAuthenticated]

#     def get(self, request, user_id):
#         if request.user.id != user_id:
#             return Response({'error':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
#         bookings = Booking.objects.filter(user_id= user_id)
#         serializer = BookingSerializer(bookings, many=True)
#         return Response(serializer.data) 




# authicate, permission, token, status, response, generics, apiviews
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status, generics
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer, BusSerializer, BookingSerializer
from rest_framework.response import Response
from .models import Bus, Seat, Booking

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        try:
            if serializer.is_valid():
                user = serializer.save()
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username= username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token':token.key,
                'user_id': user.id
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error':'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class BusListCreateView(generics.ListCreateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer

class BusDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer

class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seat_id = request.data.get('seat')
        if not seat_id:
            return Response({"error": "Seat ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            seat = Seat.objects.get(id=seat_id)
        except Seat.DoesNotExist:
            return Response({"error": "Invalid Seat ID"}, status=status.HTTP_400_BAD_REQUEST)

        if seat.is_booked:
            return Response({"error": "Seat already booked"}, status=status.HTTP_400_BAD_REQUEST)

        seat.is_booked = True
        seat.save()

        booking = Booking.objects.create(
            user=request.user,
            bus=seat.bus,
            seat=seat,
            status='confirmed'  # Explicitly set status
        )
        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({'error':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
        bookings = Booking.objects.filter(user_id=user_id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

    def delete(self, request, user_id):
        if request.user.id != user_id:
            return Response({'error':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
        booking_id = request.data.get('booking_id')
        if not booking_id:
            return Response({"error": "Booking ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            booking = Booking.objects.get(id=booking_id, user_id=user_id)
            
            # Free up the seat
            seat = booking.seat
            seat.is_booked = False
            seat.save()
            
            # Update booking status to cancelled
            booking.status = 'cancelled'
            booking.save()
            
            serializer = BookingSerializer(booking)
            return Response({"message": "Booking cancelled successfully", "booking": serializer.data}, status=status.HTTP_200_OK)
            
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Add CancelBooking class view
# Add CancelBooking class view
class CancelBooking(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, booking_id):
        try:
            # Get the booking that belongs to the current user
            booking = Booking.objects.get(id=booking_id, user=request.user)
            
            # Free up the seat
            seat = booking.seat
            seat.is_booked = False
            seat.save()
            
            # Update booking status to cancelled
            booking.status = 'cancelled'
            booking.save()
            
            # Return the updated booking
            serializer = BookingSerializer(booking)
            response_data = serializer.data
            response_data['message'] = "Booking cancelled successfully"
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
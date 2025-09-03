
from rest_framework import serializers
from .models import Bus, Seat, Booking
from django.contrib.auth.models import User

# class UserRegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only = True)

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']

#     def create(self, validate_date):
#         user = User.objects.create_user(
#             username = validate_date['username'],
#             email = validate_date['email'],
#             password= validate_date['password']
#         )
#         return user



from rest_framework import serializers
from .models import Bus, Seat, Booking
from django.contrib.auth.models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id','seat_number', 'is_booked']

class BusSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)
    class Meta:
        model = Bus
        fields = '__all__'

class BusSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ['bus_name', 'number', 'origin', 'destination']
        
# Remove the duplicate BookingSerializer and keep only this one
class BookingSerializer(serializers.ModelSerializer):
    bus = BusSummarySerializer(read_only=True)
    seat = SeatSerializer(read_only=True)
    user = serializers.StringRelatedField()
    
    # Add these properties to include the computed fields
    price = serializers.SerializerMethodField()
    origin = serializers.SerializerMethodField()
    destination = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['id', 'user', 'bus', 'seat', 'booking_time', 'status', 'price', 'origin', 'destination']
        read_only_fields = ['user', 'booking_time', 'bus', 'seat', 'price', 'origin', 'destination']

    # Add methods to get the computed fields
    def get_price(self, obj):
        return obj.price

    def get_origin(self, obj):
        return obj.origin

    def get_destination(self, obj):
        return obj.destination
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
import time
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        subject = 'Chào mừng đến với Các Vì Tinh Tú!'
        message = f'Xin chào {user.name},\n\nCảm ơn bạn đã đăng ký tài khoản trên Các Vì Tinh Tú. Tài khoản của bạn đã được tạo thành công.\n\nChúc bạn có những trải nghiệm tuyệt vời!\n\nTrân trọng,\nĐội ngũ Các Vì Tinh Tú - Thành viên của Fakecombank!'
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        
        return Response(serializer.data, status=201)
    
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.now() + datetime.timedelta(days=1),
            'iat': datetime.datetime.now()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        
        response.set_cookie(key='jwt', value=token, httponly=True)
        
        response.data = {
            'jwt': token,
        }
        
        # Gửi email thông báo đăng nhập thành công
        login_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        subject = 'Đăng nhập thành công'
        message = f'Xin chào {user.name},\n\nTài khoản của bạn vừa được đăng nhập thành công vào lúc {login_time}.\n\nNếu không phải bạn thực hiện hành động này, vui lòng thay đổi mật khẩu ngay lập tức.\n\nTrân trọng,\nĐội ngũ Các Vì Tinh Tú - Thành viên của Fakecombank!'
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'], options={"verify_iat": False})
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        
        serializer = UserSerializer(user)
                        
        return Response(serializer.data)
    
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
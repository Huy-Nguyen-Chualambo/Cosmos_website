# Các Vì Tinh Tú

## Cài đặt môi trường

### Tạo môi trường ảo

#### Windows

```bash
# Cài đặt virtualenv nếu chưa có
pip install virtualenv

# Tạo môi trường ảo
python -m virtualenv venv

# Kích hoạt môi trường ảo
venv\Scripts\activate
```

#### macOS và Linux

```bash
# Cài đặt virtualenv nếu chưa có
pip install virtualenv

# Tạo môi trường ảo
python -m virtualenv venv

# Kích hoạt môi trường ảo
source venv/bin/activate
```

### Cài đặt các gói phụ thuộc

Sau khi kích hoạt môi trường ảo, cài đặt các gói phụ thuộc từ file requirements.txt:

```bash
pip install -r requirements.txt
```

## Cấu hình

### Cấu hình cơ sở dữ liệu

Mở file `settings.py` và thay đổi cấu hình cơ sở dữ liệu như sau:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'cosmos',  # Tên database
        'USER': 'hung',    # Tên người dùng
        'PASSWORD': '',    # Mật khẩu PostgreSQL
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Cấu hình email

Trong file `settings.py`, thay đổi cấu hình email như sau:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = '@gmail.com'  # Thêm địa chỉ email của bạn
EMAIL_HOST_PASSWORD = ''        # Thêm mật khẩu ứng dụng từ Google
DEFAULT_FROM_EMAIL = 'Fakecombank CEO <fakecombank.ceo.hungnguyen@gmail.com>'
```

**Lưu ý:** Để sử dụng Gmail làm SMTP server, bạn cần tạo "Mật khẩu ứng dụng" trong tài khoản Google của mình:

1. Đi tới trang quản lý tài khoản Google
2. Chọn "Bảo mật"
3. Bật xác thực hai yếu tố (nếu chưa bật)
4. Tạo mật khẩu ứng dụng và sử dụng mật khẩu này cho `EMAIL_HOST_PASSWORD`

## Chạy ứng dụng

Sau khi hoàn tất cài đặt và cấu hình, chạy ứng dụng:

```bash
python manage.py makemigrations
python manage.py migrate  # Tạo/cập nhật cấu trúc database
python manage.py runserver  # Khởi động server
```

Truy cập ứng dụng tại: http://localhost:8000/

API testing: Lười viết quá, tự mò đi! Dùng Postman

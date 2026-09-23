# Error boundaries

- đi sơ
- cop code

## Lý do dùng

- Khi React chạy và văng lỗi (crash / khi chạy qua trang khác )

## Công dụng

- Khi dev làm trang này nhưng lại đụng trang khác và lỗi luôn trang đó -> user vào thấy trang k load đc
  => Fix = Error boundary (giúp thông báo lỗi 'Có lỗi xảy ra, vui lòng liên hệ ... ' cho user thấy thay vì trang trống)
- ~ catch error r báo cho user

## Đặc điểm
- là class component. Khi set state thì cần bảo lưu state cũ
- state thay đổi k render cả class như function component mà chỉ hàm render thay đổi
# Persist fix

- persist cực kỳ hữu ích. nên hiểu và áp dụng (state đang ntn, F5 giữ nguyên toàn bộ). Như khi lưu config setting, lưu form đang nhập dở...

## Fix lỗi gọi product api 2 lần & persist 'me' data

- add authSlice vào blacklist
- thêm authPersistConfig, đưa fetching vào blacklist (để k bắn 2 lần)
- để hiện lun thông tin 'me' luôn thay vì nhấp nháy nút log in r hiện
- PrivateRoute persist fetching lun true để return loading lần đầu chứ k để chưa có dữ liệu r gọi API

## Mã hóa dữ liệu lưu localStorage = persist encrypt

- npm i redux-persist-transform-encrypt
- dùng thêm btoa trick lỏ. Cách chính bên BE yêu cầu trình duyệt lưu dạng httpOnlyCookie - k set/get đc = JS (tránh XSS).
- Còn cái gì dính đến tiền mới áp dụng thêm (k tự mã hóa chính mình)

# Infinite Scroll Component

npm i react-infinite-scroll-component

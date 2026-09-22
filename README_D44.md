# Refresh token

- lú, nhưng k cần code lại -> học cách tích hợp, cấu hình đc để copy paste là ok
- https://apim.docs.wso2.com/en/latest/assets/img/learn/oauth-refresh-token-diagram.png

Gồm:
FE:

- client application
  BE:
- authorization server: BE để phân quyền...
- resource server: vào database để lấy dữ liệu

Các trang đc bảo vệ (protected / private) BE check đúng quyền -> cấp token mới vào đc
Luồng: vào tài nguyên đc bảo vệ -> server check chưa đăng nhập - k đc phép truy cập, trả về 401 unauthorized -> nav qua trang login ->

==> bước AUTHENTICATION
nhập thông tin + click đăng nhập -> bắn api login kèm thông tin đăng nhập -> user nhận về response chứa access token để truy cập

1. Truy cập tài nguyên đc bảo vệ (Vd: thông tin người dùng đang đăng nhập)
   -> Vd: Gọi API /auth/me (without JWT) => 401

2. Authentication (xác thực người dùng):

- Gửi đi thông tin đăng nhập (Credentials)
- Nhận token (lưu vào client)

3. Truy cập tài nguyên đc bảo vệ (Vd: thông tin người dùng đang đăng nhập)
   => Vd: Gọi API /auth/me + JWT => 200
   => BE: check JWT có hợp lệ hay k (AUTHORIZATION - check quyền truy cập tài nguyên)
    - JWT hợp lệ: 200 + data
    - JWT k hợp lệ: 401

## Flow

1. User authentication request: client gửi api request login + credentials
2. Access token and Refresh token: server check đúng và gửi token login và refresh token về
3. Access token: client request truy cập tài nguyên đến server
4. Protected resource: nếu token của client hợp lệ thì server gửi về tài nguyên đc bảo vệ
5. Access token: thời gian trôi và token hết hạn. khi client tiếp tục gọi API đến server để truy cập protected resource
6. Invalid token error: server bắn về lỗi vì token đã hết hạn (nếu k có refresh token thì sẽ bị văng ra trang log in - để bảo mật như app ngân hàng. còn như fb, các trang bán hàng thì cần ưu tiên UX -> dùng refresh token)
7. Refresh token: Khi nhận lỗi invalid thì k vội đá user ra lại trang login mà âm thầm gửi request với refresh token lên server
8. Access token and Refresh token: nếu check refresh token hợp lệ thì trả về Access token và Refresh token mới.
9. Client dùng access token mới để request và tiếp tục truy cập vào protected resource

access token ngắn (1h...)
refresh token dài hơn (1 tuần, 1 tháng, k thời hạn...) tùy vào tần suất người dùng quay lại trang

cần lưu refresh token ở nơi an toàn vì khi lộ hacker refresh liên tục và khai thác vĩnh viễn (Khi học BE sẽ lưu ở HttpOnly cookie giúp JS từ FE k thể truy cập vào đc, chỉ có thể gọi Http ở BE - bảo vệ ở mức độ cao nhất)

## Implement

- dùng Interceptor để bắt trc khi lỗi invalid token trả về (nếu chờ lỗi trả về thì user đã bị đá sang login r)
- interceptor.response
- \_retry: chỉ cho api lỗi gọi lại 1 lần lấy refresh token, nếu lỗi tiếp thì reject, tránh gọi vô hạn.

10 api cùng lỗi thì chỉ gọi 1 refresh token thg đầu tiên. Thg đầu tiên sẽ set \_retry = true. Còn lại sẽ k gọi nữa

- isRefreshing: trong lúc thg refresh đầu tiên đang gọi (vd mất 5s) thì các request refresh k gọi nữa (tránh api lỗi lệch time -> gọi refresh nhiều time khác nhau)

- interceptor bắt 401 -> thực hiện refresh api đầu tiên, những api sau fail sẽ push vào failedQueue để gọi lại sau khi có refresh token. Khi refresh token gọi thành công "1 lần" thì tất cả api failed đều đc gọi lại (resolve), nếu có lỗi (refresh token hết hạn) mới reject

# Form validation with Yup

npm i yup @hookform/resolvers

## Lý do dùng

- Mỗi trường có nhiều rule, nhưng các rule lại trùng ở nhiều trường khác nhau -> lặp code. Có thể tách ra thành obj r truyền vào nhưng cx cần truyền vào rất nhiều nơi
  => Cách hay hơn: tích hợp validate = thư viện ngoài. Cung cấp 1 format obj dạng schema (lược đồ) gồm nhiều trường validate trong obj đó -> cầm obj đó đưa vào form

### Synchro checking password

- useEffect giúp gõ xong, render xong giao diện r mới kiểm tra thay vì kiểm tra và thực hiện logic trước khi render như dùng onChange, dễ gây block giao diện.

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

---

# Code splitting

## Lý do dùng

- Có thể deploy lên production nếu chỉ với thư mục dist k?
  Có, vì FE chỉ là các file tĩnh. Cần npm run dev để chạy 1 server NodeJS ở local là chạy đc

- Khi deploy thực tế trên VPS để deploy 1 website tĩnh thì chỉ cần dùng nginx

- Tất cả các file đc import (tới main để sử dụng) có nằm hết trong file .js ở dist k? Có

- Nếu web lớn có tới hàng trăm các router khác nhau rất phức tạp -> file JS nặng nhiều MB
- Cơ chế website React là single web application. Cách để render: trả về 1 file html nhỏ có root rỗng -> tải file JS về, thực thi xong ra giao diện r mới đưa vào trong root rỗng -> Nếu file JS duy nhất nặng thì thời gian render ra giao diện khi user truy cập sẽ lâu

=> Code splitting giúp cta quyết định 1 số trang, component,... k đc đưa vào file JS chính mà đc tách thành các file JS nhỏ. Khi user truy cập vào nơi thực sự cần sử dụng thì file JS nhỏ đó mới đc tải vào
=> Giúp file JS ban đầu tải nhẹ hơn vì k cần tải những file k dùng

### Code splitting vs lazy load

- Code splitting: chia nhỏ code, khi user đến trang / component cần dùng thì mới tải trang đó
- Lazy load: đến nơi dùng nó mới đc tải
- Nhưng lại đi cùng nhau. Vì chia nhỏ mà tải luôn 1 lần thì đâu ý nghĩa
- Còn lazy load trong 1 trang thì vite cấu hình tự động sinh ra
- Load more (Button click -> load)
- Infinity load (Scroll bottom -> load)

## Cách dùng

- K lạm dụng
- Page nào liên quan đến tải đầu thì k nên dùng code splitting, lazy load nó (trang chủ / trang chi tiết sản phẩm đc click trực tiếp từ GG)
- Nếu page / component đó có vài KB thì có nên tách k

=> Tách page nặng (50Kb trở lên) + k cần hiển thị ngay

## Lưu ý

- Khi dùng lazy load + Error Boundaries sẽ lỗi
- Cần dùng Suspense: khi import bất đồng bộ (lazy) - trả về 1 Promise ở pending, khi user vào thì mới result
- Khi mạng lag thì page lazy sẽ load lâu, khi click vào sẽ k có UI -> cần set loading. Nhưng state k dùng ở route
  => Dùng Suspense

## Suspense

- Bọc page đc tách ra. Khi đang tải giúp hiện loading chứ k trắng trang
- Cách dùng: Bọc App với Suspense kèm fallback chứa component Loading

---

# Lỗi đệ quy refresh token

- dùng cùng instant gọi interceptors. Khi refresh token lỗi lại gọi Interceptors -> tách ra khỏi instant, thay bằng Axios

---

# React portal

- đứng ở A mở cửa ra là ở nơi B
- https://react.dev/reference/react-dom/createPortal

## Lý do dùng

- nếu child dùng fixed mà ở parent dùng transform thì sẽ gây lỗi fixed
- child nổi bọt ra parent (child click parent nghe)

## Giúp

- vs modal, dialog: render ra sau root, trong body. K bị ảnh hưởng bởi transform

---

# useReducer

- ít dùng
- khác vs redux: useReducer dùng lun initValue chứ k gọi reducer lần đầu để set initValue.
- case default của reducer trong useReducer có thể ném lỗi nhưng trong redux thì return state - initValue
- ~ 1 custom hook của useState: dữ liệu trả ra đc dùng để setState -> re-render

## Dùng

- dùng cho trường hợp nhiều state. Vì trong code dự án có rất nhiều state -> có rất nhiều dòng code chứa useState nhưng k giấu đi đc - custom hook chỉ cho việc tái sử dụng logic
  => useReducer tách reducer và các state ra file riêng

## Thực tế

- khá ít dùng, ứng dụng đc thì dùng
- vì thực tế trong 1 component ai đi để nhiều state như vậy (10-20 state) -> phân chia hợp lý trong component thay vì nhét nhiều state r đi dùng useReducer
  -> dùng RTK

- dự án 80-90% dùng RTK / Zustand (ngắn, thiết kế gần con người hơn, k cần đào sâu)

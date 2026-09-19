# RTK query

## RTK query vs createAsyncThunk

- chỉ tìm hiểu sơ bộ
- những dự án custom, đặc thù phức tạp khi làm việc vs bất đồng bộ -> thường dùng createAsyncThunk (dễ custom khi gọi API và kiểm soát dispatch với payload là gì / xử lý logic trc khi return về)
- RTK query dùng tiện, viết ngắn vì nó làm sẵn rất nhiều thứ -> khó custom
- Có sẵn: caching (chưa tới 30s thì k gọi lại API / khi sang tab mới về lại, nếu API có update thì tự fetch lại)

=> Khi làm dự án cần đồng nhất thì đa số chọn createAsyncThunk vì tùy chỉnh đc nhiều trường hợp hơn (nếu kết hợp thì khó quản lý)
=> Khi làm dự án mới mà mik làm FE lẫn BE, chuẩn hóa api thì mới nên dùng rtk query

## Tổng quan

- Công cụ truy xuất và lưu trữ dữ liệu
- Giúp đơn giản hóa các trường hợp phổ biến khi tải dữ liệu

## Gồm các API:

- createApi(): cốt lõi
- fetchBaseQuery(): có fetch riêng tích hợp sẵn. (K kế thừa từ axios)
- setupListeners(): lắng nghe hành vi như mount, reconnect...

## Đặc tính

- tự tạo reducer, action
- khi import createApi từ @reduxjs/toolkit/query/react sẽ hỗ trợ từ sinh hook useGetProvincesQuery... (trả kèm trạng thái Api: pending, fulfilled,..)
- tự quy ước reducerPath: nếu dùng RTK query thì tên kết thúc bằng Api (addressApi)

- keepUnusedDataFor: mặc định là 60s

# Authentication

- Data current user cần dùng ở mọi nơi -> cần fetch ở App

- createApi:

* bị lặp baseUrl
* khi cần đính header chung, vd: đính token. -> cần cấu hình nhiều nơi => cần tạo ra base ~ instance của axios

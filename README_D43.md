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

# Redux persist

- npm i redux-persist

## Lý do dùng

- data user cần lấy để hiện thị ở nhiều nơi nhưng khi refresh thì bị refetch -> cần cache lại
- nên dùng vs createAsyncThunk

## Đặc điểm

- chọn dữ liệu sau khi store dispatch, tạo ra state mới sẽ tự động lưu (có hỗ trợ mã hóa)
- giúp lưu dữ liệu redux từ store vào local storage. Khi refresh thì lấy data từ local storage nạp vào store lại
  => có thể lưu dữ liệu (token) vào global state

- Bình thường khi F5 sẽ xóa toàn bộ state và khởi tạo lại từ đầu với initState
- Khi có persist: nạp data từ local storage -> nhanh, k nhấp nháy khi refresh

- cần thì mới dùng (lưu setting, theme...)

- nhược điểm: persist giữ lại trạng thái, rtk query thấy có trạng thái r nên k tải lại -> loading ở mãi true và k hiện data đc => Nên dùng với createAsyncThunk

## Persist + createAsyncThunk

- Khi cần đính token và header của axios = axios interceptor: xử lý trc khi request đc gửi đi / trc khi dữ liệu đó đc trả về
  => Cache data ở UI + fetch API lại
  => Giúp khi hết phiên đăng nhập -> báo lỗi -> gỡ token để k persist nữa

## Xử lý token

- đếm hạn cookie, r xóa token 1 cách thủ cách đều k phải cách chuẩn
- cách chuẩn nhất là gọi lại API và trả về lỗi -> set lại
- khi đăng xuất: localStorage.clear()

## Refresh token:

- khi rơi vào 401 (hết hạn) thay vì đăng xuất thì gọi API để refresh token để nhận về token mới -> gọi lại API bị lỗi -> UI vẫn hiện thông tin người dùng
  => giúp người dùng bth k bị đăng xuất
- k để access token lâu vì giảm bảo mật (lộ, dùng tool,...). Khi hạn token càng lâu thì người lấy đc càng khai thác đc lâu

# Private route

- Phải đăng nhập ms vào đc
- Phân quyền là của BE. FE dùng để check quyền có làm đc k để ẩn hiện

## Redux hook form vs formik

- formik dùng context api
- Redux hook form dùng custom hook -> performance tối ưu hơn

## Redux hook form

- npm i react-hook-form

## Luồng login

- register -> login -> Home -> logout


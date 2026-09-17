# Redux toolkit

- npm i @reduxjs/toolkit

## Flow

- tạo slice trong features

## Lý do dùng

- Dự án mới sẽ dùng RTK, đỡ phức tạp hơn cách chia store hiện tại
- chia theo namespace

- flow redux:

* constants: định nghĩa action types
* actions: thực hiện hành động và return về 1 plain obj (type & payload) hoặc 1 async function với thunk middleware (nhưng vẫn có dispatch 1 action nào đó) -> Reducer

- reducer: nhận state hiện tại (init) và action -> xử lý action và trả về 1 state mới. Listener đã subscribe bik thời điểm state đc update -> re-render UI

=> Cần tạo nhiều file để dễ quản lý nhưng cần tạo lại quá nhiều file
=> React toolkit đc tạo ra để tổ chức thông minh hơn (vs quy trình như cũ)

## Hàm

- configureStore(): đơn giản hóa khi tạo store, bọc createStore (có redux-thunk)
- createReducer(): giúp tạo reducer 1 cách đơn giản, sử dụng thư viện immer (chỉ cần gán = sẽ tạo obj mới) -> k cần ...state, k cần return
- createAction(): giúp tạo reducer
- createSlice(): giúp viết reducer và xử lý logic reducer
- combineSlices(): ~ combineReducers giúp tích hợp nhiều reducer con
- createAsyncThunk: dùng để gọi API

### RTK query

- giúp gọi API = createApi k cần dùng axios (nhưng hơi khó tùy biến)

### createSlice

- slice: giúp chia nhỏ state
- tạo thư mục features để quản lý các slice

- gồm:

* name là NAMESPACE
* initialState
* reducers: có key là type. Nhận state hiện tại và trả ra state mới
* tạo sẵn actions

- cần export:

* các actions để đứng nơi khác có thể dispatch
* default là reducer để import vào root reducer trong store

### createAsyncThunk

- đặt trong services để gọi API

    Cần:

- action type: 'users/fetchByIdStatus'
- 1 hàm async (bất đồng bộ) return về kết quả và trở thành action payload

Action type tự viết nên reducer k tự switch case đc -> cần tạo extraReducer vs hàm addCase(fetchByIdStatus.fulfilled, func...) - bắt lúc API hoàn thành thì thực hiện hàm ...

---

# Làm việc vs file tĩnh

1. Bỏ trong public

- có thể truy cập trực tiếp /img/Sc1.png
- nhược điểm: hardcode đường dẫn
- ưu: giữ nguyên tên ảnh khi open img in new tab. Vì khi build production thì folder trong public sẽ nằm thẳng ở dist

2. Đưa vào asset trong src

- đặt tên thư mục rõ ràng (images chứ k img)
- ưu: dùng bằng biến nên k hardcode
- nhược:

* khi build production: tên img thay đổi & đường dẫn đổi (k còn là /src/assets/images/av.jpg mà là /assets/av-random.jpg) -> cần đặt và dùng biến
* import dài (đb khi dùng nhiều nơi), k gợi ý

=> Tạo file index: đối vs icon, ảnh dùng nhiều nơi, còn dùng 1 lần thì dùng trực tiếp

# Font awesome

- @fortawesome/react-fontawesome: giúp dễ dùng fontawesome trong react bằng cách tạo ra component. component đó có thể nhận các biến (@fortawesome/free-brands-svg-icons) để lấy ra core để hiển thị

- trong thẻ svg có path gồm thuộc tính:
+ d: đc vẽ từ công thức toán học (vector)
+ fill: để set màu. mặc định là currentColor: giống màu vs thẻ cha. Chiều cao = 1 em = độ cao cha
# Redux toolkit

- npm i @reduxjs/toolkit
## Lý do dùng

- Dự án mới sẽ dùng RTK, đỡ phức tạp hơn cách chia store hiện tại
- chia theo namespace

- flow redux:

* constants: định nghĩa action types
* actions: thực hiện hành động và return về 1 plain obj (type & payload) hoặc 1 async function với thunk middleware (nhưng vẫn có dispatch 1 action nào đó) -> Reducer
+ reducer: nhận state hiện tại (init) và action -> xử lý action và trả về 1 state mới. Listener đã subscribe bik thời điểm state đc update -> re-render UI

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
- tạo thư mục features để quản lý các slide

- gồm:
+ name là NAMESPACE
+ initialState
+ reducers: có key là type. Nhận state hiện tại và trả ra state mới
+ tạo sẵn actions

- cần export:
+ các actions để đứng nơi khác có thể dispatch
+ default là reducer để import vào root reducer trong store
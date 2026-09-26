## Fix lỗi gọi product api 2 lần & persist 'me' data
- add authSlice vào blacklist
- thêm authPersistConfig, đưa fetching vào blacklist (để k bắn 2 lần)
- để hiện lun thông tin 'me' luôn thay vì nhấp nháy nút log in r hiện
- PrivateRoute persist fetching lun true để return loading lần đầu chứ k để chưa có dữ liệu r gọi API
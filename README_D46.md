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

---

# Infinite Scroll Component

npm i react-infinite-scroll-component

Vấn đề: khi danh sách ngắn, chưa lấp đầy màn hình thì k tự động tải đc

---

# SEO trong React

- Search Engine Optimization
- Thực tế: giờ SEO k quan trọng lắm vì giờ search toàn ra kết quả của AI, mà còn đúng nữa. Chắc hiệu quả 1 chút trong khâu bán hàng
- crawler: bot của công cụ tìm kiếm quét IP, danh sách domain để hiện ra các website đang hoạt động -> request vào domain trang -> đọc code HTML (để tìm ra thẻ a, lập ra danh sách các thẻ a như 1 mạng nhện) -> spider: bò trên mạng nhện ấy để thu thập thông tin

## vấn đề:

- khi truy cập curl https://f8.edu.vn/ ~ view page source. Con bot chỉ thấy 1 root rỗng, phân tích xong k hiểu gì cả
- nếu muốn tối ưu SEO thì dự án mới dùng NextJS / dùng Server-side rendering luôn (Server-side rendering tải 1 lần, trả về full thông tin)

## FLow giải quyết

1. Search engine bots -> F8 (React) -> root trống -> K tối ưu SEO
2. Search engine bots -> F8 (React) -> pre-render server (máy chủ trung gian giúp bật 1 trình duyệt, mở F8, chờ render xong) -> trả đủ HTML -> Tối ưu SEO

## Prerender

- npm i prerender
- dùng Headless browser (browser k giao diện) Vd: Headless Chrome
- trả về full ở http://localhost:3000/http://localhost:5173/products
- cần cấu hình để khi bots vào sẽ truy cập prerender server (còn người thật sẽ vào React). Nhưng sẽ chậm hơn bth: do trình duyệt cần bật lên và render. Khi học BE sẽ caching đc -> nhanh
- demo ở D:\Desktop\Workspace\F8_Pro\Fullstack_Pro\ReactJs\D46\prerender-server

const prerender = require("prerender");
const server = prerender({
chromeLocation: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
server.start();

- Run bằng: node index.js

## SEOquake

- giúp tối ưu SEO on page
- robots.txt: hướng dẫn cho bots nên / k truy cập vào đâu
- https://developers.google.com/crawling/docs/robots-txt/create-robots-txt
- https://www.xml-sitemaps.com/

### React helmet

- npm i react-helmet
- Vào mỗi page con tự chuyển title, meta, description tương ứng
- Cần dùng chung vs prerender

---

# Motion

- lib làm Animation
- dùng nơi cần dùng, k lạm dụng
- npm i motion

---

# dangerouslySetInnerHTML + DOMPurify

- ~ innerHtml trong React
- Giúp: đưa chuỗi HTML từ API ra giao diện
- 1 bài viết sẽ đc chuyển về html, dù có về markdown thì sau đó cx về html
- server trả về API dạng chuỗi html
- Nhược điểm: dính XSS như thường
  => Phải dùng chung vs dompurify để bỏ những đoạn html nguy hiểm
- npm i dompurify

---

# Menu tự động

- tạo menu với những heading trong bài post
- 1 biến trùng tên thẻ mà chữ đầu viết hoa thì đó là 1 Component (Vd: Button, Tag,...)

## slugify

- npm i slugify
- giúp chuyển title thành slug trên url
- có id cho heading để trùng vs slug href ở thẻ a để có thể nhảy tới

## Tính năng:

* khi share cho bạn bè thì id đã bị gán trc đó có thể nhảy tới đoạn mik muốn share đc
* khi click vào heading trong bài viết cx cần gán lên url để share
* cuộn đến phần nào thì active phần tương ứng

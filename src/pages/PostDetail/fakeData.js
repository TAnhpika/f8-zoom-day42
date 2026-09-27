const fakeData = `
<h2>Bốn nguyên lý là gì?</h2>
<img src="" onerror="alert('XSS')"/>
<p>OOP có 4 nguyên lý cốt lõi, có thể hình dung như bốn bánh xe giúp một ứng dụng dễ tổ chức và phát triển:</p>
<ol>
	<li>Encapsulation (đóng gói)</li>
	<li>Inheritance (kế thừa)</li>
	<li>Polymorphism (đa hình)</li>
	<li>Abstraction (trừu tượng)</li>
</ol>
<p>Hãy tưởng tượng mình đang xây dựng một ứng dụng quản lý ngân hàng. Ta sẽ dùng ví dụ này để hiểu từng nguyên lý.</p>

<h2>Tại sao cần 4 nguyên lý này?</h2>
<p>Khi không có nguyên lý rõ ràng, code dễ trở thành một mớ logic phụ thuộc lẫn nhau. Mỗi thay đổi nhỏ có thể ảnh hưởng đến nhiều phần khác và làm ứng dụng khó kiểm thử, khó mở rộng.</p>
<p>Bốn nguyên lý OOP giúp chia trách nhiệm, bảo vệ dữ liệu và tạo ra những thành phần có thể tái sử dụng.</p>

<h2>1. Encapsulation (Đóng gói)</h2>
<h3>Encapsulation là gì?</h3>
<p>Encapsulation là gom dữ liệu và các phương thức thao tác với dữ liệu vào cùng một đối tượng, đồng thời kiểm soát cách bên ngoài truy cập trạng thái đó.</p>
<p>Ví dụ, số dư tài khoản là dữ liệu riêng tư. Người dùng không được sửa trực tiếp số dư mà phải gửi tiền hoặc rút tiền qua các phương thức có kiểm tra hợp lệ.</p>
<pre><code>class BankAccount {
	#balance = 0;

	constructor(initialAmount) {
		if (initialAmount &gt; 0) {
			this.#balance = initialAmount;
		}
	}

	deposit(amount) {
		if (amount &gt; 0) {
			this.#balance += amount;
			return true;
		}
		return false;
	}

	withdraw(amount) {
		if (amount &gt; 0 &amp;&amp; amount &lt;= this.#balance) {
			this.#balance -= amount;
			return true;
		}
		return false;
	}

	getBalance() {
		return this.#balance;
	}
}</code></pre>
<p>Thuộc tính <code>#balance</code> là private nên không thể bị thay đổi trực tiếp từ bên ngoài. Mọi thay đổi đều đi qua <code>deposit</code> hoặc <code>withdraw</code>, nơi các điều kiện hợp lệ được kiểm tra.</p>

<h2>2. Inheritance (Kế thừa)</h2>
<h3>Inheritance là gì?</h3>
<p>Kế thừa cho phép một class mới sử dụng và mở rộng hành vi từ một class đã có. Ví dụ, tài khoản tiết kiệm có thể kế thừa các thao tác cơ bản của tài khoản ngân hàng và bổ sung lãi suất.</p>
<pre><code>class SavingsAccount extends BankAccount {
	constructor(initialAmount, interestRate) {
		super(initialAmount);
		this.interestRate = interestRate;
	}

	addInterest() {
		const interest = this.getBalance() * this.interestRate;
		this.deposit(interest);
	}
}</code></pre>

<h2>3. Polymorphism (Đa hình)</h2>
<h3>Polymorphism là gì?</h3>
<p>Đa hình cho phép các đối tượng khác nhau phản hồi cùng một lời gọi theo cách riêng. Chẳng hạn, mỗi loại tài khoản có thể tính phí duy trì khác nhau.</p>
<pre><code>class CheckingAccount extends BankAccount {
	calculateMonthlyFee() {
		return 5;
	}
}

class PremiumAccount extends BankAccount {
	calculateMonthlyFee() {
		return 0;
	}
}

function chargeMonthlyFee(account) {
	account.withdraw(account.calculateMonthlyFee());
}</code></pre>
<p>Hàm <code>chargeMonthlyFee</code> không cần biết cụ thể loại tài khoản nào; mỗi đối tượng tự cung cấp cách tính phí của mình.</p>

<h2>4. Abstraction (Trừu tượng)</h2>
<h3>Abstraction là gì?</h3>
<p>Trừu tượng hóa chỉ đưa ra những thao tác cần thiết và ẩn đi chi tiết triển khai. Người dùng tài khoản chỉ cần gọi <code>deposit</code> hoặc <code>withdraw</code>, không cần biết số dư được lưu hay cập nhật bên trong như thế nào.</p>
<p>Khi thiết kế ứng dụng, hãy ưu tiên một giao diện đơn giản, rõ ràng và giữ các quy tắc nội bộ bên trong đối tượng.</p>

<h2>Tổng kết</h2>
<ul>
	<li>Đóng gói bảo vệ trạng thái và kiểm soát cách dữ liệu thay đổi.</li>
	<li>Kế thừa tái sử dụng và mở rộng hành vi của class.</li>
	<li>Đa hình cho phép cùng một thao tác có cách thực hiện khác nhau.</li>
	<li>Trừu tượng hóa ẩn chi tiết và giữ giao diện sử dụng đơn giản.</li>
</ul>
`;
export default fakeData;

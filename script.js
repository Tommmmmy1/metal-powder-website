// 示例产品数据
const products = [
    {
        id: 1,
        name: "高纯度铁粉",
        category: "铁粉",
        price: 158,
        unit: "公斤",
        description: "99.9%纯度的超细铁粉，适用于粉末冶金、焊条制造等工业应用。",
        specifications: "粒度: 100-200目<br>纯度: ≥99.9%<br>包装: 25kg/袋",
        applications: "粉末冶金、焊条制造、磁性材料",
        icon: "fas fa-cube"
    },
    {
        id: 2,
        name: "电解铜粉",
        category: "铜粉",
        price: 285,
        unit: "公斤",
        description: "电解法生产的高品质铜粉，具有良好的导电性和加工性能。",
        specifications: "粒度: 200-300目<br>纯度: ≥99.8%<br>包装: 20kg/袋",
        applications: "电子工业、导电涂料、摩擦材料",
        icon: "fas fa-bolt"
    },
    {
        id: 3,
        name: "雾化铝粉",
        category: "铝粉",
        price: 195,
        unit: "公斤",
        description: "气体雾化生产的球形铝粉，流动性好，适用于3D打印和涂料行业。",
        specifications: "粒度: 50-100目<br>纯度: ≥99.5%<br>包装: 15kg/袋",
        applications: "3D打印、防腐涂料、烟花制造",
        icon: "fas fa-layer-group"
    },
    {
        id: 4,
        name: "不锈钢合金粉",
        category: "合金粉",
        price: 320,
        unit: "公斤",
        description: "316L不锈钢粉末，具有优异的耐腐蚀性和机械性能。",
        specifications: "粒度: 150-250目<br>成分: 316L<br>包装: 25kg/袋",
        applications: "医疗器械、化工设备、海洋工程",
        icon: "fas fa-cog"
    },
    {
        id: 5,
        name: "精细铁粉",
        category: "铁粉",
        price: 128,
        unit: "公斤",
        description: "精细加工的铁粉，颗粒均匀，适用于高精度制造。",
        specifications: "粒度: 300-400目<br>纯度: ≥99.5%<br>包装: 25kg/袋",
        applications: "精密零件、磁芯制造、化工催化",
        icon: "fas fa-cube"
    },
    {
        id: 6,
        name: "导电银粉",
        category: "合金粉",
        price: 850,
        unit: "公斤",
        description: "高纯度银粉，具有极佳的导电性能，用于高端电子产品。",
        specifications: "粒度: 1-5微米<br>纯度: ≥99.9%<br>包装: 1kg/瓶",
        applications: "电子浆料、导电胶、RFID天线",
        icon: "fas fa-gem"
    }
];

// 购物车数据
let cart = [];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    updateCartDisplay();
});

// 渲染产品
function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">¥${product.price}/${product.unit}</div>
                <div class="product-actions">
                    <button class="btn btn-secondary btn-small" onclick="showProductDetails(${product.id})">
                        查看详情
                    </button>
                    <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">
                        加入购物车
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 设置事件监听器
function setupEventListeners() {
    // 产品分类筛选
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            renderProducts(category);
        });
    });

    // 移动端导航
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // 关闭移动端菜单
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 联系表单提交
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 模拟表单提交
            alert('感谢您的留言！我们会尽快与您联系。');
            this.reset();
        });
    }

    // 点击模态框外部关闭
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// 显示产品详情
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="product-details">
            <div class="product-detail-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-price">¥${product.price}/${product.unit}</div>
                <div class="product-detail-section">
                    <h3>产品描述</h3>
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-section">
                    <h3>技术规格</h3>
                    <p>${product.specifications}</p>
                </div>
                <div class="product-detail-section">
                    <h3>应用领域</h3>
                    <p>${product.applications}</p>
                </div>
                <div class="product-detail-actions">
                    <div class="quantity-selector">
                        <label for="quantity-${productId}">数量(${product.unit}):</label>
                        <input type="number" id="quantity-${productId}" value="1" min="1" max="1000">
                    </div>
                    <button class="btn btn-primary" onclick="addToCartWithQuantity(${productId})">
                        加入购物车
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('product-modal').style.display = 'block';
}

// 关闭模态框
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// 添加到购物车
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCartDisplay();
    showCartMessage(`${product.name} 已添加到购物车`);
}

// 带数量添加到购物车
function addToCartWithQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value) || 1;
    addToCart(productId, quantity);
    closeModal();
}

// 更新购物车显示
function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // 更新购物车数量
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // 更新购物车内容
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">购物车为空</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>数量: ${item.quantity} ${item.unit}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-price">¥${(item.price * item.quantity).toFixed(2)}</div>
                    <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer; margin-top: 5px;">
                        移除
                    </button>
                </div>
            </div>
        `).join('');
    }

    // 更新总计
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// 从购物车移除
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// 切换购物车显示
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// 结算
function checkout() {
    if (cart.length === 0) {
        alert('购物车为空，请先添加商品');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.name} × ${item.quantity}`).join('\n');
    
    if (confirm(`确认购买以下商品吗？\n\n${itemsList}\n\n总计: ¥${total.toFixed(2)}`)) {
        // 生成订单编号
        const orderNumber = 'MP' + Date.now().toString().slice(-8);
        const orderDate = new Date().toLocaleString('zh-CN');
        
        // 创建详细订单信息
        const orderDetails = {
            orderNumber: orderNumber,
            date: orderDate,
            items: cart,
            total: total.toFixed(2),
            customerInfo: null // 将在收集客户信息后填充
        };
        
        // 收集客户信息
        showCustomerInfoForm(orderDetails);
    }
}

// 显示客户信息表单
function showCustomerInfoForm(orderDetails) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="customer-info-form">
            <h2>订单信息确认</h2>
            <div class="order-summary">
                <h3>订单编号: ${orderDetails.orderNumber}</h3>
                <p>下单时间: ${orderDetails.date}</p>
                <div class="order-items">
                    ${orderDetails.items.map(item => `
                        <div class="order-item">
                            <span>${item.name}</span>
                            <span>${item.quantity} ${item.unit}</span>
                            <span>¥${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">总计: ¥${orderDetails.total}</div>
            </div>
            
            <h3>请填写您的联系信息：</h3>
            <form id="customer-info-form">
                <div class="form-group">
                    <input type="text" id="customer-name" placeholder="您的姓名 *" required>
                </div>
                <div class="form-group">
                    <input type="tel" id="customer-phone" placeholder="联系电话 *" required>
                </div>
                <div class="form-group">
                    <input type="email" id="customer-email" placeholder="邮箱地址 *" required>
                </div>
                <div class="form-group">
                    <input type="text" id="customer-company" placeholder="公司名称">
                </div>
                <div class="form-group">
                    <textarea id="customer-address" placeholder="收货地址 *" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <textarea id="customer-notes" placeholder="备注信息（特殊要求等）" rows="2"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                    <button type="submit" class="btn btn-primary">确认订单</button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('product-modal').style.display = 'block';
    
    // 处理表单提交
    document.getElementById('customer-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerInfo = {
            name: document.getElementById('customer-name').value,
            phone: document.getElementById('customer-phone').value,
            email: document.getElementById('customer-email').value,
            company: document.getElementById('customer-company').value,
            address: document.getElementById('customer-address').value,
            notes: document.getElementById('customer-notes').value
        };
        
        orderDetails.customerInfo = customerInfo;
        processOrder(orderDetails);
    });
}

// 处理订单
function processOrder(orderDetails) {
    // 保存订单到本地存储
    saveOrderToLocal(orderDetails);
    
    // 生成邮件内容
    const emailContent = generateEmailContent(orderDetails);
    
    // 显示订单确认和邮件链接
    showOrderConfirmation(orderDetails, emailContent);
    
    // 清空购物车
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// 保存订单到本地存储
function saveOrderToLocal(orderDetails) {
    let orders = JSON.parse(localStorage.getItem('metalPowderOrders') || '[]');
    orders.push(orderDetails);
    localStorage.setItem('metalPowderOrders', JSON.stringify(orders));
}

// 生成邮件内容
function generateEmailContent(orderDetails) {
    const subject = `新订单 - ${orderDetails.orderNumber}`;
    const body = `
订单详情：
订单编号：${orderDetails.orderNumber}
下单时间：${orderDetails.date}

客户信息：
姓名：${orderDetails.customerInfo.name}
电话：${orderDetails.customerInfo.phone}
邮箱：${orderDetails.customerInfo.email}
公司：${orderDetails.customerInfo.company || '未填写'}
地址：${orderDetails.customerInfo.address}
备注：${orderDetails.customerInfo.notes || '无'}

订单明细：
${orderDetails.items.map(item => `${item.name} × ${item.quantity}${item.unit} - ¥${(item.price * item.quantity).toFixed(2)}`).join('\n')}

订单总计：¥${orderDetails.total}

请及时处理此订单。
    `;
    
    return { subject, body };
}

// 显示订单确认
function showOrderConfirmation(orderDetails, emailContent) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="order-confirmation">
            <div class="success-icon">✅</div>
            <h2>订单提交成功！</h2>
            <div class="order-info">
                <h3>订单编号：${orderDetails.orderNumber}</h3>
                <p>感谢您的订购，我们已收到您的订单信息。</p>
                <p>我们会在24小时内与您联系确认订单详情和付款方式。</p>
            </div>
            <div class="admin-actions">
                <h4>商家操作：</h4>
                <button class="btn btn-secondary" onclick="copyOrderInfo('${orderDetails.orderNumber}')">
                    复制订单信息
                </button>
                <button class="btn btn-primary" onclick="sendOrderEmail('${encodeURIComponent(emailContent.subject)}', '${encodeURIComponent(emailContent.body)}')">
                    发送邮件给自己
                </button>
                <button class="btn btn-secondary" onclick="viewAllOrders()">
                    查看所有订单
                </button>
            </div>
            <button class="btn btn-primary" onclick="closeModal()" style="margin-top: 20px;">关闭</button>
        </div>
    `;
}

// 复制订单信息
function copyOrderInfo(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('metalPowderOrders') || '[]');
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (order) {
        const orderText = `
订单编号：${order.orderNumber}
下单时间：${order.date}
客户：${order.customerInfo.name}
电话：${order.customerInfo.phone}
邮箱：${order.customerInfo.email}
地址：${order.customerInfo.address}
订单明细：
${order.items.map(item => `${item.name} × ${item.quantity}${item.unit} - ¥${(item.price * item.quantity).toFixed(2)}`).join('\n')}
总计：¥${order.total}
        `;
        
        navigator.clipboard.writeText(orderText).then(() => {
            alert('订单信息已复制到剪贴板');
        });
    }
}

// 发送订单邮件
function sendOrderEmail(subject, body) {
    const mailtoLink = `mailto:linyif619@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

// 查看所有订单
function viewAllOrders() {
    const orders = JSON.parse(localStorage.getItem('metalPowderOrders') || '[]');
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="orders-management">
            <h2>订单管理</h2>
            <div class="orders-stats">
                <div class="stat-item">
                    <h3>${orders.length}</h3>
                    <p>总订单数</p>
                </div>
                <div class="stat-item">
                    <h3>¥${orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2)}</h3>
                    <p>总销售额</p>
                </div>
            </div>
            <div class="orders-list">
                ${orders.length === 0 ? '<p>暂无订单</p>' : orders.reverse().map(order => `
                    <div class="order-card">
                        <div class="order-header">
                            <strong>订单编号：${order.orderNumber}</strong>
                            <span class="order-date">${order.date}</span>
                        </div>
                        <div class="order-details">
                            <p><strong>客户：</strong>${order.customerInfo.name} | ${order.customerInfo.phone}</p>
                            <p><strong>邮箱：</strong>${order.customerInfo.email}</p>
                            <p><strong>地址：</strong>${order.customerInfo.address}</p>
                            <div class="order-items-summary">
                                ${order.items.map(item => `<span class="item-tag">${item.name} × ${item.quantity}</span>`).join('')}
                            </div>
                            <div class="order-total"><strong>总计：¥${order.total}</strong></div>
                        </div>
                        <div class="order-actions">
                            <button class="btn btn-small btn-secondary" onclick="copyOrderInfo('${order.orderNumber}')">复制</button>
                            <button class="btn btn-small btn-primary" onclick="exportOrderToEmail('${order.orderNumber}')">邮件</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="orders-actions">
                <button class="btn btn-secondary" onclick="exportAllOrders()">导出所有订单</button>
                <button class="btn btn-primary" onclick="closeModal()">关闭</button>
            </div>
        </div>
    `;
}

// 导出单个订单到邮件
function exportOrderToEmail(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('metalPowderOrders') || '[]');
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (order) {
        const emailContent = generateEmailContent(order);
        sendOrderEmail(encodeURIComponent(emailContent.subject), encodeURIComponent(emailContent.body));
    }
}

// 导出所有订单
function exportAllOrders() {
    const orders = JSON.parse(localStorage.getItem('metalPowderOrders') || '[]');
    if (orders.length === 0) {
        alert('暂无订单数据');
        return;
    }
    
    const csvContent = generateOrdersCSV(orders);
    downloadCSV(csvContent, `金属粉末订单_${new Date().toISOString().split('T')[0]}.csv`);
}

// 生成CSV格式
function generateOrdersCSV(orders) {
    const headers = ['订单编号', '下单时间', '客户姓名', '联系电话', '邮箱', '公司', '收货地址', '商品明细', '订单总额', '备注'];
    const rows = orders.map(order => [
        order.orderNumber,
        order.date,
        order.customerInfo.name,
        order.customerInfo.phone,
        order.customerInfo.email,
        order.customerInfo.company || '',
        order.customerInfo.address,
        order.items.map(item => `${item.name}×${item.quantity}`).join(';'),
        order.total,
        order.customerInfo.notes || ''
    ]);
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}

// 下载CSV文件
function downloadCSV(content, filename) {
    const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 显示购物车消息
function showCartMessage(message) {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1003;
        animation: slideIn 0.3s ease;
    `;
    messageDiv.textContent = message;

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(messageDiv);

    // 3秒后移除消息
    setTimeout(() => {
        messageDiv.remove();
        style.remove();
    }, 3000);
}

// 滚动到指定部分
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// 页面滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #2c3e50, #34495e)';
        navbar.style.backdropFilter = 'none';
    }
});

// 动画观察器（页面滚动时触发动画）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// 添加fadeInUp动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-detail-image {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .product-detail-image i {
        font-size: 100px;
        color: #3498db;
        opacity: 0.8;
    }
    
    .product-detail-info h2 {
        color: #2c3e50;
        margin-bottom: 15px;
        font-size: 2rem;
    }
    
    .product-detail-price {
        font-size: 1.8rem;
        color: #e74c3c;
        font-weight: 700;
        margin-bottom: 30px;
    }
    
    .product-detail-section {
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .product-detail-section:last-of-type {
        border-bottom: none;
    }
    
    .product-detail-section h3 {
        color: #2c3e50;
        margin-bottom: 10px;
        font-size: 1.2rem;
    }
    
    .product-detail-section p {
        color: #666;
        line-height: 1.6;
    }
    
    .product-detail-actions {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 30px;
        flex-wrap: wrap;
    }
    
    .quantity-selector {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .quantity-selector label {
        font-weight: 500;
        color: #2c3e50;
    }
    
    .quantity-selector input {
        width: 80px;
        padding: 8px;
        border: 2px solid #e0e0e0;
        border-radius: 5px;
        text-align: center;
    }
    
    .product-details {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 40px;
        align-items: start;
    }
    
    @media (max-width: 768px) {
        .product-details {
            grid-template-columns: 1fr;
        }
        
        .product-detail-actions {
            flex-direction: column;
            align-items: stretch;
        }
        
        .quantity-selector {
            justify-content: space-between;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后观察所有卡片元素
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const cards = document.querySelectorAll('.product-card, .application-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });
    }, 100);
}); 

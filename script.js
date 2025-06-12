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
        alert('订单已提交！我们会尽快与您联系确认订单详情。');
        cart = [];
        updateCartDisplay();
        toggleCart();
    }
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
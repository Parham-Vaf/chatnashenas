// main.js

// تابع نمایش پیام
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-status ${type}`;
    messageDiv.textContent = message;
    
    const container = document.querySelector('main');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// تابع اعتبارسنجی ایمیل
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// تابع اعتبارسنجی رمز عبور
function validatePassword(password) {
    return password.length >= 8;
}

// تابع درخواست AJAX
function ajaxRequest(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
            }
        };
        
        xhr.onerror = function() {
            reject('خطا در اتصال به سرور');
        };
        
        xhr.send(data ? JSON.stringify(data) : null);
    });
}

// تابع اسکرول به بالا
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// تابع تشخیص اسکرول
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// ایجاد دکمه اسکرول به بالا
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollToTop';
scrollBtn.innerHTML = '↑';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #667eea;
    color: #fff;
    border: none;
    cursor: pointer;
    display: none;
    font-size: 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
`;
scrollBtn.onclick = scrollToTop;
document.body.appendChild(scrollBtn);

// بارگذاری پویای کاربران در صفحه اصلی
document.addEventListener('DOMContentLoaded', function() {
    const usersContainer = document.getElementById('users-container');
    if (usersContainer) {
        // شبیه‌سازی دریافت کاربران
        const mockUsers = [
            { username: 'user1', avatar: '👤' },
            { username: 'user2', avatar: '👤' },
            { username: 'user3', avatar: '👤' },
            { username: 'user4', avatar: '👤' },
            { username: 'user5', avatar: '👤' },
            { username: 'user6', avatar: '👤' }
        ];
        
        usersContainer.innerHTML = '';
        mockUsers.forEach(user => {
            usersContainer.innerHTML += `
                <div class="user-card">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="user-name">${user.username}</div>
                    <a href="/messages/send?to=${user.username}" class="btn-send">ارسال پیام</a>
                </div>
            `;
        });
    }
});

// جلوگیری از ارسال فرم با اینتر
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// ذخیره اطلاعات در localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// تغییر تم سایت
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    const isDark = body.classList.contains('dark-theme');
    saveToStorage('theme', isDark ? 'dark' : 'light');
}

// بارگذاری تم ذخیره شده
const savedTheme = getFromStorage('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}
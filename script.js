
// Application State
let currentLanguage = 'ar';
let currentUser = null;
let currentSection = 'welcome';

// Language Translations
const translations = {
    ar: {
        subtitle: 'رفيقك في رحلة الإنتاجية والنجاح',
        description: 'حقق أهدافك • طور مهاراتك • استمتع بالرحلة',
        cardTitle: 'ابدأ رحلتك نحو النجاح',
        cardDescription: 'اختر الطريقة المناسبة لك',
        loginText: 'تسجيل الدخول',
        trialText: 'جرب مجاناً (5 دقائق)',
        infoText: 'استكشف جميع الميزات في التجربة المجانية',
        langText: 'English',
        emailLabel: 'البريد الإلكتروني',
        passwordLabel: 'كلمة المرور',
        submitBtn: 'دخول',
        loginTitle: 'مرحباً بعودتك',
        loginSubtitle: 'سجل دخولك لمتابعة رحلتك',
        backText: 'العودة',
        welcomeUser: 'مرحباً بك!',
        welcomeSubtext: 'لنبدأ يوماً إنتاجياً جديداً',
        logoutBtn: 'تسجيل الخروج',
        statsTitle: 'إحصائياتك الشخصية',
        tasksLabel: 'المهام المكتملة',
        pointsLabel: 'النقاط',
        levelLabel: 'المستوى',
        streakLabel: 'أيام متتالية',
        aiFeature: 'ذكاء اصطناعي',
        timeFeature: 'إدارة الوقت',
        gameFeature: 'تجربة تفاعلية',
        rewardFeature: 'مكافآت فورية'
    },
    en: {
        subtitle: 'Your Productivity & Success Companion',
        description: 'Achieve Goals • Develop Skills • Enjoy the Journey',
        cardTitle: 'Start Your Success Journey',
        cardDescription: 'Choose the right method for you',
        loginText: 'Login',
        trialText: 'Try Free (5 minutes)',
        infoText: 'Explore all features in the free trial',
        langText: 'العربية',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        submitBtn: 'Login',
        loginTitle: 'Welcome Back',
        loginSubtitle: 'Login to continue your journey',
        backText: 'Back',
        welcomeUser: 'Welcome!',
        welcomeSubtext: 'Let\'s start a productive new day',
        logoutBtn: 'Logout',
        statsTitle: 'Your Personal Stats',
        tasksLabel: 'Completed Tasks',
        pointsLabel: 'Points',
        levelLabel: 'Level',
        streakLabel: 'Days Streak',
        aiFeature: 'AI Intelligence',
        timeFeature: 'Time Management',
        gameFeature: 'Interactive Experience',
        rewardFeature: 'Instant Rewards'
    }
};

// DOM Elements
const elements = {
    langBtn: document.getElementById('langBtn'),
    welcomeSection: document.getElementById('welcomeSection'),
    loginSection: document.getElementById('loginSection'),
    dashboardSection: document.getElementById('dashboardSection'),
    loginBtn: document.getElementById('loginBtn'),
    trialBtn: document.getElementById('trialBtn'),
    backBtn: document.getElementById('backBtn'),
    loginForm: document.getElementById('loginForm'),
    logoutBtn: document.getElementById('logoutBtn'),
    submitBtn: document.getElementById('submitBtn'),
    toast: document.getElementById('toast')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    updateLanguage();
    attachEventListeners();
    showSection('welcome');
});

// Event Listeners
function attachEventListeners() {
    elements.langBtn.addEventListener('click', toggleLanguage);
    elements.loginBtn.addEventListener('click', () => showSection('login'));
    elements.trialBtn.addEventListener('click', startTrial);
    elements.backBtn.addEventListener('click', () => showSection('welcome'));
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.logoutBtn.addEventListener('click', handleLogout);
    
    // Add button interaction effects
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = btn.style.transform.replace('translateY(-', 'translateY(-') || 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', () => {
            setTimeout(() => {
                btn.style.transform = btn.style.transform.replace('scale(0.95)', '');
            }, 100);
        });
    });
}

// Language Management
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLanguage;
    updateLanguage();
    showToast(
        '🌍 ' + (currentLanguage === 'ar' ? 'تم تغيير اللغة' : 'Language Changed'),
        currentLanguage === 'ar' ? 'تم التبديل للعربية بنجاح' : 'Successfully switched to English'
    );
}

function updateLanguage() {
    const texts = translations[currentLanguage];
    
    Object.keys(texts).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = texts[key];
            } else {
                element.textContent = texts[key];
            }
        }
    });
}

// Section Management
function showSection(sectionName) {
    // Hide all sections
    Object.values(elements).forEach(el => {
        if (el && el.classList.contains('section')) {
            el.classList.remove('active');
        }
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
    }
}

// Trial Functionality
function startTrial() {
    currentUser = { 
        name: currentLanguage === 'ar' ? 'مستخدم تجريبي' : 'Trial User', 
        email: 'trial@user.com',
        isTrial: true 
    };
    
    showSection('dashboard');
    updateWelcomeUser();
    
    showToast(
        '⚡ ' + (currentLanguage === 'ar' ? 'بدء التجربة المجانية' : 'Free Trial Started'),
        currentLanguage === 'ar' ? 'استمتع بـ 5 دقائق من الاستكشاف!' : 'Enjoy 5 minutes of exploration!'
    );
    
    // Auto logout after 5 minutes for trial
    setTimeout(() => {
        if (currentUser && currentUser.isTrial) {
            handleLogout();
            showToast(
                '⏰ ' + (currentLanguage === 'ar' ? 'انتهت التجربة' : 'Trial Ended'),
                currentLanguage === 'ar' ? 'انتهت فترة التجربة المجانية' : 'Free trial period has ended'
            );
        }
    }, 5 * 60 * 1000);
}

// Login Functionality
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showToast(
            '⚠️ ' + (currentLanguage === 'ar' ? 'خطأ' : 'Error'),
            currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields'
        );
        return;
    }
    
    // Show loading state
    elements.submitBtn.classList.add('loading');
    
    // Simulate login process
    setTimeout(() => {
        elements.submitBtn.classList.remove('loading');
        
        currentUser = { 
            name: email.split('@')[0],
            email: email,
            isTrial: false 
        };
        
        showSection('dashboard');
        updateWelcomeUser();
        
        showToast(
            '🎉 ' + (currentLanguage === 'ar' ? 'أهلاً وسهلاً!' : 'Welcome!'),
            currentLanguage === 'ar' ? 
                `مرحباً ${currentUser.name}، نتمنى لك رحلة إنتاجية مميزة!` : 
                `Hello ${currentUser.name}, enjoy your productive journey!`
        );
        
        // Clear form
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        
    }, 1500); // 1.5 second delay to show loading
}

function handleLogout() {
    currentUser = null;
    showSection('welcome');
    
    showToast(
        '👋 ' + (currentLanguage === 'ar' ? 'وداعاً' : 'Goodbye'),
        currentLanguage === 'ar' ? 'تم تسجيل خروجك بنجاح' : 'You have been successfully logged out'
    );
}

function updateWelcomeUser() {
    const welcomeUser = document.getElementById('welcomeUser');
    if (currentUser && welcomeUser) {
        const greeting = currentLanguage === 'ar' ? 
            `مرحباً ${currentUser.name}!` : 
            `Welcome ${currentUser.name}!`;
        welcomeUser.textContent = greeting;
    }
}

// Toast Notification System
function showToast(title, message, type = 'info') {
    const toast = elements.toast;
    const toastIcon = document.getElementById('toastIcon');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    
    // Set icon based on type
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    toastIcon.textContent = icons[type] || icons.info;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function hideToast() {
    elements.toast.classList.remove('show');
}

// Statistics Animation (for dashboard)
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 20;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 50);
    });
}

// Call stats animation when dashboard is shown
const originalShowSection = showSection;
showSection = function(sectionName) {
    originalShowSection(sectionName);
    if (sectionName === 'dashboard') {
        setTimeout(animateStats, 300);
    }
};

// Add smooth scrolling for better UX
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (currentSection === 'login') {
            showSection('welcome');
        } else if (currentSection === 'dashboard') {
            handleLogout();
        }
    }
});

// Performance optimization - lazy loading
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add console logging for debugging
console.log('🚀 prodvanao application initialized successfully!');
console.log('Current language:', currentLanguage);
console.log('Current section:', currentSection);

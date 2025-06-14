
// Language management
let currentLanguage = 'ar';

const translations = {
    ar: {
        subtitle: 'رفيقك في رحلة الإنتاجية والنمو',
        description: 'انجز أكثر، اعتن بنفسك، واستمتع بالرحلة',
        cardTitle: 'ابدأ رحلتك',
        cardDescription: 'اختر طريقة الدخول المناسبة لك',
        loginText: 'تسجيل الدخول',
        trialText: 'جربني الآن (5 دقائق مجاناً)',
        infoText: '💡 التجربة المجانية تتيح لك استكشاف جميع الميزات لمدة 5 دقائق',
        featureText: 'ذكاء اصطناعي • إدارة وقت • تجربة لعب • مكافآت فورية',
        langText: 'English',
        emailLabel: 'البريد الإلكتروني',
        passwordLabel: 'كلمة المرور',
        submitBtn: 'دخول',
        loginTitle: 'تسجيل الدخول',
        backBtn: '← العودة',
        welcomeUser: 'مرحباً بك!',
        logoutBtn: 'تسجيل الخروج',
        statsTitle: 'إحصائياتك',
        tasksLabel: 'المهام المكتملة',
        pointsLabel: 'النقاط',
        levelLabel: 'المستوى',
        streakLabel: 'الإنجاز المتتالي'
    },
    en: {
        subtitle: 'Your Productivity & Growth Companion',
        description: 'Achieve more, take care of yourself, and enjoy the journey',
        cardTitle: 'Start Your Journey',
        cardDescription: 'Choose your preferred login method',
        loginText: 'Login',
        trialText: 'Try Now (5 minutes free)',
        infoText: '💡 Free trial allows you to explore all features for 5 minutes',
        featureText: 'AI Intelligence • Time Management • Gaming Experience • Instant Rewards',
        langText: 'العربية',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        submitBtn: 'Login',
        loginTitle: 'Login',
        backBtn: '← Back',
        welcomeUser: 'Welcome!',
        logoutBtn: 'Logout',
        statsTitle: 'Your Stats',
        tasksLabel: 'Completed Tasks',
        pointsLabel: 'Points',
        levelLabel: 'Level',
        streakLabel: 'Streak'
    }
};

// DOM Elements
const langBtn = document.getElementById('langBtn');
const langText = document.getElementById('langText');
const welcomeSection = document.getElementById('welcomeSection');
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginBtn = document.getElementById('loginBtn');
const trialBtn = document.getElementById('trialBtn');
const backBtn = document.getElementById('backBtn');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const toast = document.getElementById('toast');

// Current user
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateLanguage();
    attachEventListeners();
});

// Event Listeners
function attachEventListeners() {
    langBtn.addEventListener('click', toggleLanguage);
    loginBtn.addEventListener('click', showLoginSection);
    trialBtn.addEventListener('click', startTrial);
    backBtn.addEventListener('click', showWelcomeSection);
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
}

// Language functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLanguage;
    updateLanguage();
    showToast(
        currentLanguage === 'ar' ? 'تم تغيير اللغة' : 'Language Changed',
        currentLanguage === 'ar' ? 'تم التبديل للعربية' : 'Switched to English'
    );
}

function updateLanguage() {
    const texts = translations[currentLanguage];
    
    // Update all text elements
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

// Navigation functions
function showWelcomeSection() {
    hideAllSections();
    welcomeSection.classList.remove('hidden');
}

function showLoginSection() {
    hideAllSections();
    loginSection.classList.remove('hidden');
}

function showDashboardSection() {
    hideAllSections();
    dashboardSection.classList.remove('hidden');
}

function hideAllSections() {
    welcomeSection.classList.add('hidden');
    loginSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
}

// Trial functionality
function startTrial() {
    currentUser = { 
        name: currentLanguage === 'ar' ? 'مستخدم تجريبي' : 'Trial User', 
        isTrial: true 
    };
    showDashboardSection();
    updateWelcomeUser();
    showToast(
        currentLanguage === 'ar' ? '⚠️ تحذير' : '⚠️ Warning',
        currentLanguage === 'ar' ? 'أنت تستخدم حساب تجريبي لمدة 5 دقائق فقط' : 'You are using a trial account for 5 minutes only'
    );
    
    // Auto logout after 5 minutes for trial
    setTimeout(() => {
        if (currentUser && currentUser.isTrial) {
            handleLogout();
            showToast(
                currentLanguage === 'ar' ? 'انتهت التجربة' : 'Trial Ended',
                currentLanguage === 'ar' ? 'انتهت فترة التجربة المجانية' : 'Free trial period has ended'
            );
        }
    }, 5 * 60 * 1000); // 5 minutes
}

// Login functionality
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        currentUser = { 
            name: email.split('@')[0],
            email: email,
            isTrial: false 
        };
        showDashboardSection();
        updateWelcomeUser();
        showToast(
            currentLanguage === 'ar' ? 'أهلاً وسهلاً! 🎉' : 'Welcome! 🎉',
            currentLanguage === 'ar' ? `مرحباً ${currentUser.name}، استعد لرحلة إنتاجية مميزة!` : `Hello ${currentUser.name}, get ready for an amazing productivity journey!`
        );
        
        // Clear form
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }
}

function handleLogout() {
    currentUser = null;
    showWelcomeSection();
    showToast(
        currentLanguage === 'ar' ? 'تم تسجيل الخروج' : 'Logged Out',
        currentLanguage === 'ar' ? 'تم تسجيل خروجك بنجاح' : 'You have been successfully logged out'
    );
}

function updateWelcomeUser() {
    const welcomeUser = document.getElementById('welcomeUser');
    if (currentUser) {
        const greeting = currentLanguage === 'ar' ? `مرحباً ${currentUser.name}!` : `Welcome ${currentUser.name}!`;
        welcomeUser.textContent = greeting;
    }
}

// Toast notification
function showToast(title, description) {
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    toast.classList.remove('hidden');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Add some interactivity to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        e.target.style.transform = 'scale(0.98)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

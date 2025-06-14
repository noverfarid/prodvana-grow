
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/LoginForm';
import GameDashboard from '@/components/GameDashboard';
import { useToast } from '@/hooks/use-toast';
import { Globe } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'login' | 'trial' | 'dashboard'>('welcome');
  const [user, setUser] = useState<any>(null);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const { toast } = useToast();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    toast({
      title: language === 'ar' ? "Language Changed" : "تم تغيير اللغة",
      description: language === 'ar' ? "Switched to English" : "تم التبديل للعربية",
    });
  };

  const startTrial = () => {
    setCurrentView('trial');
    setUser({ name: language === 'ar' ? 'مستخدم تجريبي' : 'Trial User', isTrial: true });
    toast({
      title: language === 'ar' ? "⚠️ تحذير" : "⚠️ Warning",
      description: language === 'ar' ? "أنت تستخدم حساب تجريبي لمدة 5 دقائق فقط" : "You are using a trial account for 5 minutes only",
      duration: 5000,
    });
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentView('dashboard');
    toast({
      title: language === 'ar' ? "أهلاً وسهلاً! 🎉" : "Welcome! 🎉",
      description: language === 'ar' ? `مرحباً ${userData.name}، استعد لرحلة إنتاجية مميزة!` : `Hello ${userData.name}, get ready for an amazing productivity journey!`,
    });
  };

  if (currentView === 'login') {
    return <LoginForm onLogin={handleLogin} onBack={() => setCurrentView('welcome')} language={language} />;
  }

  if (currentView === 'dashboard' || currentView === 'trial') {
    return <GameDashboard user={user} language={language} onLogout={() => {
      setCurrentView('welcome');
      setUser(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
          </Button>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            prodvanao
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {language === 'ar' ? 'رفيقك في رحلة الإنتاجية والنمو' : 'Your Productivity & Growth Companion'}
          </p>
          <p className="text-sm text-gray-500">
            {language === 'ar' ? 'انجز أكثر، اعتن بنفسك، واستمتع بالرحلة' : 'Achieve more, take care of yourself, and enjoy the journey'}
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-teal-100/20"></div>
          <CardHeader className="relative text-center pb-4">
            <CardTitle className="text-2xl text-gray-800">
              {language === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {language === 'ar' ? 'اختر طريقة الدخول المناسبة لك' : 'Choose your preferred login method'}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <Button 
              onClick={() => setCurrentView('login')}
              className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className={language === 'ar' ? "ml-2" : "mr-2"}>🔑</span>
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Button>
            
            <Button 
              onClick={startTrial}
              variant="outline" 
              className="w-full h-14 text-lg border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
            >
              <span className={language === 'ar' ? "ml-2" : "mr-2"}>⚡</span>
              {language === 'ar' ? 'جربني الآن (5 دقائق مجاناً)' : 'Try Now (5 minutes free)'}
            </Button>

            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                {language === 'ar' 
                  ? '💡 التجربة المجانية تتيح لك استكشاف جميع الميزات لمدة 5 دقائق'
                  : '💡 Free trial allows you to explore all features for 5 minutes'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center space-y-2">
          <div className="flex justify-center space-x-reverse space-x-6 text-2xl">
            <span>🧠</span>
            <span>⏰</span>
            <span>🎮</span>
            <span>💎</span>
          </div>
          <p className="text-sm text-gray-600">
            {language === 'ar' 
              ? 'ذكاء اصطناعي • إدارة وقت • تجربة لعب • مكافآت فورية'
              : 'AI Intelligence • Time Management • Gaming Experience • Instant Rewards'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

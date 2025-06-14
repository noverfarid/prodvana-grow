
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/LoginForm';
import GameDashboard from '@/components/GameDashboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'login' | 'trial' | 'dashboard'>('welcome');
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const startTrial = () => {
    setCurrentView('trial');
    setUser({ name: 'مستخدم تجريبي', isTrial: true });
    toast({
      title: "⚠️ تحذير",
      description: "أنت تستخدم حساب تجريبي لمدة 5 دقائق فقط",
      duration: 5000,
    });
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentView('dashboard');
    toast({
      title: "أهلاً وسهلاً! 🎉",
      description: `مرحباً ${userData.name}، استعد لرحلة إنتاجية مميزة!`,
    });
  };

  if (currentView === 'login') {
    return <LoginForm onLogin={handleLogin} onBack={() => setCurrentView('welcome')} />;
  }

  if (currentView === 'dashboard' || currentView === 'trial') {
    return <GameDashboard user={user} onLogout={() => {
      setCurrentView('welcome');
      setUser(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-6xl mb-4">🌱</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            نماء
          </h1>
          <p className="text-xl text-gray-600 mb-2">رفيقك في رحلة الإنتاجية والنمو</p>
          <p className="text-sm text-gray-500">انجز أكثر، اعتن بنفسك، واستمتع بالرحلة</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-teal-100/20"></div>
          <CardHeader className="relative text-center pb-4">
            <CardTitle className="text-2xl text-gray-800">ابدأ رحلتك</CardTitle>
            <CardDescription className="text-gray-600">
              اختر طريقة الدخول المناسبة لك
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <Button 
              onClick={() => setCurrentView('login')}
              className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="ml-2">🔑</span>
              تسجيل الدخول
            </Button>
            
            <Button 
              onClick={startTrial}
              variant="outline" 
              className="w-full h-14 text-lg border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
            >
              <span className="ml-2">⚡</span>
              جربني الآن (5 دقائق مجاناً)
            </Button>

            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                💡 التجربة المجانية تتيح لك استكشاف جميع الميزات لمدة 5 دقائق
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
            ذكاء اصطناعي • إدارة وقت • تجربة لعب • مكافآت فورية
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Gift, User, Calendar, ShoppingBag } from 'lucide-react';
import TaskManager from '@/components/TaskManager';
import GameSession from '@/components/GameSession';
import DailyReport from '@/components/DailyReport';
import GameStore from '@/components/GameStore';
import PersonalityAnalysis from '@/components/PersonalityAnalysis';
import { useToast } from '@/hooks/use-toast';

interface GameDashboardProps {
  user: any;
  language: 'ar' | 'en';
  onLogout: () => void;
}

const GameDashboard = ({ user, language, onLogout }: GameDashboardProps) => {
  const [currentTab, setCurrentTab] = useState<'home' | 'session' | 'tasks' | 'report' | 'store' | 'analysis'>('home');
  const [gameType, setGameType] = useState<'farm' | 'fishing'>('farm');
  const [coins, setCoins] = useState(150);
  const [level, setLevel] = useState(1);
  
  // إضافة بيانات المستخدم الحقيقية
  const [userStats, setUserStats] = useState({
    todayWorkHours: 2.5,
    todayFocusTime: 2.0,
    todayBreakTime: 30,
    todayWaterGlasses: 5,
    completedTasks: 3,
    totalTasks: 5,
    todayCoinsEarned: 75,
    productivity: 85,
    mood: 'جيد',
    sessionsCompleted: 2,
    focusScore: 78,
    healthScore: 85,
    weeklyData: [
      { day: 'السبت', hours: 1.5, productivity: 65, coins: 45 },
      { day: 'الأحد', hours: 3.2, productivity: 82, coins: 95 },
      { day: 'الاثنين', hours: 0, productivity: 0, coins: 0 },
      { day: 'الثلاثاء', hours: 2.8, productivity: 75, coins: 68 },
      { day: 'الأربعاء', hours: 2.5, productivity: 85, coins: 75 },
      { day: 'الخميس', hours: 0, productivity: 0, coins: 0 },
      { day: 'الجمعة', hours: 0, productivity: 0, coins: 0 }
    ]
  });

  const { toast } = useToast();

  // للمستخدمين الجدد، ابدأ ببيانات فارغة
  useEffect(() => {
    if (user?.name === 'مستخدم تجريبي') {
      setUserStats({
        todayWorkHours: 0,
        todayFocusTime: 0,
        todayBreakTime: 0,
        todayWaterGlasses: 0,
        completedTasks: 0,
        totalTasks: 0,
        todayCoinsEarned: 0,
        productivity: 0,
        mood: 'ابدأ رحلتك!',
        sessionsCompleted: 0,
        focusScore: 0,
        healthScore: 0,
        weeklyData: [
          { day: 'السبت', hours: 0, productivity: 0, coins: 0 },
          { day: 'الأحد', hours: 0, productivity: 0, coins: 0 },
          { day: 'الاثنين', hours: 0, productivity: 0, coins: 0 },
          { day: 'الثلاثاء', hours: 0, productivity: 0, coins: 0 },
          { day: 'الأربعاء', hours: 0, productivity: 0, coins: 0 },
          { day: 'الخميس', hours: 0, productivity: 0, coins: 0 },
          { day: 'الجمعة', hours: 0, productivity: 0, coins: 0 }
        ]
      });
    }
  }, [user]);

  // Trial timer for demo users
  useEffect(() => {
    if (user?.isTrial) {
      const timer = setTimeout(() => {
        toast({
          title: "⏰ انتهت فترة التجربة",
          description: "سجل الآن للمتابعة والاستفادة من جميع الميزات!",
          duration: 10000,
        });
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [user, toast]);

  const startSession = () => {
    setCurrentTab('session');
  };

  const earnCoins = (amount: number) => {
    setCoins(prev => prev + amount);
    
    // تحديث إحصائيات المستخدم
    setUserStats(prev => ({
      ...prev,
      todayCoinsEarned: prev.todayCoinsEarned + amount,
      sessionsCompleted: prev.sessionsCompleted + 1,
      todayWorkHours: prev.todayWorkHours + 0.5, // افتراض أن كل جلسة 30 دقيقة
      todayFocusTime: prev.todayFocusTime + 0.4,
      productivity: Math.min(100, prev.productivity + 5),
      focusScore: Math.min(100, prev.focusScore + 3)
    }));
    
    if (coins + amount >= level * 100) {
      setLevel(prev => prev + 1);
      toast({
        title: "🎉 مستوى جديد!",
        description: `تهانينا! وصلت للمستوى ${level + 1}`,
      });
    }
  };

  const spendCoins = (amount: number) => {
    setCoins(prev => Math.max(0, prev - amount));
  };

  const updateDailyStats = () => {
    const today = new Date().getDay();
    const updatedWeeklyData = [...userStats.weeklyData];
    updatedWeeklyData[today] = {
      day: updatedWeeklyData[today].day,
      hours: userStats.todayWorkHours,
      productivity: userStats.productivity,
      coins: userStats.todayCoinsEarned
    };
    
    setUserStats(prev => ({
      ...prev,
      weeklyData: updatedWeeklyData
    }));
  };

  if (currentTab === 'session') {
    return (
      <GameSession 
        gameType={gameType} 
        user={user}
        language={language}
        onComplete={(earnedCoins) => {
          earnCoins(earnedCoins);
          setCurrentTab('home');
        }}
        onBack={() => setCurrentTab('home')}
      />
    );
  }

  if (currentTab === 'tasks') {
    return <TaskManager onBack={() => setCurrentTab('home')} />;
  }

  if (currentTab === 'report') {
    return <DailyReport onBack={() => setCurrentTab('home')} coins={coins} level={level} user={user} userStats={userStats} language={language} />;
  }

  if (currentTab === 'store') {
    return <GameStore coins={coins} onPurchase={spendCoins} onBack={() => setCurrentTab('home')} language={language} />;
  }

  if (currentTab === 'analysis') {
    return <PersonalityAnalysis onBack={() => setCurrentTab('home')} language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="text-2xl">🚀</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Prodvana</h1>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? `أهلاً ${user.name}!` : `Hello ${user.name}!`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-reverse space-x-4">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              💰 {coins}
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              ⭐ {language === 'ar' ? `المستوى ${level}` : `Level ${level}`}
            </Badge>
            {user.isTrial && (
              <Badge variant="destructive">
                {language === 'ar' ? 'تجريبي' : 'Trial'}
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={onLogout}>
              {language === 'ar' ? 'خروج' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {language === 'ar' ? 'مرحباً بك في عالم الإنتاجية! 🎯' : 'Welcome to the Productivity World! 🎯'}
                </h2>
                <p className="text-emerald-100 mb-4">
                  {language === 'ar' 
                    ? 'استعد لجلسة عمل مثمرة وممتعة. اختر نوع اللعبة وابدأ رحلتك!'
                    : 'Get ready for a productive and fun work session. Choose your game type and start your journey!'
                  }
                </p>
                <div className="flex space-x-reverse space-x-3">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    🧠 {language === 'ar' ? 'تركيز عالي' : 'High Focus'}
                  </span>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    🎮 {language === 'ar' ? 'متعة مضمونة' : 'Guaranteed Fun'}
                  </span>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    💎 {language === 'ar' ? 'مكافآت يومية' : 'Daily Rewards'}
                  </span>
                </div>
              </div>
              <div className="text-6xl opacity-20">🌟</div>
            </div>
          </CardContent>
        </Card>

        {/* Game Type Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 ${gameType === 'farm' ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:shadow-lg'}`}
                onClick={() => setGameType('farm')}>
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">🌾</div>
              <CardTitle className="text-emerald-700">
                {language === 'ar' ? 'مزرعة الإنتاجية' : 'Productivity Farm'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 'ازرع أفكارك واحصد النجاح' : 'Plant your ideas and harvest success'}
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🌱 {language === 'ar' ? 'ازرع بذور الأهداف' : 'Plant goal seeds'}</div>
                <div>🌾 {language === 'ar' ? 'احصد المكافآت' : 'Harvest rewards'}</div>
                <div>💰 {language === 'ar' ? 'اجمع العملات الذهبية' : 'Collect gold coins'}</div>
              </div>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 ${gameType === 'fishing' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'}`}
                onClick={() => setGameType('fishing')}>
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">🎣</div>
              <CardTitle className="text-blue-700">
                {language === 'ar' ? 'رحلة الصيد' : 'Fishing Journey'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 'اصطد الأفكار من بحر الإبداع' : 'Catch ideas from the sea of creativity'}
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🚤 {language === 'ar' ? 'ابحر في عالم التركيز' : 'Sail in the world of focus'}</div>
                <div>🐟 {language === 'ar' ? 'اصطد المعرفة الثمينة' : 'Catch valuable knowledge'}</div>
                <div>🏆 {language === 'ar' ? 'حقق أهدافك المرجوة' : 'Achieve your desired goals'}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-5 gap-4">
          <Button 
            onClick={startSession}
            className="h-16 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Timer className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">{language === 'ar' ? 'ابدأ جلسة' : 'Start Session'}</div>
              <div className="text-xs opacity-80">{language === 'ar' ? 'عمل مركز' : 'Focused Work'}</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('tasks')}
            variant="outline"
            className="h-16 border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
          >
            <Calendar className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">{language === 'ar' ? 'مهام اليوم' : 'Daily Tasks'}</div>
              <div className="text-xs opacity-80">{language === 'ar' ? 'نظم وقتك' : 'Organize Time'}</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('store')}
            variant="outline"
            className="h-16 border-2 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50"
          >
            <ShoppingBag className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">{language === 'ar' ? 'المتجر' : 'Store'}</div>
              <div className="text-xs opacity-80">{language === 'ar' ? 'طور شخصيتك' : 'Develop Your Personality'}</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('report')}
            variant="outline"
            className="h-16 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
          >
            <Gift className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">{language === 'ar' ? 'التقرير اليومي' : 'Daily Report'}</div>
              <div className="text-xs opacity-80">{language === 'ar' ? 'إنجازاتك' : 'Your Achievements'}</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('analysis')}
            variant="outline"
            className="h-16 border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50"
          >
            <User className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">{language === 'ar' ? 'تحليل الشخصية' : 'Personality Analysis'}</div>
              <div className="text-xs opacity-80">{language === 'ar' ? 'اكتشف نفسك' : 'Discover Yourself'}</div>
            </div>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-lg font-bold text-gray-800">{userStats.todayWorkHours}</div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'ساعات اليوم' : 'Hours Today'}
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-lg font-bold text-gray-800">{userStats.productivity}%</div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'معدل الإنجاز' : 'Achievement Rate'}
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-lg font-bold text-gray-800">{userStats.sessionsCompleted}</div>
              <div className="text-sm text-gray-600">
                {language === 'ar' ? 'جلسات اليوم' : 'Sessions Today'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;

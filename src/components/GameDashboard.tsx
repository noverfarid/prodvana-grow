
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
  onLogout: () => void;
}

const GameDashboard = ({ user, onLogout }: GameDashboardProps) => {
  const [currentTab, setCurrentTab] = useState<'home' | 'session' | 'tasks' | 'report' | 'store' | 'analysis'>('home');
  const [gameType, setGameType] = useState<'farm' | 'fishing'>('farm');
  const [coins, setCoins] = useState(150);
  const [level, setLevel] = useState(1);
  const { toast } = useToast();

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

  if (currentTab === 'session') {
    return (
      <GameSession 
        gameType={gameType} 
        user={user}
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
    return <DailyReport onBack={() => setCurrentTab('home')} coins={coins} level={level} />;
  }

  if (currentTab === 'store') {
    return <GameStore coins={coins} onPurchase={spendCoins} onBack={() => setCurrentTab('home')} />;
  }

  if (currentTab === 'analysis') {
    return <PersonalityAnalysis onBack={() => setCurrentTab('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="text-2xl">🌱</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">نماء</h1>
              <p className="text-sm text-gray-600">أهلاً {user.name}!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-reverse space-x-4">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              💰 {coins}
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              ⭐ المستوى {level}
            </Badge>
            {user.isTrial && (
              <Badge variant="destructive">تجريبي</Badge>
            )}
            <Button variant="ghost" size="sm" onClick={onLogout}>
              خروج
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
                <h2 className="text-2xl font-bold mb-2">مرحباً بك في عالم الإنتاجية! 🎯</h2>
                <p className="text-emerald-100 mb-4">
                  استعد لجلسة عمل مثمرة وممتعة. اختر نوع اللعبة وابدأ رحلتك!
                </p>
                <div className="flex space-x-reverse space-x-3">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">🧠 تركيز عالي</span>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">🎮 متعة مضمونة</span>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">💎 مكافآت يومية</span>
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
              <CardTitle className="text-emerald-700">مزرعة الإنتاجية</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">ازرع أفكارك واحصد النجاح</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🌱 ازرع بذور الأهداف</div>
                <div>🌾 احصد المكافآت</div>
                <div>💰 اجمع العملات الذهبية</div>
              </div>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 ${gameType === 'fishing' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'}`}
                onClick={() => setGameType('fishing')}>
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">🎣</div>
              <CardTitle className="text-blue-700">رحلة الصيد</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">اصطد الأفكار من بحر الإبداع</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>🚤 ابحر في عالم التركيز</div>
                <div>🐟 اصطد المعرفة الثمينة</div>
                <div>🏆 حقق أهدافك المرجوة</div>
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
              <div className="font-bold">ابدأ جلسة</div>
              <div className="text-xs opacity-80">عمل مركز</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('tasks')}
            variant="outline"
            className="h-16 border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
          >
            <Calendar className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">مهام اليوم</div>
              <div className="text-xs opacity-80">نظم وقتك</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('store')}
            variant="outline"
            className="h-16 border-2 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50"
          >
            <ShoppingBag className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">المتجر</div>
              <div className="text-xs opacity-80">طور شخصيتك</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('report')}
            variant="outline"
            className="h-16 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
          >
            <Gift className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">التقرير اليومي</div>
              <div className="text-xs opacity-80">إنجازاتك</div>
            </div>
          </Button>

          <Button 
            onClick={() => setCurrentTab('analysis')}
            variant="outline"
            className="h-16 border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50"
          >
            <User className="w-6 h-6 ml-2" />
            <div className="text-right">
              <div className="font-bold">تحليل الشخصية</div>
              <div className="text-xs opacity-80">اكتشف نفسك</div>
            </div>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-lg font-bold text-gray-800">2.5</div>
              <div className="text-sm text-gray-600">ساعات اليوم</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-lg font-bold text-gray-800">85%</div>
              <div className="text-sm text-gray-600">معدل الإنجاز</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-lg font-bold text-gray-800">7</div>
              <div className="text-sm text-gray-600">أيام متواصلة</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;

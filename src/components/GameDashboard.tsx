
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PieChart, PackageCheck, ListChecks, Store, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GameSession from '@/components/GameSession';
import DailyReport from '@/components/DailyReport';
import GameStore from '@/components/GameStore';
import PersonalityAnalysis from '@/components/PersonalityAnalysis';
import TaskManager from '@/components/TaskManager';

interface GameDashboardProps {
  user: any;
  language: 'ar' | 'en';
  onLogout: () => void;
}

interface UserStats {
  tasksCompleted: number;
  timeSaved: number;
  accuracy: number;
}

const GameDashboard = ({ user, language, onLogout }: GameDashboardProps) => {
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(50);
  const [currentView, setCurrentView] = useState<'main' | 'tasks' | 'game' | 'report' | 'store' | 'analysis'>('main');
  const [gameType, setGameType] = useState<'farm' | 'fishing'>('farm');
  const [userStats, setUserStats] = useState<UserStats>({
    tasksCompleted: 0,
    timeSaved: 0,
    accuracy: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user?.isTrial) {
      const timer = setTimeout(() => {
        onLogout();
        toast({
          title: language === 'ar' ? "انتهت الفترة التجريبية" : "Trial Period Ended",
          description: language === 'ar' ? "شكراً لتجربة Prodvana. نأمل أن تكون قد استمتعت!" : "Thanks for trying Prodvana. We hope you enjoyed it!",
        });
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [user, onLogout, language, toast]);

  const handleGameComplete = (result: any) => {
    setCoins(prevCoins => prevCoins + result.coins);
    setLevel(prevLevel => prevLevel + result.level);
    setUserStats(prevStats => ({
      tasksCompleted: prevStats.tasksCompleted + result.tasksCompleted,
      timeSaved: prevStats.timeSaved + result.timeSaved,
      accuracy: result.accuracy,
    }));
    setCurrentView('main');
    toast({
      title: language === 'ar' ? "أحسنت! 🎉" : "Well done! 🎉",
      description: language === 'ar' ? `لقد ربحت ${result.coins} كوينز و ${result.level} مستوى!` : `You've earned ${result.coins} coins and ${result.level} level!`,
    });
  };

  const handlePurchase = (item: any) => {
    if (coins >= item.cost) {
      setCoins(prevCoins => prevCoins - item.cost);
      toast({
        title: language === 'ar' ? "تم الشراء بنجاح! 🛍️" : "Purchase Successful! 🛍️",
        description: language === 'ar' ? `لقد اشتريت ${item.name}!` : `You've purchased ${item.name}!`,
      });
    } else {
      toast({
        title: language === 'ar' ? "ليس لديك رصيد كافٍ 😟" : "Not enough coins 😟",
        description: language === 'ar' ? "اجمع المزيد من الكوينز لتتمكن من الشراء" : "Collect more coins to make a purchase",
      });
    }
  };

  // Create expanded userStats for DailyReport component
  const expandedUserStats = {
    todayWorkHours: userStats.timeSaved,
    todayFocusTime: Math.floor(userStats.timeSaved * 0.8),
    todayBreakTime: Math.floor(userStats.timeSaved * 0.2),
    todayWaterGlasses: Math.floor(userStats.timeSaved * 2),
    completedTasks: userStats.tasksCompleted,
    totalTasks: userStats.tasksCompleted + 3,
    todayCoinsEarned: coins - 50,
    productivity: userStats.accuracy,
    weeklyGoal: 40,
    weeklyProgress: userStats.timeSaved * 7,
    currentStreak: Math.floor(userStats.tasksCompleted / 3),
    longestStreak: Math.floor(userStats.tasksCompleted / 2),
    mood: 'جيد',
    sessionsCompleted: Math.floor(userStats.tasksCompleted / 2),
    focusScore: userStats.accuracy,
    healthScore: Math.min(100, userStats.timeSaved * 10),
    weeklyData: [
      { day: 'السبت', hours: userStats.timeSaved * 0.8, productivity: userStats.accuracy, coins: 15 },
      { day: 'الأحد', hours: userStats.timeSaved * 1.2, productivity: userStats.accuracy, coins: 20 },
      { day: 'الاثنين', hours: userStats.timeSaved * 0.9, productivity: userStats.accuracy, coins: 18 },
      { day: 'الثلاثاء', hours: userStats.timeSaved * 1.1, productivity: userStats.accuracy, coins: 22 },
      { day: 'الأربعاء', hours: userStats.timeSaved * 0.7, productivity: userStats.accuracy, coins: 12 },
      { day: 'الخميس', hours: userStats.timeSaved * 1.0, productivity: userStats.accuracy, coins: 25 },
      { day: 'الجمعة', hours: userStats.timeSaved, productivity: userStats.accuracy, coins: coins - 50 },
    ]
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'tasks':
        return <TaskManager onBack={() => setCurrentView('main')} language={language} />;
      case 'game':
        return (
          <GameSession
            gameType={gameType}
            user={user}
            onComplete={handleGameComplete}
            onBack={() => setCurrentView('main')}
          />
        );
      case 'report':
        return (
          <DailyReport
            onBack={() => setCurrentView('main')}
            coins={coins}
            level={level}
            user={user}
            userStats={expandedUserStats}
          />
        );
      case 'store':
        return (
          <GameStore
            coins={coins}
            onPurchase={handlePurchase}
            onBack={() => setCurrentView('main')}
          />
        );
      case 'analysis':
        return (
          <PersonalityAnalysis
            onBack={() => setCurrentView('main')}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
              
              {/* Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://avatar.vercel.sh/${user?.name}.png`} />
                      <AvatarFallback className="text-xl">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{language === 'ar' ? 'أهلاً' : 'Welcome'} {user?.name}</h1>
                      <p className="text-gray-600">{language === 'ar' ? 'المستوى' : 'Level'} {level} • {coins} {language === 'ar' ? 'كوين' : 'coins'}</p>
                    </div>
                  </div>
                  <Button onClick={onLogout} variant="outline">
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </Button>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{language === 'ar' ? 'التقدم في المستوى' : 'Level Progress'}</span>
                    <span>{(level % 10) * 10}%</span>
                  </div>
                  <Progress value={(level % 10) * 10} className="h-3" />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-full">
                        <PackageCheck className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">{language === 'ar' ? 'المهام المكتملة' : 'Tasks Completed'}</p>
                        <p className="text-2xl font-bold text-gray-900">{userStats.tasksCompleted}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <ListChecks className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">{language === 'ar' ? 'الوقت الموفر' : 'Time Saved'}</p>
                        <p className="text-2xl font-bold text-gray-900">{userStats.timeSaved}h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <Store className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">{language === 'ar' ? 'إجمالي الكوينز' : 'Total Coins'}</p>
                        <p className="text-2xl font-bold text-gray-900">{coins}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('tasks')}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <ListChecks className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{language === 'ar' ? 'إدارة المهام' : 'Task Manager'}</h3>
                    <p className="text-gray-600 text-sm">{language === 'ar' ? 'نظم مهامك وتابع تقدمك' : 'Organize your tasks and track progress'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('game')}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🎮</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{language === 'ar' ? 'العب واربح' : 'Play & Earn'}</h3>
                    <p className="text-gray-600 text-sm">{language === 'ar' ? 'العب الألعاب واربح الكوينز' : 'Play games and earn coins'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('report')}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <PieChart className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{language === 'ar' ? 'التقرير اليومي' : 'Daily Report'}</h3>
                    <p className="text-gray-600 text-sm">{language === 'ar' ? 'راجع إنجازاتك اليومية' : 'Review your daily achievements'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('store')}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Store className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{language === 'ar' ? 'المتجر' : 'Store'}</h3>
                    <p className="text-gray-600 text-sm">{language === 'ar' ? 'اشتري المكافآت بالكوينز' : 'Buy rewards with your coins'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('analysis')}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-pink-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <BrainCircuit className="h-8 w-8 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{language === 'ar' ? 'تحليل الشخصية' : 'Personality Analysis'}</h3>
                    <p className="text-gray-600 text-sm">{language === 'ar' ? 'اكتشف نمط شخصيتك' : 'Discover your personality type'}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderCurrentView();
};

export default GameDashboard;

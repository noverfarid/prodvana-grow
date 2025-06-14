
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
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Header - Responsive Design */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 text-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-right">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-2 sm:border-4 border-white shadow-lg">
                      <AvatarImage src={`https://avatar.vercel.sh/${user?.name}.png`} />
                      <AvatarFallback className="text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold drop-shadow-lg">{language === 'ar' ? 'أهلاً' : 'Welcome'} {user?.name} ✨</h1>
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <span className="bg-white/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base lg:text-lg font-semibold backdrop-blur-sm">
                          {language === 'ar' ? 'المستوى' : 'Level'} {level} 🏆
                        </span>
                        <span className="bg-yellow-400/90 text-yellow-900 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base lg:text-lg font-bold">
                          {coins} {language === 'ar' ? 'كوين' : 'coins'} 💰
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={onLogout} 
                    variant="outline" 
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
                  >
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </Button>
                </div>
                <div className="mt-4 sm:mt-6">
                  <div className="flex justify-between text-xs sm:text-sm text-white/90 mb-2">
                    <span>{language === 'ar' ? 'التقدم في المستوى' : 'Level Progress'}</span>
                    <span>{(level % 10) * 10}%</span>
                  </div>
                  <Progress value={(level % 10) * 10} className="h-2 sm:h-3 lg:h-4 bg-white/20" />
                </div>
              </div>

              {/* Stats Cards - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center">
                      <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                        <PackageCheck className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div className="mr-2 sm:mr-3 lg:mr-4">
                        <p className="text-emerald-100 text-xs sm:text-sm font-medium">{language === 'ar' ? 'المهام المكتملة' : 'Tasks Completed'}</p>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">{userStats.tasksCompleted}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-400 to-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center">
                      <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                        <ListChecks className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div className="mr-2 sm:mr-3 lg:mr-4">
                        <p className="text-blue-100 text-xs sm:text-sm font-medium">{language === 'ar' ? 'الوقت الموفر' : 'Time Saved'}</p>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">{userStats.timeSaved}h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center">
                      <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                        <Store className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div className="mr-2 sm:mr-3 lg:mr-4">
                        <p className="text-yellow-100 text-xs sm:text-sm font-medium">{language === 'ar' ? 'إجمالي الكوينز' : 'Total Coins'}</p>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">{coins}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 hover:from-emerald-100 hover:to-teal-200" onClick={() => setCurrentView('tasks')}>
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                      <ListChecks className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-emerald-800 mb-2 sm:mb-3">{language === 'ar' ? 'إدارة المهام' : 'Task Manager'}</h3>
                    <p className="text-emerald-600 text-xs sm:text-sm">{language === 'ar' ? 'نظم مهامك وتابع تقدمك' : 'Organize your tasks and track progress'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:from-blue-100 hover:to-indigo-200" onClick={() => setCurrentView('game')}>
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                      <span className="text-lg sm:text-2xl lg:text-3xl">🎮</span>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-blue-800 mb-2 sm:mb-3">{language === 'ar' ? 'العب واربح' : 'Play & Earn'}</h3>
                    <p className="text-blue-600 text-xs sm:text-sm">{language === 'ar' ? 'العب الألعاب واربح الكوينز' : 'Play games and earn coins'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 hover:from-purple-100 hover:to-pink-200" onClick={() => setCurrentView('report')}>
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                      <PieChart className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-purple-800 mb-2 sm:mb-3">{language === 'ar' ? 'التقرير اليومي' : 'Daily Report'}</h3>
                    <p className="text-purple-600 text-xs sm:text-sm">{language === 'ar' ? 'راجع إنجازاتك اليومية' : 'Review your daily achievements'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 hover:from-orange-100 hover:to-red-200" onClick={() => setCurrentView('store')}>
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                      <Store className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-orange-800 mb-2 sm:mb-3">{language === 'ar' ? 'المتجر' : 'Store'}</h3>
                    <p className="text-orange-600 text-xs sm:text-sm">{language === 'ar' ? 'اشتري المكافآت بالكوينز' : 'Buy rewards with your coins'}</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200 hover:from-pink-100 hover:to-rose-200 sm:col-span-2 lg:col-span-1" onClick={() => setCurrentView('analysis')}>
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center shadow-lg">
                      <BrainCircuit className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-pink-800 mb-2 sm:mb-3">{language === 'ar' ? 'تحليل الشخصية' : 'Personality Analysis'}</h3>
                    <p className="text-pink-600 text-xs sm:text-sm">{language === 'ar' ? 'اكتشف نمط شخصيتك' : 'Discover your personality type'}</p>
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

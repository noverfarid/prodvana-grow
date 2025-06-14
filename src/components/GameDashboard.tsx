
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
    weeklyData: [
      { day: 'السبت', hours: userStats.timeSaved * 0.8, coins: 15 },
      { day: 'الأحد', hours: userStats.timeSaved * 1.2, coins: 20 },
      { day: 'الاثنين', hours: userStats.timeSaved * 0.9, coins: 18 },
      { day: 'الثلاثاء', hours: userStats.timeSaved * 1.1, coins: 22 },
      { day: 'الأربعاء', hours: userStats.timeSaved * 0.7, coins: 12 },
      { day: 'الخميس', hours: userStats.timeSaved * 1.0, coins: 25 },
      { day: 'الجمعة', hours: userStats.timeSaved, coins: coins - 50 },
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
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header Section */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${user?.name}.png`} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold">{user?.name}</CardTitle>
                      <p className="text-sm text-gray-500">{language === 'ar' ? 'المستوى' : 'Level'} {level}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={onLogout}>
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </Button>
                </CardHeader>
                <CardContent>
                  <Progress value={(level % 10) * 10} className="h-2 rounded-full" />
                </CardContent>
              </Card>

              {/* Quick Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold">{language === 'ar' ? 'المهام المكتملة' : 'Tasks Completed'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                    <PackageCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-2xl font-bold">{userStats.tasksCompleted}</span>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold">{language === 'ar' ? 'الوقت الموفر' : 'Time Saved'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                    <ListChecks className="w-5 h-5 text-blue-500" />
                    <span className="text-2xl font-bold">{userStats.timeSaved}h</span>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold">{language === 'ar' ? 'الكوينز' : 'Coins'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                    <Store className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold">{coins}</span>
                  </CardContent>
                </Card>
              </div>

              {/* Main Actions Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" className="h-16 bg-emerald-500 hover:bg-emerald-600 text-white font-bold" onClick={() => setCurrentView('tasks')}>
                  {language === 'ar' ? 'إدارة المهام' : 'Manage Tasks'}
                </Button>
                <Button size="lg" className="h-16 bg-blue-500 hover:bg-blue-600 text-white font-bold" onClick={() => setCurrentView('game')}>
                  {language === 'ar' ? 'العب واربح' : 'Play & Earn'}
                </Button>
                <Button size="lg" className="h-16 bg-teal-500 hover:bg-teal-600 text-white font-bold" onClick={() => setCurrentView('report')}>
                  {language === 'ar' ? 'تقرير اليوم' : 'Daily Report'}
                </Button>
                <Button size="lg" className="h-16 bg-orange-500 hover:bg-orange-600 text-white font-bold" onClick={() => setCurrentView('store')}>
                  {language === 'ar' ? 'المتجر' : 'Store'}
                </Button>
                <Button size="lg" className="h-16 bg-purple-500 hover:bg-purple-600 text-white font-bold" onClick={() => setCurrentView('analysis')}>
                  {language === 'ar' ? 'تحليل الشخصية' : 'Personality Analysis'}
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderCurrentView();
};

export default GameDashboard;

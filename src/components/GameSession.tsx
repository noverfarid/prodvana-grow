
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowDown, Timer, Gift, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameSessionProps {
  gameType: 'farm' | 'fishing';
  user: any;
  onComplete: (coins: number) => void;
  onBack: () => void;
}

const GameSession = ({ gameType, user, onComplete, onBack }: GameSessionProps) => {
  const [sessionState, setSessionState] = useState<'setup' | 'preparation' | 'active' | 'break' | 'completed'>('setup');
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(0);
  const [notes, setNotes] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (sessionState === 'active' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionState, timeLeft]);

  const handleSessionComplete = () => {
    const earnedCoins = Math.floor(duration * 2); // 2 coins per minute
    setSessionState('completed');
    
    // Celebrate with toast and vibration
    toast({
      title: "🎉 تهانينا! جلسة مكتملة",
      description: `حصلت على ${earnedCoins} عملة ذهبية!`,
      duration: 5000,
    });

    // Try to vibrate device if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const startSession = () => {
    if (!currentTask.trim()) {
      toast({
        title: "⚠️ تحذير",
        description: "يرجى تحديد المهمة أولاً",
        variant: "destructive",
      });
      return;
    }
    setSessionState('preparation');
  };

  const beginFocusSession = () => {
    setTimeLeft(duration * 60);
    setSessionState('active');
    toast({
      title: "🎯 بدأت الجلسة!",
      description: "ركز على مهمتك وتجنب المشتتات",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGameCharacter = () => {
    if (gameType === 'farm') {
      return {
        emoji: '👨‍🌾',
        activity: 'يزرع في الحقل',
        reward: '🌾',
        scene: '🌱🌿🌾'
      };
    } else {
      return {
        emoji: '🎣',
        activity: 'يصطاد في البحر',
        reward: '🐟',
        scene: '🌊🚤🐟'
      };
    }
  };

  const character = getGameCharacter();

  if (sessionState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={onBack} className="ml-4">
              <ArrowDown className="w-4 h-4 ml-2 rotate-90" />
              العودة
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">إعداد جلسة العمل</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-3xl ml-3">{character.emoji}</span>
                {gameType === 'farm' ? 'مزرعة الإنتاجية' : 'رحلة الصيد'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">ما هي مهمتك اليوم؟</label>
                <Input
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="مثال: مراجعة الفصل الثالث من كتاب الفيزياء"
                  className="text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">مدة الجلسة (بالدقائق)</label>
                <div className="flex space-x-reverse space-x-2">
                  {[15, 25, 30, 45, 60].map((time) => (
                    <Button
                      key={time}
                      variant={duration === time ? "default" : "outline"}
                      onClick={() => setDuration(time)}
                      className="flex-1"
                    >
                      {time} د
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Gift className="w-5 h-5 ml-2 text-yellow-600" />
                  <span className="font-medium text-yellow-800">مكافآت الجلسة</span>
                </div>
                <p className="text-sm text-yellow-700">
                  ستحصل على {Math.floor(duration * 2)} عملة ذهبية عند إتمام الجلسة بنجاح
                  {duration >= 30 && " + مكافأة إضافية للجلسات الطويلة!"}
                </p>
              </div>

              <Button onClick={startSession} className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                ابدأ الجلسة 🚀
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (sessionState === 'preparation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <CardTitle className="text-2xl">استعد للجلسة!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <h3 className="font-bold text-blue-800">للاستفادة القصوى من جلستك:</h3>
              <div className="space-y-1 text-sm text-blue-700">
                <div>💧 احضر زجاجة ماء بجانبك</div>
                <div>🚽 اذهب للحمام إذا احتجت</div>
                <div>📱 أغلق الإشعارات أو ضع الهاتف في وضع الطيران</div>
                <div>🔇 اجعل الهاتف صامتاً وبدون اهتزاز</div>
                <div>🎧 أحضر سماعاتك للموسيقى الهادئة</div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-bold text-orange-800 mb-2">تذكر:</h3>
              <p className="text-sm text-orange-700">
                لا تستسلم للمشتتات! كل دقيقة تركيز تقربك أكثر من هدفك 💪
              </p>
            </div>

            <Button onClick={beginFocusSession} className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500">
              أنا مستعد، لنبدأ! ✨
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionState === 'active') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <Card className="mb-6 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">{formatTime(timeLeft)}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentTask}</h2>
              <div className="text-gray-600 mb-6">
                {character.emoji} {character.activity} {character.scene}
              </div>
              
              <div className="flex justify-center items-center space-x-reverse space-x-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/80"
                >
                  {isPlaying ? '⏸️ إيقاف الموسيقى' : '▶️ تشغيل الموسيقى'}
                </Button>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <label className="block text-sm font-medium mb-2">دفتر الملاحظات</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="سجل أفكارك وملاحظاتك هنا..."
                  className="min-h-24 text-right"
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-white">
            <p className="text-lg opacity-90">ركز على مهمتك... النجاح ينتظرك! 🌟</p>
          </div>
        </div>
      </div>
    );
  }

  if (sessionState === 'completed') {
    const earnedCoins = Math.floor(duration * 2);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="text-8xl mb-4">🎉</div>
            <CardTitle className="text-3xl text-yellow-600">تهانينا!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="text-lg text-gray-700 mb-4">لقد أكملت جلسة رائعة!</p>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-6 rounded-lg">
                <div className="text-4xl mb-2">{character.reward}</div>
                <div className="text-2xl font-bold">+{earnedCoins} عملة ذهبية</div>
                <div className="text-sm opacity-90">مكافأة إنجاز المهمة</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">💡 رسالة تحفيزية</h3>
              <p className="text-blue-700">
                أحسنت! لقد اقتربت خطوة أخرى من تحقيق أهدافك. 
                كل جلسة تركيز تبني مستقبلاً أفضل لك! 🌟
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">💧 وقت الراحة</h3>
              <p className="text-green-700 text-sm">
                اشرب الماء • تمدد قليلاً • اغسل وجهك • خذ نفساً عميقاً
              </p>
            </div>

            <div className="flex space-x-reverse space-x-3">
              <Button 
                onClick={() => onComplete(earnedCoins)}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500"
              >
                إنهاء اليوم 🏠
              </Button>
              <Button 
                onClick={() => {
                  setSessionState('setup');
                  setCurrentTask('');
                  setNotes('');
                }}
                variant="outline"
                className="flex-1"
              >
                جلسة أخرى 🔄
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default GameSession;

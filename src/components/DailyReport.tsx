
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';

interface DailyReportProps {
  onBack: () => void;
  coins: number;
  level: number;
}

const DailyReport = ({ onBack, coins, level }: DailyReportProps) => {
  const stats = {
    workHours: 3.5,
    waterGlasses: 6,
    completedTasks: 4,
    totalTasks: 6,
    breakTime: 45,
    coinsEarned: 85,
    levelProgress: 75
  };

  const achievements = [
    { icon: '🎯', title: 'مُنجز المهام', description: 'أكملت 4 مهام اليوم' },
    { icon: '💧', title: 'محافظ على الصحة', description: 'شربت كمية كافية من الماء' },
    { icon: '⏰', title: 'منظم الوقت', description: 'التزمت بجدولك اليومي' },
    { icon: '🌱', title: 'في نمو مستمر', description: 'تقدمت في مستوى اللعبة' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="ml-4">
            <ArrowDown className="w-4 h-4 ml-2 rotate-90" />
            العودة
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">التقرير اليومي</h1>
            <p className="text-gray-600">إنجازاتك وتقدمك اليوم</p>
          </div>
        </div>

        {/* Hero Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-2">يوم رائع!</h2>
            <p className="text-purple-100 mb-4">
              لقد حققت إنجازات مميزة اليوم. استمر على هذا المنوال!
            </p>
            <div className="flex justify-center space-x-reverse space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.workHours}</div>
                <div className="text-sm text-purple-200">ساعات عمل</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.coinsEarned}</div>
                <div className="text-sm text-purple-200">عملة ذهبية</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{level}</div>
                <div className="text-sm text-purple-200">المستوى</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold">{stats.workHours}</div>
              <div className="text-sm text-blue-100">ساعات العمل</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '70%' }} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">💧</div>
              <div className="text-2xl font-bold">{stats.waterGlasses}</div>
              <div className="text-sm text-cyan-100">أكواب الماء</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold">{stats.completedTasks}/{stats.totalTasks}</div>
              <div className="text-sm text-green-100">المهام المكتملة</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🛌</div>
              <div className="text-2xl font-bold">{stats.breakTime}</div>
              <div className="text-sm text-yellow-100">دقائق الراحة</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '60%' }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">📊</span>
              تقدم الأسبوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => {
                const progress = Math.random() * 100;
                const isToday = index === 3; // Wednesday for example
                return (
                  <div key={day} className="flex items-center space-x-reverse space-x-4">
                    <div className={`w-16 text-sm ${isToday ? 'font-bold text-purple-600' : 'text-gray-600'}`}>
                      {day}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          isToday ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm text-gray-600 text-left">
                      {Math.round(progress)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">🏅</span>
              إنجازات اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-reverse space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tomorrow's Goals */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">🌅</span>
              أهداف الغد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg">
              <h3 className="font-bold text-emerald-800 mb-3">💡 اقتراحات لغد أفضل:</h3>
              <div className="space-y-2 text-sm text-emerald-700">
                <div>• زد من فترات الراحة بين الجلسات</div>
                <div>• اشرب المزيد من الماء (الهدف: 8 أكواب)</div>
                <div>• جرب تقنية البومودورو لزيادة التركيز</div>
                <div>• خذ استراحة للمشي كل ساعتين</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyReport;

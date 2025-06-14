
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, TrendingUp, TrendingDown, Award, Clock, Target } from 'lucide-react';

interface DailyReportProps {
  onBack: () => void;
  coins: number;
  level: number;
}

const DailyReport = ({ onBack, coins, level }: DailyReportProps) => {
  const todayStats = {
    workHours: 4.2,
    focusTime: 3.5,
    breakTime: 45,
    waterGlasses: 8,
    completedTasks: 7,
    totalTasks: 9,
    coinsEarned: 125,
    productivity: 89,
    mood: 'ممتاز',
    sessionsCompleted: 5,
    averageSessionTime: 25,
    focusScore: 92,
    healthScore: 85
  };

  const weeklyComparison = [
    { day: 'السبت', hours: 3.2, productivity: 78, coins: 85 },
    { day: 'الأحد', hours: 4.5, productivity: 85, coins: 110 },
    { day: 'الاثنين', hours: 2.8, productivity: 72, coins: 70 },
    { day: 'الثلاثاء', hours: 3.9, productivity: 88, coins: 95 },
    { day: 'الأربعاء', hours: 4.2, productivity: 89, coins: 125 },
    { day: 'الخميس', hours: 0, productivity: 0, coins: 0 },
    { day: 'الجمعة', hours: 0, productivity: 0, coins: 0 }
  ];

  const achievements = [
    { icon: '🏆', title: 'مُنجز اليوم', description: 'أكملت 7 من 9 مهام', color: 'bg-yellow-100 text-yellow-800' },
    { icon: '💧', title: 'محارب العطش', description: 'شربت 8 أكواب ماء!', color: 'bg-blue-100 text-blue-800' },
    { icon: '⏰', title: 'سيد الوقت', description: 'حققت 4+ ساعات تركيز', color: 'bg-green-100 text-green-800' },
    { icon: '🎯', title: 'مركز فائق', description: 'نسبة تركيز 92%', color: 'bg-purple-100 text-purple-800' },
    { icon: '🌟', title: 'متسق ومنتظم', description: 'اليوم الثالث متتالي', color: 'bg-orange-100 text-orange-800' },
    { icon: '💪', title: 'طاقة إيجابية', description: 'مزاج ممتاز طوال اليوم', color: 'bg-pink-100 text-pink-800' }
  ];

  const taskBreakdown = [
    { category: 'العمل', completed: 4, total: 5, time: '2.5 ساعة' },
    { category: 'التعلم', completed: 2, total: 2, time: '1.2 ساعة' },
    { category: 'الصحة', completed: 1, total: 2, time: '0.5 ساعة' }
  ];

  const timeDistribution = [
    { activity: 'العمل المركز', time: 3.5, percentage: 83, color: 'bg-emerald-500' },
    { activity: 'الاستراحات', time: 0.75, percentage: 18, color: 'bg-blue-500' },
    { activity: 'التشتت', time: 0.2, percentage: 5, color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="ml-4">
              <ArrowDown className="w-4 h-4 ml-2 rotate-90" />
              العودة
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">تقرير اليوم المفصل</h1>
              <p className="text-gray-600">الأربعاء، 14 يونيو 2025 - تحليل شامل لأدائك</p>
            </div>
          </div>
          <div className="flex items-center space-x-reverse space-x-4">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              <TrendingUp className="w-4 h-4 ml-1" />
              +15% من الأمس
            </Badge>
          </div>
        </div>

        {/* Hero Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">يوم رائع! 🎉</h2>
                  <p className="text-indigo-100 text-lg">أداء متميز وإنجازات مبهرة</p>
                </div>
                <div className="text-6xl opacity-30">📊</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{todayStats.workHours}</div>
                  <div className="text-sm text-indigo-200">ساعات العمل</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{todayStats.productivity}%</div>
                  <div className="text-sm text-indigo-200">الإنتاجية</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{todayStats.coinsEarned}</div>
                  <div className="text-sm text-indigo-200">عملة ذهبية</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{level}</div>
                  <div className="text-sm text-indigo-200">المستوى</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 ml-2 text-green-600" />
                أهداف اليوم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">إكمال المهام</span>
                  <Badge className="bg-green-100 text-green-800">7/9</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">ساعات التركيز</span>
                  <Badge className="bg-blue-100 text-blue-800">4.2/4</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '105%' }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">شرب الماء</span>
                  <Badge className="bg-cyan-100 text-cyan-800">8/8</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{todayStats.focusTime}h</div>
              <div className="text-sm text-emerald-100">وقت التركيز الصافي</div>
              <div className="mt-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                +30 دقيقة عن الأمس
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{todayStats.focusScore}%</div>
              <div className="text-sm text-blue-100">نقاط التركيز</div>
              <div className="mt-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                تقييم ممتاز
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold">{todayStats.sessionsCompleted}</div>
              <div className="text-sm text-purple-100">جلسات مكتملة</div>
              <div className="mt-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                معدل 25 دقيقة
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-400 to-pink-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">😊</div>
              <div className="text-xl font-bold">{todayStats.mood}</div>
              <div className="text-sm text-pink-100">الحالة المزاجية</div>
              <div className="mt-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                مستقر طوال اليوم
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">⏱️</span>
              توزيع الوقت التفصيلي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-reverse space-x-4">
                  <div className="w-24 text-sm font-medium">{item.activity}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                    <div 
                      className={`h-4 rounded-full ${item.color} transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                      {item.time} ساعة
                    </span>
                  </div>
                  <div className="w-16 text-sm text-gray-600 text-left">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">📋</span>
              تفصيل المهام حسب الفئة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الفئة</TableHead>
                  <TableHead>المكتمل</TableHead>
                  <TableHead>المجموع</TableHead>
                  <TableHead>الوقت المستغرق</TableHead>
                  <TableHead>معدل الإنجاز</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taskBreakdown.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{category.category}</TableCell>
                    <TableCell>{category.completed}</TableCell>
                    <TableCell>{category.total}</TableCell>
                    <TableCell>{category.time}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        (category.completed / category.total) >= 0.8 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {Math.round((category.completed / category.total) * 100)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Weekly Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">📈</span>
              مقارنة الأسبوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyComparison.map((day, index) => {
                const isToday = index === 4;
                const hasData = day.hours > 0;
                return (
                  <div key={day.day} className={`flex items-center space-x-reverse space-x-4 p-4 rounded-lg ${
                    isToday ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-gray-50'
                  }`}>
                    <div className={`w-20 text-sm font-medium ${isToday ? 'text-indigo-600' : 'text-gray-600'}`}>
                      {day.day}
                      {isToday && <span className="block text-xs text-indigo-500">اليوم</span>}
                    </div>
                    
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">الساعات</div>
                        <div className={`font-bold ${hasData ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {hasData ? `${day.hours}h` : 'لا يوجد'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500">الإنتاجية</div>
                        <div className={`font-bold ${hasData ? 'text-blue-600' : 'text-gray-400'}`}>
                          {hasData ? `${day.productivity}%` : '-'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500">العملات</div>
                        <div className={`font-bold ${hasData ? 'text-yellow-600' : 'text-gray-400'}`}>
                          {hasData ? `${day.coins} 💰` : '-'}
                        </div>
                      </div>
                    </div>
                    
                    {hasData && (
                      <div className="w-16">
                        {day.productivity > 85 ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : day.productivity > 70 ? (
                          <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">🏅</span>
              إنجازات وأوسمة اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-reverse space-x-4 p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <Badge className={achievement.color}>جديد!</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights & Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl ml-2">🤖</span>
              نصائح الذكاء الاصطناعي لغد أفضل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800 mb-3 flex items-center">
                  ✅ ما تقوم به بشكل ممتاز
                </h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• المحافظة على شرب الماء بانتظام</li>
                  <li>• تحقيق أكثر من 4 ساعات تركيز يومياً</li>
                  <li>• نسبة إنجاز عالية في مهام العمل</li>
                  <li>• الحفاظ على مزاج إيجابي</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                  🎯 مجالات للتطوير
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• زيادة فترات الراحة بين الجلسات</li>
                  <li>• إكمال مهام الصحة والرياضة</li>
                  <li>• تقليل وقت التشتت أكثر</li>
                  <li>• التنويع في أنواع المهام</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-3 flex items-center">
                  💡 اقتراحات للغد
                </h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• ابدأ بمهمة صعبة في الصباح</li>
                  <li>• خذ استراحة 10 دقائق كل ساعة</li>
                  <li>• اشرب كوب ماء قبل كل جلسة</li>
                  <li>• اقرأ لمدة 15 دقيقة قبل النوم</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                <h3 className="font-bold text-orange-800 mb-3 flex items-center">
                  ⚠️ تحذيرات صحية
                </h3>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• لا تتجاوز 5 ساعات عمل متواصل</li>
                  <li>• تأكد من النوم 7-8 ساعات</li>
                  <li>• مارس تمارين العين كل 30 دقيقة</li>
                  <li>• قف واتحرك كل ساعتين</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyReport;

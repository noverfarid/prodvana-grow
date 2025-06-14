
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameStoreProps {
  coins: number;
  onPurchase: (cost: number) => void;
  onBack: () => void;
}

const GameStore = ({ coins, onPurchase, onBack }: GameStoreProps) => {
  const { toast } = useToast();

  const farmItems = [
    {
      id: 'farm_upgrade_1',
      name: 'أرض زراعية متوسطة',
      description: 'ضاعف إنتاجية المزرعة',
      cost: 200,
      emoji: '🌾',
      bonus: '+50% عملات إضافية'
    },
    {
      id: 'farm_upgrade_2',
      name: 'أرض زراعية كبيرة',
      description: 'مزرعة واسعة بإنتاجية عالية',
      cost: 500,
      emoji: '🚜',
      bonus: '+100% عملات إضافية'
    },
    {
      id: 'farm_seeds',
      name: 'بذور ذهبية',
      description: 'بذور نادرة تنتج محاصيل ثمينة',
      cost: 150,
      emoji: '✨',
      bonus: '+25% جودة المحصول'
    },
    {
      id: 'farm_tools',
      name: 'أدوات زراعية متطورة',
      description: 'أدوات تسرع عملية الزراعة',
      cost: 300,
      emoji: '🛠️',
      bonus: 'وقت أقل للنمو'
    }
  ];

  const fishingItems = [
    {
      id: 'boat_upgrade_1',
      name: 'مركب متوسط',
      description: 'مركب أسرع وأكثر استقراراً',
      cost: 250,
      emoji: '⛵',
      bonus: '+50% احتمال صيد أكبر'
    },
    {
      id: 'boat_upgrade_2',
      name: 'يخت فاخر',
      description: 'يخت بأحدث معدات الصيد',
      cost: 600,
      emoji: '🛥️',
      bonus: '+100% قيمة الأسماك'
    },
    {
      id: 'fishing_net',
      name: 'شبكة صيد ذهبية',
      description: 'شبكة تصطاد أسماكاً نادرة',
      cost: 180,
      emoji: '🕸️',
      bonus: 'أسماك نادرة'
    },
    {
      id: 'sonar',
      name: 'جهاز السونار',
      description: 'يحدد مواقع الأسماك بدقة',
      cost: 350,
      emoji: '📡',
      bonus: 'ضمان صيد ناجح'
    }
  ];

  const characters = [
    {
      id: 'farmer_pro',
      name: 'مزارع محترف',
      description: 'مزارع خبير بمهارات متقدمة',
      cost: 400,
      emoji: '👨‍🌾',
      bonus: 'خبرة مضاعفة'
    },
    {
      id: 'fisherman_pro',
      name: 'صياد ماهر',
      description: 'صياد محترف بخبرة واسعة',
      cost: 450,
      emoji: '🎣',
      bonus: 'مهارة صيد عالية'
    },
    {
      id: 'scientist',
      name: 'عالم الإنتاجية',
      description: 'خبير في تحسين الأداء',
      cost: 800,
      emoji: '👨‍🔬',
      bonus: 'تحليلات متقدمة'
    }
  ];

  const handlePurchase = (item: any) => {
    if (coins >= item.cost) {
      onPurchase(item.cost);
      toast({
        title: "🎉 تم الشراء بنجاح!",
        description: `حصلت على ${item.name}`,
      });
    } else {
      toast({
        title: "❌ عملات غير كافية",
        description: `تحتاج ${item.cost - coins} عملة إضافية`,
        variant: "destructive",
      });
    }
  };

  const ItemCard = ({ item, category }: { item: any, category: string }) => {
    const canAfford = coins >= item.cost;
    
    return (
      <Card className={`relative transition-all duration-300 hover:scale-105 ${canAfford ? 'border-emerald-200 hover:border-emerald-400' : 'border-gray-200 opacity-70'}`}>
        <CardHeader className="text-center pb-4">
          <div className="text-4xl mb-2">{item.emoji}</div>
          <CardTitle className="text-lg">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">{item.description}</p>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="text-xs text-yellow-800 font-medium">المكافأة:</div>
            <div className="text-sm text-yellow-700">{item.bonus}</div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant={canAfford ? "default" : "secondary"} className="bg-yellow-100 text-yellow-800">
              <Coins className="w-3 h-3 ml-1" />
              {item.cost}
            </Badge>
            <Button 
              onClick={() => handlePurchase(item)}
              disabled={!canAfford}
              className={`h-8 text-xs ${canAfford ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : ''}`}
            >
              {canAfford ? 'شراء' : 'غير متاح'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center space-x-reverse space-x-3">
            <h1 className="text-2xl font-bold text-gray-800">متجر اللعبة</h1>
            <div className="text-3xl">🏪</div>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2">
            <Coins className="w-5 h-5 ml-2" />
            {coins}
          </Badge>
        </div>

        {/* Store Tabs */}
        <Tabs defaultValue="farm" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="farm" className="flex items-center space-x-reverse space-x-2">
              <span>🌾</span>
              <span>تطوير المزرعة</span>
            </TabsTrigger>
            <TabsTrigger value="fishing" className="flex items-center space-x-reverse space-x-2">
              <span>🎣</span>
              <span>تطوير الصيد</span>
            </TabsTrigger>
            <TabsTrigger value="characters" className="flex items-center space-x-reverse space-x-2">
              <span>👥</span>
              <span>الشخصيات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farm">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-emerald-700 mb-2">تطويرات المزرعة</h2>
              <p className="text-gray-600">طور مزرعتك واحصل على محاصيل أكثر وعملات إضافية</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {farmItems.map((item) => (
                <ItemCard key={item.id} item={item} category="farm" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fishing">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-blue-700 mb-2">تطويرات الصيد</h2>
              <p className="text-gray-600">حسن معدات الصيد واصطد أسماكاً أكثر قيمة</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {fishingItems.map((item) => (
                <ItemCard key={item.id} item={item} category="fishing" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="characters">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-purple-700 mb-2">الشخصيات</h2>
              <p className="text-gray-600">اكتسب شخصيات جديدة بمهارات وخبرات متنوعة</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((item) => (
                <ItemCard key={item.id} item={item} category="characters" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="text-4xl ml-4">💡</div>
              <div>
                <h3 className="text-xl font-bold">نصائح المتجر</h3>
                <p className="text-purple-100">كيف تحصل على عملات أكثر</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 p-3 rounded-lg">
                <div className="font-bold mb-1">⏰ جلسات أطول</div>
                <div>كل دقيقة إضافية = عملات أكثر</div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <div className="font-bold mb-1">🎯 إنجاز المهام</div>
                <div>أكمل مهامك اليومية لمكافآت إضافية</div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <div className="font-bold mb-1">🔥 الانتظام</div>
                <div>ادخل يومياً واحصل على مكافآت الولاء</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameStore;

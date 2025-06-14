
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Brain, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalityAnalysisProps {
  onBack: () => void;
}

const PersonalityAnalysis = ({ onBack }: PersonalityAnalysisProps) => {
  const [currentStep, setCurrentStep] = useState<'category' | 'questions' | 'results'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const categories = [
    {
      id: 'mood',
      title: 'تحليل المزاج اليومي',
      description: 'اكتشف مزاجك الحالي واحصل على نصائح لتحسين إنتاجيتك',
      emoji: '😊',
      color: 'bg-emerald-100 border-emerald-300'
    },
    {
      id: 'personality',
      title: 'تحليل الشخصية الشامل',
      description: 'فهم أعمق لشخصيتك ونقاط القوة والضعف',
      emoji: '🧠',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: 'stress',
      title: 'تقييم التوتر والضغط النفسي',
      description: 'اكتشف مستوى التوتر وطرق التعامل معه',
      emoji: '😰',
      color: 'bg-orange-100 border-orange-300'
    }
  ];

  const questionSets = {
    mood: [
      {
        question: 'كيف تشعر عندما تستيقظ في الصباح؟',
        options: ['متحمس ومليء بالطاقة', 'هادئ ومستقر', 'متعب قليلاً', 'لا أريد الخروج من السرير']
      },
      {
        question: 'ما الذي يحفزك أكثر لإنجاز المهام؟',
        options: ['المكافآت والتقدير', 'تحقيق الأهداف الشخصية', 'مساعدة الآخرين', 'تجنب المشاكل']
      },
      {
        question: 'كيف تتعامل مع الضغوط اليومية؟',
        options: ['أواجهها بثقة', 'أخطط وأنظم', 'أطلب المساعدة', 'أشعر بالإرهاق']
      },
      {
        question: 'ما هو أفضل وقت في اليوم لإنتاجيتك؟',
        options: ['الصباح الباكر', 'منتصف النهار', 'المساء', 'ليس لدي وقت محدد']
      },
      {
        question: 'كيف تشعر تجاه التحديات الجديدة؟',
        options: ['متحمس ومتشوق', 'حذر ولكن مستعد', 'قلق قليلاً', 'أتجنبها قدر الإمكان']
      }
    ],
    personality: [
      {
        question: 'في المواقف الاجتماعية، أنت عادة:',
        options: ['الشخص الذي يبدأ المحادثات', 'أستمع أكثر مما أتحدث', 'أتفاعل حسب الموقف', 'أفضل البقاء في الخلفية']
      },
      {
        question: 'عند اتخاذ القرارات المهمة:',
        options: ['أعتمد على حدسي وشعوري', 'أحلل الحقائق والبيانات', 'أستشير الآخرين', 'أؤجل القرار قدر الإمكان']
      },
      {
        question: 'أسلوبك في العمل:',
        options: ['أحب التنوع والتجديد', 'أفضل الروتين والنظام', 'أعمل بدفعات من الطاقة', 'أحتاج إلى تحفيز خارجي']
      },
      {
        question: 'عندما تواجه مشكلة صعبة:',
        options: ['أبحث عن حلول إبداعية', 'أتبع خطوات منطقية', 'أطلب المساعدة فوراً', 'أشعر بالإحباط وأتوقف']
      },
      {
        question: 'نظرتك للمستقبل:',
        options: ['متفائل ومليء بالأحلام', 'واقعي ومخطط', 'متغير حسب الظروف', 'قلق ومتردد']
      }
    ],
    stress: [
      {
        question: 'كم مرة تشعر بالتوتر أسبوعياً؟',
        options: ['نادراً', 'أحياناً', 'غالباً', 'يومياً تقريباً']
      },
      {
        question: 'ما هي أعراض التوتر التي تظهر عليك؟',
        options: ['صداع وتوتر عضلي', 'صعوبة في النوم', 'تغيرات في الشهية', 'تقلبات مزاجية حادة']
      },
      {
        question: 'أكبر مصادر التوتر في حياتك:',
        options: ['ضغط العمل/الدراسة', 'المشاكل المالية', 'العلاقات الشخصية', 'عدم اليقين من المستقبل']
      },
      {
        question: 'كيف تتعامل مع التوتر حالياً؟',
        options: ['الرياضة والنشاط البدني', 'التأمل والاسترخاء', 'التحدث مع الأصدقاء', 'تجاهل المشكلة']
      },
      {
        question: 'مدى تأثير التوتر على إنتاجيتك:',
        options: ['لا يؤثر كثيراً', 'يقلل قليلاً من أدائي', 'يؤثر بشكل ملحوظ', 'يشل قدرتي على العمل']
      }
    ]
  };

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentStep('questions');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questionSets[selectedCategory as keyof typeof questionSets].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateResults(newAnswers);
    }
  };

  const generateResults = (allAnswers: number[]) => {
    let analysisResults;

    if (selectedCategory === 'mood') {
      const score = allAnswers.reduce((sum, answer) => sum + (3 - answer), 0);
      if (score >= 12) {
        analysisResults = {
          title: 'مزاج إيجابي ممتاز! 😊',
          score: score,
          maxScore: 15,
          strengths: ['طاقة عالية', 'تحفيز ذاتي قوي', 'نظرة إيجابية للحياة'],
          weaknesses: ['قد تحتاج لتجنب الإفراط في التفاؤل'],
          recommendations: [
            'استثمر طاقتك الإيجابية في مشاريع جديدة',
            'شارك حماسك مع الآخرين لتحفيزهم',
            'حافظ على هذا المزاج بممارسة الرياضة والأنشطة المفضلة'
          ]
        };
      } else if (score >= 8) {
        analysisResults = {
          title: 'مزاج متوازن 😌',
          score: score,
          maxScore: 15,
          strengths: ['استقرار عاطفي', 'قدرة على التكيف', 'توازن جيد'],
          weaknesses: ['قد تحتاج لمزيد من التحفيز أحياناً'],
          recommendations: [
            'ضع أهدافاً واضحة لزيادة الحماس',
            'جرب أنشطة جديدة لكسر الروتين',
            'اعتن بنفسك بشكل منتظم'
          ]
        };
      } else {
        analysisResults = {
          title: 'تحتاج لتحسين المزاج 😔',
          score: score,
          maxScore: 15,
          strengths: ['وعي بالمشاعر', 'صدق مع الذات'],
          weaknesses: ['طاقة منخفضة', 'قد تحتاج لدعم إضافي'],
          recommendations: [
            'ابدأ بخطوات صغيرة لتحسين يومك',
            'مارس تمارين التنفس والاسترخاء',
            'تحدث مع صديق أو مختص إذا استمر الوضع',
            'اهتم بنومك وتغذيتك'
          ]
        };
      }
    } else if (selectedCategory === 'personality') {
      analysisResults = {
        title: 'تحليل شخصيتك',
        score: 0,
        maxScore: 0,
        strengths: ['قدرة على التحليل', 'وعي بالذات', 'مرونة في التفكير'],
        weaknesses: ['قد تحتاج لتطوير الثقة بالنفس'],
        recommendations: [
          'ركز على نقاط قوتك واستثمرها',
          'تقبل نقاط ضعفك واعمل على تطويرها تدريجياً',
          'ضع خطة شخصية للنمو والتطوير'
        ]
      };
    } else {
      const stressLevel = allAnswers.reduce((sum, answer) => sum + answer, 0);
      analysisResults = {
        title: stressLevel <= 5 ? 'مستوى توتر منخفض 😌' : stressLevel <= 10 ? 'مستوى توتر متوسط 😐' : 'مستوى توتر عالي 😰',
        score: stressLevel,
        maxScore: 20,
        strengths: stressLevel <= 5 ? ['إدارة جيدة للضغوط'] : ['وعي بمصادر التوتر'],
        weaknesses: stressLevel > 10 ? ['تأثير سلبي على الإنتاجية', 'حاجة لاستراتيجيات أفضل'] : [],
        recommendations: stressLevel > 10 ? [
          'مارس تقنيات الاسترخاء يومياً',
          'نظم وقتك وحدد أولوياتك',
          'لا تتردد في طلب المساعدة المهنية'
        ] : [
          'حافظ على استراتيجياتك الحالية',
          'شارك خبرتك مع الآخرين'
        ]
      };
    }

    setResults(analysisResults);
    setCurrentStep('results');
    
    toast({
      title: "تم إكمال التحليل! 🎉",
      description: "تم تحليل إجاباتك وإعداد التوصيات المناسبة لك",
    });
  };

  if (currentStep === 'category') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="flex items-center">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center space-x-reverse space-x-3">
              <h1 className="text-2xl font-bold text-gray-800">تحليل الشخصية</h1>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div></div>
          </div>

          <Card className="mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">اكتشف شخصيتك وحسن من إنتاجيتك! 🚀</h2>
              <p className="text-purple-100">
                اختر نوع التحليل المناسب لك واحصل على رؤى عميقة حول شخصيتك وطرق تحسين أدائك
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-1 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${category.color}`}
                onClick={() => selectCategory(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-reverse space-x-4">
                    <div className="text-4xl">{category.emoji}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-800">{category.title}</CardTitle>
                      <p className="text-gray-600 mt-2">{category.description}</p>
                    </div>
                    <Button variant="outline" className="ml-4">
                      ابدأ التحليل
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'questions') {
    const questions = questionSets[selectedCategory as keyof typeof questionSets];
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setCurrentStep('category')} className="flex items-center">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة
            </Button>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              السؤال {currentQuestion + 1} من {questions.length}
            </Badge>
          </div>

          <div className="mb-6">
            <Progress value={progress} className="w-full h-3" />
            <p className="text-sm text-gray-600 mt-2 text-center">{Math.round(progress)}% مكتمل</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-800">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full h-auto p-4 text-right justify-start hover:bg-purple-50 hover:border-purple-300"
                  onClick={() => answerQuestion(index)}
                >
                  <span className="text-wrap">{option}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setCurrentStep('category')} className="flex items-center">
              <ArrowLeft className="w-4 h-4 ml-2" />
              تحليل جديد
            </Button>
            <div className="flex items-center space-x-reverse space-x-3">
              <h1 className="text-2xl font-bold text-gray-800">نتائج التحليل</h1>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <Button onClick={onBack} variant="outline">
              الرئيسية
            </Button>
          </div>

          <Card className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6 text-center">
              <h2 className="text-3xl font-bold mb-2">{results.title}</h2>
              {results.score > 0 && (
                <div className="text-lg text-green-100">
                  النتيجة: {results.score} من {results.maxScore}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <span className="ml-2">✨</span>
                  نقاط القوة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-center text-green-700">
                      <span className="ml-2">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {results.weaknesses.length > 0 && (
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800 flex items-center">
                    <span className="ml-2">⚠️</span>
                    نقاط التطوير
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-center text-orange-700">
                        <span className="ml-2">•</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <span className="ml-2">💡</span>
                التوصيات والنصائح
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start text-blue-700">
                    <span className="ml-2 mt-1">🔹</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Button 
              onClick={() => setCurrentStep('category')}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            >
              إجراء تحليل آخر
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PersonalityAnalysis;

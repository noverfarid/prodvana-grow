
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown } from 'lucide-react';

interface LoginFormProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
}

const LoginForm = ({ onLogin, onBack }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    birthDate: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      onLogin({
        ...formData,
        isTrial: false
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-4 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowDown className="w-4 h-4 ml-2 rotate-90" />
            العودة
          </Button>
          <div className="text-4xl mb-2">🌟</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">انضم إلى عائلة نماء</h2>
          <p className="text-gray-600">سجل حسابك وابدأ رحلة الإنتاجية</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-xl text-gray-800">إنشاء حساب جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-right block mb-2">الاسم الكامل</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-right"
                  placeholder="اكتب اسمك هنا"
                  required
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-right block mb-2">العمر</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="text-right"
                  placeholder="كم عمرك؟"
                />
              </div>

              <div>
                <Label htmlFor="birthDate" className="text-right block mb-2">تاريخ الميلاد</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-right block mb-2">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="text-right"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-right block mb-2">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="text-right"
                  placeholder="اختر كلمة مرور قوية"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg transition-all duration-300"
              >
                إنشاء الحساب والبدء 🚀
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;

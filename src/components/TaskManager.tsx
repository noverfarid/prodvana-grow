
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowDown, Calendar, Clock, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaskManagerProps {
  onBack: () => void;
}

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const TaskManager = ({ onBack }: TaskManagerProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'مراجعة مشروع العمل', time: '09:00', completed: false, priority: 'high' },
    { id: '2', title: 'قراءة الفصل الثاني', time: '11:30', completed: false, priority: 'medium' },
    { id: '3', title: 'تمارين الرياضة', time: '18:00', completed: true, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const { toast } = useToast();

  const addTask = () => {
    if (newTask.trim() && newTime) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        time: newTime,
        completed: false,
        priority: 'medium'
      };
      setTasks(prev => [...prev, task].sort((a, b) => a.time.localeCompare(b.time)));
      setNewTask('');
      setNewTime('');
      toast({
        title: "✅ تمت الإضافة",
        description: "تم إضافة المهمة بنجاح",
      });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "🗑️ تم الحذف",
      description: "تم حذف المهمة",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="ml-4">
            <ArrowDown className="w-4 h-4 ml-2 rotate-90" />
            العودة
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">مهام اليوم</h1>
            <p className="text-gray-600">نظم وقتك وحقق أهدافك</p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">إنجاز اليوم</h2>
                <p className="text-emerald-100">
                  أكملت {completedTasks} من {totalTasks} مهام
                </p>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="text-6xl opacity-20">📋</div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Task */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 ml-2" />
              إضافة مهمة جديدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-reverse space-x-3">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="اكتب مهمتك هنا..."
                className="flex-1 text-right"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-32"
              />
              <Button onClick={addTask} className="bg-emerald-500 hover:bg-emerald-600">
                إضافة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة المهام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📝</div>
                  <p>لا توجد مهام بعد. أضف مهمتك الأولى!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      task.completed 
                        ? 'bg-gray-50 border-gray-200 opacity-60' 
                        : 'bg-white border-emerald-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center space-x-reverse space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 text-emerald-500 rounded"
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-reverse space-x-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{task.time}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Bell className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskManager;

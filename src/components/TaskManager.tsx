
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowDown, Calendar, Clock, Bell, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaskManagerProps {
  onBack: () => void;
  language?: 'ar' | 'en';
}

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const TaskManager = ({ onBack, language = 'ar' }: TaskManagerProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: language === 'ar' ? 'مراجعة مشروع العمل' : 'Review work project', time: '09:00 AM', completed: false, priority: 'high' },
    { id: '2', title: language === 'ar' ? 'قراءة الفصل الثاني' : 'Read chapter two', time: '11:30 AM', completed: false, priority: 'medium' },
    { id: '3', title: language === 'ar' ? 'تمارين الرياضة' : 'Exercise', time: '06:00 PM', completed: true, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTime, setEditTime] = useState('');
  const { toast } = useToast();

  const formatTimeTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const addTask = () => {
    if (newTask.trim() && newTime) {
      const formattedTime = formatTimeTo12Hour(newTime);
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        time: formattedTime,
        completed: false,
        priority: 'medium'
      };
      setTasks(prev => [...prev, task].sort((a, b) => {
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      }));
      setNewTask('');
      setNewTime('');
      
      // إعداد تنبيهات كل 12 ساعة
      scheduleTaskReminders(task);
      
      toast({
        title: language === 'ar' ? "✅ تمت الإضافة" : "✅ Added Successfully",
        description: language === 'ar' ? "تم إضافة المهمة بنجاح مع تنبيهات كل 12 ساعة" : "Task added successfully with 12-hour reminders",
      });
    }
  };

  const convertTo24Hour = (time12: string) => {
    const [time, period] = time12.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period === 'PM' && hours !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hours === 12) {
      hour24 = 0;
    }
    
    return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const scheduleTaskReminders = (task: Task) => {
    const taskTime24 = convertTo24Hour(task.time);
    const [hours, minutes] = taskTime24.split(':').map(Number);
    const taskDate = new Date();
    taskDate.setHours(hours, minutes, 0, 0);
    
    // تنبيه صباحي (8 صباحاً)
    const morningReminder = new Date(taskDate);
    morningReminder.setHours(8, 0, 0, 0);
    
    // تنبيه مسائي (8 مساءً)  
    const eveningReminder = new Date(taskDate);
    eveningReminder.setHours(20, 0, 0, 0);
    
    const now = new Date();
    
    // جدولة التنبيه الصباحي
    if (morningReminder > now) {
      setTimeout(() => {
        toast({
          title: language === 'ar' ? "🌅 تذكير صباحي" : "🌅 Morning Reminder",
          description: language === 'ar' ? `لا تنس: ${task.title}` : `Don't forget: ${task.title}`,
          duration: 10000,
        });
      }, morningReminder.getTime() - now.getTime());
    }
    
    // جدولة التنبيه المسائي
    if (eveningReminder > now) {
      setTimeout(() => {
        toast({
          title: language === 'ar' ? "🌙 تذكير مسائي" : "🌙 Evening Reminder", 
          description: language === 'ar' ? `تذكير: ${task.title}` : `Reminder: ${task.title}`,
          duration: 10000,
        });
      }, eveningReminder.getTime() - now.getTime());
    }
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    // تحويل الوقت للصيغة 24 ساعة لحقل الإدخال
    setEditTime(convertTo24Hour(task.time));
  };

  const saveEditTask = () => {
    if (editingTask && editTitle.trim() && editTime) {
      const formattedTime = formatTimeTo12Hour(editTime);
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, title: editTitle.trim(), time: formattedTime }
          : task
      ).sort((a, b) => {
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      }));
      
      setEditingTask(null);
      setEditTitle('');
      setEditTime('');
      
      toast({
        title: language === 'ar' ? "✏️ تم التحديث" : "✏️ Updated Successfully",
        description: language === 'ar' ? "تم تحديث المهمة بنجاح" : "Task updated successfully",
      });
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditTime('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: language === 'ar' ? "🗑️ تم الحذف" : "🗑️ Deleted",
      description: language === 'ar' ? "تم حذف المهمة" : "Task deleted",
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

  const getPriorityLabel = (priority: string) => {
    if (language === 'en') {
      return priority === 'high' ? 'High' : priority === 'medium' ? 'Medium' : 'Low';
    }
    return priority === 'high' ? 'عالية' : priority === 'medium' ? 'متوسطة' : 'منخفضة';
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className={language === 'ar' ? "ml-4" : "mr-4"}>
            <ArrowDown className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'} rotate-90`} />
            {language === 'ar' ? 'العودة' : 'Back'}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'مهام اليوم' : "Today's Tasks"}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' ? 'نظم وقتك وحقق أهدافك' : 'Organize your time and achieve your goals'}
            </p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {language === 'ar' ? 'إنجاز اليوم' : "Today's Progress"}
                </h2>
                <p className="text-emerald-100">
                  {language === 'ar' 
                    ? `أكملت ${completedTasks} من ${totalTasks} مهام`
                    : `Completed ${completedTasks} of ${totalTasks} tasks`
                  }
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
              <Calendar className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {language === 'ar' ? 'إضافة مهمة جديدة' : 'Add New Task'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex ${language === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={language === 'ar' ? "اكتب مهمتك هنا..." : "Write your task here..."}
                className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-32"
              />
              <Button onClick={addTask} className="bg-emerald-500 hover:bg-emerald-600">
                {language === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'قائمة المهام' : 'Task List'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📝</div>
                  <p>{language === 'ar' ? 'لا توجد مهام بعد. أضف مهمتك الأولى!' : 'No tasks yet. Add your first task!'}</p>
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
                    {editingTask?.id === task.id ? (
                      <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'} flex-1`}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-emerald-500 rounded"
                        />
                        <div className="flex-1 space-y-2">
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className={language === 'ar' ? 'text-right' : 'text-left'}
                            placeholder={language === 'ar' ? "عنوان المهمة" : "Task title"}
                          />
                          <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                            <Input
                              type="time"
                              value={editTime}
                              onChange={(e) => setEditTime(e.target.value)}
                              className="w-32"
                            />
                            <Button size="sm" onClick={saveEditTask} className="bg-green-500 hover:bg-green-600">
                              {language === 'ar' ? 'حفظ' : 'Save'}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={cancelEdit}>
                              {language === 'ar' ? 'إلغاء' : 'Cancel'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-3' : 'space-x-3'} flex-1`}>
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
                            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'} mt-1`}>
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{task.time}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                                {getPriorityLabel(task.priority)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditTask(task)}
                            className="text-blue-400 hover:text-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
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
                      </>
                    )}
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


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Plus } from 'lucide-react';
import { DailyDataService } from '@/services/dailyDataService';
import { useToast } from '@/hooks/use-toast';

interface HealthMetricsProps {
  isConnected: boolean;
}

const HealthMetrics: React.FC<HealthMetricsProps> = ({ isConnected }) => {
  const [weekData, setWeekData] = useState(DailyDataService.getWeekData());
  const [todaysData, setTodaysData] = useState(DailyDataService.getTodaysData());
  const { toast } = useToast();

  // Update data every 30 seconds to simulate real-time daily tracking
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate step updates every 30 seconds
      DailyDataService.simulateDailyStepUpdate();
      
      // Update state with new data
      setTodaysData(DailyDataService.getTodaysData());
      setWeekData(DailyDataService.getWeekData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleMealLogged = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    DailyDataService.simulateNutritionUpdate(mealType);
    setTodaysData(DailyDataService.getTodaysData());
    
    toast({
      title: "Meal Logged",
      description: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} nutrition updated!`,
    });
  };

  const tirenessData = weekData.map((day, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    tiredness: day.tiredness
  }));

  const calorieData = [
    { name: 'Consumed', value: todaysData.caloriesConsumed, color: '#ff6b6b' },
    { name: 'Burned', value: todaysData.caloriesBurned, color: '#4ecdc4' },
    { name: 'Remaining', value: Math.max(0, todaysData.caloriesBurned - todaysData.caloriesConsumed), color: '#e9ecef' },
  ];

  const stepsData = [
    { name: 'Completed', value: todaysData.steps, color: '#4ecdc4' },
    { name: 'Remaining', value: Math.max(0, 10000 - todaysData.steps), color: '#e9ecef' },
  ];

  const nutritionData = [
    { name: 'Protein', value: todaysData.nutrition.protein, max: 100 },
    { name: 'Carbs', value: todaysData.nutrition.carbs, max: 100 },
    { name: 'Fats', value: todaysData.nutrition.fats, max: 100 },
    { name: 'Fiber', value: todaysData.nutrition.fiber, max: 100 },
    { name: 'Vitamin C', value: todaysData.nutrition.vitaminC, max: 100 },
    { name: 'Iron', value: todaysData.nutrition.iron, max: 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tiredness Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-blue-600" />
              <span>Daily Tiredness Level</span>
            </div>
            <span className="text-sm text-gray-500">Weekly Trend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tirenessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="tiredness" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{todaysData.tiredness}/10</p>
            <p className="text-sm text-gray-600">Today's tiredness level</p>
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span>Nutrition & Vitamins</span>
            </div>
            <span className="text-sm text-gray-500">Today's Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nutritionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleMealLogged('breakfast')}>
              <Plus className="h-3 w-3 mr-1" />
              Breakfast
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleMealLogged('lunch')}>
              <Plus className="h-3 w-3 mr-1" />
              Lunch
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleMealLogged('dinner')}>
              <Plus className="h-3 w-3 mr-1" />
              Dinner
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calories Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span>Daily Calories</span>
            </div>
            <span className="text-sm text-gray-500">Updates with meals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={calorieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {calorieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {calorieData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Steps Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <span>Daily Steps</span>
            </div>
            <span className="text-sm text-gray-500">Updates every 30s</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={stepsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stepsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-purple-600">{todaysData.steps.toLocaleString()}</p>
            <p className="text-sm text-gray-600">of 10,000 steps</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((todaysData.steps / 10000) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetrics;

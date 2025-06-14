
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface HealthMetricsProps {
  isConnected: boolean;
}

const HealthMetrics: React.FC<HealthMetricsProps> = ({ isConnected }) => {
  const tirenessData = [
    { day: 'Mon', tiredness: 3 },
    { day: 'Tue', tiredness: 5 },
    { day: 'Wed', tiredness: 2 },
    { day: 'Thu', tiredness: 7 },
    { day: 'Fri', tiredness: 4 },
    { day: 'Sat', tiredness: 6 },
    { day: 'Sun', tiredness: 3 },
  ];

  const calorieData = [
    { name: 'Consumed', value: 1800, color: '#ff6b6b' },
    { name: 'Burned', value: 2200, color: '#4ecdc4' },
    { name: 'Remaining', value: 400, color: '#e9ecef' },
  ];

  const stepsData = [
    { name: 'Completed', value: 8500, color: '#4ecdc4' },
    { name: 'Remaining', value: 1500, color: '#e9ecef' },
  ];

  const nutritionData = [
    { name: 'Protein', value: 85, max: 100 },
    { name: 'Carbs', value: 65, max: 100 },
    { name: 'Fats', value: 70, max: 100 },
    { name: 'Fiber', value: 45, max: 100 },
    { name: 'Vitamin C', value: 90, max: 100 },
    { name: 'Iron', value: 60, max: 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tiredness Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-blue-600" />
            <span>Daily Tiredness Level</span>
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
        </CardContent>
      </Card>

      {/* Nutrition Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span>Nutrition & Vitamins</span>
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
        </CardContent>
      </Card>

      {/* Calories Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span>Daily Calories</span>
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
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-600" />
            <span>Daily Steps</span>
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
            <p className="text-2xl font-bold text-purple-600">8,500</p>
            <p className="text-sm text-gray-600">of 10,000 steps</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetrics;

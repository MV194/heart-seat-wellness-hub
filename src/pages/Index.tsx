
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Heart, Bluetooth, Activity, AlertTriangle, User, Calendar, Stethoscope } from 'lucide-react';
import BluetoothConnection from '@/components/BluetoothConnection';
import HealthMetrics from '@/components/HealthMetrics';
import EmergencyAlert from '@/components/EmergencyAlert';
import MedicalHistory from '@/components/MedicalHistory';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentHeartRate, setCurrentHeartRate] = useState(72);
  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: 45,
    room: "Room 204",
    condition: "Stable"
  });
  const { toast } = useToast();

  // Simulate real-time heart rate updates
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        const newHeartRate = 65 + Math.random() * 20;
        setCurrentHeartRate(Math.round(newHeartRate));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  // Monitor for emergency conditions
  useEffect(() => {
    if (currentHeartRate < 50 || currentHeartRate > 100) {
      toast({
        title: "Emergency Alert",
        description: `Heart rate ${currentHeartRate < 50 ? 'too low' : 'too high'}: ${currentHeartRate} BPM`,
        variant: "destructive",
      });
    }
  }, [currentHeartRate, toast]);

  const handleBluetoothConnect = () => {
    setIsConnected(true);
    toast({
      title: "Connected",
      description: "Successfully connected to hospital chair",
    });
  };

  const handleBluetoothDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Disconnected from hospital chair",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hospital Chair Monitor</h1>
              <p className="text-gray-600">Real-time patient monitoring system</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
            <Badge variant={isConnected ? "default" : "secondary"} className="mt-1">
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </div>

        {/* Bluetooth Connection */}
        <BluetoothConnection 
          isConnected={isConnected}
          onConnect={handleBluetoothConnect}
          onDisconnect={handleBluetoothDisconnect}
        />

        {/* Patient Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Patient Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{patientData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">{patientData.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{patientData.room}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {patientData.condition}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Monitoring */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-red-700">
                <span className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Heart Rate</span>
                </span>
                {isConnected && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{currentHeartRate}</div>
              <p className="text-sm text-red-600">BPM</p>
              <Progress value={currentHeartRate} max={120} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-blue-700">
                <Activity className="h-5 w-5" />
                <span>Blood Pressure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">120/80</div>
              <p className="text-sm text-blue-600">mmHg</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <Activity className="h-5 w-5" />
                <span>Glucose Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">95</div>
              <p className="text-sm text-green-600">mg/dL</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-purple-700">
                <Activity className="h-5 w-5" />
                <span>Oxygen Sat</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">98</div>
              <p className="text-sm text-purple-600">%</p>
            </CardContent>
          </Card>
        </div>

        {/* Health Metrics */}
        <HealthMetrics isConnected={isConnected} />

        {/* Emergency Alert */}
        <EmergencyAlert currentHeartRate={currentHeartRate} />

        {/* Medical History */}
        <MedicalHistory />
      </div>
    </div>
  );
};

export default Index;

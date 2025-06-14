
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EmergencyAlertProps {
  currentHeartRate: number;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ currentHeartRate }) => {
  const [alertActive, setAlertActive] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    const isEmergency = currentHeartRate < 50 || currentHeartRate > 100;
    setAlertActive(isEmergency);
    
    if (isEmergency && !notificationSent) {
      setNotificationSent(true);
      // Reset notification after 10 seconds
      setTimeout(() => setNotificationSent(false), 10000);
    }
  }, [currentHeartRate, notificationSent]);

  const nearbyDoctors = [
    { name: "Dr. Sarah Johnson", specialty: "Cardiology", distance: "2 mins away", status: "Available" },
    { name: "Dr. Michael Chen", specialty: "Emergency Medicine", distance: "5 mins away", status: "Available" },
    { name: "Dr. Emily Davis", specialty: "Internal Medicine", distance: "3 mins away", status: "In Surgery" },
  ];

  return (
    <Card className={`border-2 transition-all duration-300 ${
      alertActive 
        ? 'border-red-500 bg-red-50 shadow-lg' 
        : 'border-green-200 bg-green-50'
    }`}>
      <CardHeader>
        <CardTitle className={`flex items-center justify-between ${
          alertActive ? 'text-red-700' : 'text-green-700'
        }`}>
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`h-5 w-5 ${alertActive ? 'animate-pulse' : ''}`} />
            <span>Emergency Monitoring</span>
          </div>
          <Badge variant={alertActive ? "destructive" : "outline"} className={
            alertActive ? "animate-pulse" : "border-green-600 text-green-600"
          }>
            {alertActive ? "ALERT ACTIVE" : "NORMAL"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alertActive ? (
          <div className="space-y-4">
            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
              <p className="font-semibold text-red-800">
                Critical Alert: Heart rate {currentHeartRate < 50 ? 'too low' : 'too high'}
              </p>
              <p className="text-sm text-red-600">
                Current reading: {currentHeartRate} BPM
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-gray-900 mb-3">Nearby Available Doctors</h4>
              <div className="space-y-2">
                {nearbyDoctors.map((doctor, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {doctor.distance}
                      </p>
                      <Badge 
                        variant={doctor.status === "Available" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {doctor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1 bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency
              </Button>
              <Button variant="outline" className="flex-1 border-red-300 text-red-600">
                Send Alert to Nurse Station
              </Button>
            </div>
            
            {notificationSent && (
              <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  📱 Notification sent to available doctors at {new Date().toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-green-600 mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>
            <p className="text-green-700 font-semibold">All vitals are normal</p>
            <p className="text-sm text-green-600">Continuous monitoring active</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmergencyAlert;

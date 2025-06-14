
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Pill, Activity } from 'lucide-react';

const MedicalHistory: React.FC = () => {
  const medicalEvents = [
    {
      date: "2024-06-10",
      type: "Checkup",
      description: "Routine cardiovascular examination",
      status: "Normal",
      doctor: "Dr. Sarah Johnson"
    },
    {
      date: "2024-06-05",
      type: "Medication",
      description: "Prescribed Lisinopril 10mg daily",
      status: "Active",
      doctor: "Dr. Michael Chen"
    },
    {
      date: "2024-05-28",
      type: "Lab Results",
      description: "Blood work - Cholesterol levels",
      status: "Reviewed",
      doctor: "Dr. Sarah Johnson"
    },
    {
      date: "2024-05-15",
      type: "Procedure",
      description: "ECG monitoring session",
      status: "Completed",
      doctor: "Dr. Emily Davis"
    },
    {
      date: "2024-04-20",
      type: "Consultation",
      description: "Hypertension management review",
      status: "Follow-up",
      doctor: "Dr. Sarah Johnson"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "Checkup":
        return <Activity className="h-4 w-4" />;
      case "Medication":
        return <Pill className="h-4 w-4" />;
      case "Lab Results":
        return <FileText className="h-4 w-4" />;
      case "Procedure":
        return <Activity className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-800";
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Follow-up":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span>Medical History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medicalEvents.map((event, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {getIcon(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{event.type}</p>
                  <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                    {event.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span>{event.doctor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Current Medications</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Lisinopril</span>
              <Badge variant="outline" className="text-xs">10mg daily</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Metformin</span>
              <Badge variant="outline" className="text-xs">500mg twice daily</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Vitamin D3</span>
              <Badge variant="outline" className="text-xs">1000 IU daily</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalHistory;

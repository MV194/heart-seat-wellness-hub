
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bluetooth } from 'lucide-react';

interface BluetoothConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const BluetoothConnection: React.FC<BluetoothConnectionProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
}) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-700">
          <Bluetooth className="h-5 w-5" />
          <span>Hospital Chair Connection</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div>
              <p className="font-semibold">
                {isConnected ? 'Connected to Chair #HC-204' : 'Not Connected'}
              </p>
              <p className="text-sm text-gray-600">
                {isConnected ? 'Receiving biometric data' : 'Click to connect to hospital chair'}
              </p>
            </div>
          </div>
          <Button
            onClick={isConnected ? onDisconnect : onConnect}
            variant={isConnected ? "outline" : "default"}
            className={isConnected ? "border-red-300 text-red-600 hover:bg-red-50" : ""}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BluetoothConnection;

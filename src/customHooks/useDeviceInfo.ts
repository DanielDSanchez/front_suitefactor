import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';


interface DeviceInfoState {
  platform: string;
  serialNumber: string;
  macAddress: string;
  ipAddress: string;
}


const useDeviceInfo = (): DeviceInfoState => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoState>({
    platform: '',
    serialNumber: '',
    macAddress: '',
    ipAddress: '',
  });

  useEffect(() => {
    const getDeviceInfo = async () => {
      const platform = Capacitor.getPlatform();
      setDeviceInfo((prevDeviceInfo) => ({
        ...prevDeviceInfo,
        platform,
      }));

      if (platform === 'web') {
        const { Device } = Capacitor.Plugins;
        const { ipAddress }: any = await Device.getInfo();
        setDeviceInfo((prevDeviceInfo) => ({
          ...prevDeviceInfo,
          ipAddress,
        }));
      } else {
        // Platform is iOS, Android, or Electron
        const { serial }: any = await Capacitor.Plugins.Device.getInfo();
        setDeviceInfo((prevDeviceInfo) => ({
          ...prevDeviceInfo,
          serialNumber: serial,
        }));

        if (platform === 'electron') {
          console.log("electron");
        }
      }
    };

    getDeviceInfo();
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
import { DeviceType } from 'src/hooks/useDeviceTypeWatcher';
import { useSelector } from 'react-redux';
import { selectDeviceType } from 'src/store/slices/ui';

export const useDeviceType = (): DeviceType => {
  return useSelector(selectDeviceType);
};

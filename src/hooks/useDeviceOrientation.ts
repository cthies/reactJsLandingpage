import { DeviceOrientation } from 'src/hooks/useDeviceTypeWatcher';
import { useSelector } from 'react-redux';
import { selectDeviceOrientation } from 'src/store/slices/ui';

export const useDeviceOrientation = (): DeviceOrientation | null => {
  return useSelector(selectDeviceOrientation);
};

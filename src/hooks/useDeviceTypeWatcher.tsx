import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeviceType, setDeviceType, setDeviceOrientation } from 'src/store/slices/ui';

/** Max width value for 'mobile' device type */
const MOBILE_MAX_WIDTH = 1024;

export type DeviceType = 'mobile' | 'desktop';
export type DeviceOrientation = 'portrait' | 'landscape';

/**
 * Hook that subscribes to "resize" event and updates deviceType
 * in redux store.
 */
const useDeviceTypeWatcher = (): void => {
  const deviceTypeRef = useRef<DeviceType>(useSelector(selectDeviceType));
  const [deviceOrientation, setdeviceOrientation] = useState<DeviceOrientation | null>(null);

  const dispatch = useDispatch();

  const onDeviceTypeChange = useCallback(
    (newType: DeviceType) => {
      if (deviceTypeRef.current === newType) {
        return;
      }
      deviceTypeRef.current = newType;
      dispatch(setDeviceType(newType));
    },
    [dispatch]
  );

  const onDeviceOrientatonChange = useCallback(
    (orientation: DeviceOrientation) => {
      if (deviceOrientation === orientation) {
        return;
      }
      setdeviceOrientation(orientation);
      dispatch(setDeviceOrientation(orientation));
    },
    [deviceOrientation, dispatch]
  );

  useEffect(() => {
    const onSizeChange = (): void => {
      const width = window.innerWidth;
      if (width !== undefined) {
        const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
        onDeviceOrientatonChange(orientation);
        deviceTypeRef.current === 'mobile' && width > MOBILE_MAX_WIDTH
          ? onDeviceTypeChange('desktop')
          : deviceTypeRef.current === 'mobile' || width <= MOBILE_MAX_WIDTH
          ? onDeviceTypeChange('mobile')
          : onDeviceTypeChange('desktop');
      }
    };

    window.addEventListener('resize', onSizeChange);
    onSizeChange();
    return () => window.removeEventListener('resize', onSizeChange);
  }, [onDeviceOrientatonChange, onDeviceTypeChange]);
};

export default useDeviceTypeWatcher;

import { LegacyRef } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { useDeviceType } from 'src/hooks/useDeviceType';
import 'react-popper-tooltip/dist/styles.css';

type PopoverProps = {
  trigger: (ref: LegacyRef<HTMLDivElement>) => JSX.Element;
  content: () => JSX.Element | null;
  enabled?: boolean;
};

function Popover({ trigger, content, enabled = true }: PopoverProps): JSX.Element {
  const deviceType = useDeviceType();
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip(
    {
      delayHide: 100,
      interactive: true,
    },
    {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 20,
          },
        },
      ],
    }
  );

  return (
    <>
      {trigger(setTriggerRef)}
      {deviceType === 'desktop' && enabled && visible && (
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {content()}
        </div>
      )}
    </>
  );
}

export default Popover;

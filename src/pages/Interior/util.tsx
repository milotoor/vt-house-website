import * as React from 'react';
import classNames from 'classnames';


/** ======================== Types ========================================= */
type ImgProps = {
  room?: Room;
  src: string;
}

type FlexProps = {
  className?: string;
  column?: boolean;
}

export type Room =
  | 'bed_1f'
  | 'bed_2f'
  | 'bed_basement'
  | 'bed_lakeside'
  | 'bed_master'
  | 'bunk'
  | 'deck'
  | 'den'
  | 'dining'
  | 'kitchen'
  | 'living'
  | 'porch';

/** ======================== Context ======================================= */
type InteriorContextType = {
  activeRoom: Room | undefined;
  showRoom: (room: Room | undefined) => void;
};

export const InteriorContext = React.createContext<InteriorContextType>({
  activeRoom: undefined,
  showRoom: room => {}
});

/** ======================== Components ==================================== */
export const Img: React.FC<ImgProps> = ({ room, src }) => {
  const { showRoom } = React.useContext(InteriorContext);
  return (
    <img
      alt="floor plan img"
      className={classNames({ room })}
      onClick={() => room && showRoom(room)}
      src={src}
    />
  );
};

export const Flex: React.FC<FlexProps> = (props) => {
  const { column = false, ...rest } = props;
  const flexStyles = {
    display: 'flex',
    flexDirection: column ? 'column' : 'row',
  } as React.CSSProperties;

  return <div style={flexStyles} {...rest} />;
};

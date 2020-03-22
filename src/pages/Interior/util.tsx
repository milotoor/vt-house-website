import * as React from 'react';
import classNames from 'classnames';


/** ======================== Types ========================================= */
type ImgProps = {
  room?: boolean;
  src: string;
}

type FlexProps = {
  column?: boolean;
}

/** ======================== Components ==================================== */
export const Img: React.FC<ImgProps> = ({ room, src }) =>
  <img
    alt="floor plan img"
    className={classNames({ room })}
    src={src}
  />;

export const Flex: React.FC<FlexProps> = (props) => {
  const { column = false, ...rest } = props;
  const flexStyles = {
    display: 'flex',
    flexDirection: column ? 'column' : 'row',
  } as React.CSSProperties;

  return <div style={flexStyles} {...rest} />;
};

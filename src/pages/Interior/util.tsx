import * as React from 'react';
import { Carousel, Popover } from 'antd';
import classNames from 'classnames';

import roomData, { Room } from './rooms';


/** ======================== Types ========================================= */
type ImgProps = {
  room?: Room;
  src: string;
}

type FlexProps = {
  className?: string;
  column?: boolean;
}

/** ======================== Components ==================================== */
export const Img: React.FC<ImgProps> = ({ room, src }) => {
  const image = (
    <img
      alt="floor plan img"
      className={classNames({ room })}
      src={src}
    />
  );

  if (room) {
    const roomInfo = roomData[room];
    return (
      <Popover content={
        <div style={{ maxWidth: 800, overflow: 'auto' }}>
          <div style={{ display: 'inline', float: 'right', marginLeft: 10 }}>
            {
              roomInfo && (
                roomInfo.images.length === 1
                  ? <img alt={roomInfo.name} src={roomInfo.images[0].thumbnail} />
                  : (
                    <Carousel autoplay autoplaySpeed={5000} effect="fade" style={{ width: 200 }}>
                      {roomInfo?.images.map((img, i) =>
                        <img alt={roomInfo.name} key={i} src={img.thumbnail} />
                      )}
                    </Carousel>
                  )
              )
            }
          </div>
          {roomInfo.description}
        </div>
      } title={roomInfo.name}>
        {image}
      </Popover>
    );
  }

  return image;
};

export const Flex: React.FC<FlexProps> = (props) => {
  const { column = false, ...rest } = props;
  const flexStyles = {
    display: 'flex',
    flexDirection: column ? 'column' : 'row',
  } as React.CSSProperties;

  return <div style={flexStyles} {...rest} />;
};

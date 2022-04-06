import React from 'react';
import { getTilePath } from './getTile';

const MAX_ZOOM = 3;

export const VIEWPORT_SIZE = 1000;

const ZOOM_DURATION_MS = 500;

export const TILE_DIMENSION = 256;

type ZoomingState = 'in' | 'out' | 'none';

const getPositionTranslation = (zoom: number) =>
  (VIEWPORT_SIZE - TILE_DIMENSION * Math.pow(2, zoom)) / 2;

export const getTransformAndTransition = (
  zoom: number,
  zoomingState: ZoomingState
) => {
  const transition = `transform ${ZOOM_DURATION_MS}ms ease-out`;
  const baseTransform = `translate(${getPositionTranslation(
    zoom
  )}px,${getPositionTranslation(zoom)}px)`;
  if (zoomingState === 'none') {
    return {
      transform: baseTransform,
    };
  } else if (zoomingState === 'in') {
    return {
      transform: `${baseTransform} scale(2)`,
      transition,
    };
  } else if (zoomingState === 'out') {
    return {
      transform: `${baseTransform} scale(0.5)`,
      transition,
    };
  }
};

export const getRowsAndColsForZoom = (zoom: number) =>
  [...Array(Math.pow(2, zoom))].map((_, i) => i);

const Tiler: React.FC = () => {
  const [zoom, setZoom] = React.useState(1);
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);
  const [zooming, setZooming] = React.useState<ZoomingState>('none');

  React.useEffect(() => {
    if (zooming === 'in') {
      setTimeout(() => {
        setZooming('none');
        setZoom((zoom) => zoom + 1);
      }, ZOOM_DURATION_MS);
    } else if (zooming === 'out') {
      setTimeout(() => {
        setZooming('none');
        setZoom((zoom) => zoom - 1);
      }, ZOOM_DURATION_MS);
    }
  }, [zooming]);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const isZoomingIn = event.deltaY > -1;
    performZooming(isZoomingIn);
  };

  const onPan = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isPanning) {
      return;
    }
    setOrigin(([originX, originY]) => [
      originX + event.movementX,
      originY + event.movementY,
    ]);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '+') {
      performZooming(true);
    } else if (event.key === '-') {
      performZooming(false);
    }
  };

  const performZooming = (zoomIn: boolean) => {
    if (zooming === 'none') {
      if (zoomIn && zoom !== MAX_ZOOM) {
        setZooming('in');
      }
      if (!zoomIn && zoom !== 0) {
        setZooming('out');
      }
    }
  };

  const rowsAndCols = getRowsAndColsForZoom(zoom);

  return (
    <div
      style={{
        width: VIEWPORT_SIZE,
        height: VIEWPORT_SIZE,
        background: '#0009',
        overflow: 'hidden',
      }}
      onMouseDown={() => setPanning(true)}
      onMouseUp={() => setPanning(false)}
      onMouseMove={onPan}
      onMouseLeave={() => setPanning(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      data-testid="main-container"
    >
      <div
        onWheel={handleScroll}
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          width: 'fit-content',
          left: origin[0],
          top: origin[1],
          ...getTransformAndTransition(zoom, zooming),
        }}
        draggable={false}
        data-testid="transformable"
      >
        {rowsAndCols.map((col, i) => (
          <div
            draggable={false}
            style={{ display: 'flex', flexDirection: 'column' }}
            key={`col-${zoom}-${i}`}
          >
            {rowsAndCols.map((row, j) => (
              <img
                draggable={false}
                src={getTilePath(zoom, col, row)}
                alt="1"
                key={`img-${zoom}-${i}${j}`}
                data-testid={`img-${zoom}-${i}${j}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiler;

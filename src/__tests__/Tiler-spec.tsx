import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import Tiler, { getRowsAndColsForZoom } from '../tiler/Tiler';

describe('Tiler', () => {
  describe('#getRowsAndColsForZoom', () => {
    test.each([
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 8],
    ])('with zoom %p should return %p row(s)', (zoom, rows) => {
      expect(getRowsAndColsForZoom(zoom)).toHaveLength(rows);
    });
  });

  test('should render zoom 1 by default', () => {
    render(<Tiler />);
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  test('should eventually render zoom 0 on zooming out by key', async () => {
    render(<Tiler />);
    fireEvent.keyDown(screen.getByTestId('main-container'), { key: '-' });
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(1));
  });

  test('should eventually render zoom 2 on zooming in', async () => {
    render(<Tiler />);
    fireEvent.keyDown(screen.getByTestId('main-container'), { key: '+' });
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(16));
  });

  test.each([
    ['0.5', false],
    ['2', true],
  ])(
    'should have transition to scale %p during zooming in %p',
    async (scale, zoomIn) => {
      render(<Tiler />);
      fireEvent.keyDown(screen.getByTestId('main-container'), {
        key: zoomIn ? '+' : '-',
      });
      await waitFor(() => {
        expect(screen.getByTestId('transformable')).toHaveStyle(
          `transition: transform 500ms ease-out`
        );
        expect(screen.getByTestId('transformable')).toHaveStyle(
          `transform: translate(244px,244px) scale(${scale})` // translate doesn't change
        );
      });
    }
  );
});

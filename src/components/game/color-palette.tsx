import type { FC } from 'react';
import { useGame } from '../../store/store';
import { cx } from '../../utils/cx';

const COLORS = [
  [
    '#ffffff',
    '#c1c1c1',
    '#ef130b',
    '#ff7100',
    '#ffe400',
    '#00cc00',
    '#00ff91',
    '#00b2ff',
    '#231fd3',
    '#a300ba',
    '#df69a7',
    '#ffac8e',
    '#a0522d',
  ],
  [
    '#000000',
    '#505050',
    '#740b07',
    '#c23800',
    '#e8a200',
    '#004619',
    '#00785d',
    '#00569e',
    '#0e0865',
    '#550069',
    '#873554',
    '#cc774d',
    '#63300d',
  ],
];

const ColorPalette: FC = () => {
  const { currentColor, setCurrentColor, isCurrentUserDrawing } = useGame();

  if (!isCurrentUserDrawing) {
    return null;
  }

  return (
    <div>
      {COLORS.map((color, i) => (
        <div key={`color-row-${i}`} className="flex">
          {color.map((color) => (
            <button
              key={color}
              className={cx('w-10 h-10 cursor-pointer', {
                'ring-3 z-10': currentColor === color,
              })}
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;

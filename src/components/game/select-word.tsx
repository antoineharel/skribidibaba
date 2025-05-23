import type { FC } from 'react';
import { useGame } from '../../store/store';
import { socket } from '../../utils/socket';

const SelectWord: FC = () => {
  const { wordsToChoose } = useGame();

  if (!wordsToChoose) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 text-black">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Choose a word</h2>
        <ul className="flex gap-2">
          {wordsToChoose.map((word) => (
            <button
              key={word}
              className="p-2 bg-black text-white rounded cursor-pointer"
              onClick={() => {
                socket.emit('chooseWord', word);
              }}
            >
              {word}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectWord;

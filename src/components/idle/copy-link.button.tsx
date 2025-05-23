import { useState, type FC } from 'react';
import { useGame } from '../../store/store';

const CopyLinkButton: FC = () => {
  const { room } = useGame();
  const [hasCopied, setHasCopied] = useState(false);

  if (!room) {
    throw new Error('No room');
  }

  return (
    <button
      className="bg-blue-600 px-4 py-2 rounded-lg text-lg cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/?roomId=${room.id}`);
        setHasCopied(true);
        setTimeout(() => {
          setHasCopied(false);
        }, 2000);
      }}
    >
      {hasCopied ? '✅ Copied!' : 'Copy link'}
    </button>
  );
};

export default CopyLinkButton;

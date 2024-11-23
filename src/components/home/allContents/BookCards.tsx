import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '@/components/common/Text';

interface BookCardProps {
  title: string;
  src: string;
  id: number;
}

export const BookCard = ({ title, src, id }: BookCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className="flex flex-col gap-12pxr cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={src}
        alt={title}
        className="min-w-118pxr max-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
      />
      <Text
        fontSize={16}
        fontWeight={400}
        color="1C1C1E"
        className="truncate max-w-118pxr overflow-hidden whitespace-nowrap"
      >
        {title}
      </Text>
    </div>
  );
};

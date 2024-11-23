import { Text } from '@/components/common/Text';

interface SortOptionsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export const SortOptions = ({
  options,
  selected,
  onSelect,
}: SortOptionsProps) => {
  return (
    <section className="flex gap-4pxr">
      {options.map((option) => (
        <div
          key={option}
          className={`px-20pxr h-35pxr flex items-center border-[1.2px] rounded-50pxr cursor-pointer ${
            selected === option
              ? 'border-black text-black'
              : 'border-AEAEAE text-AEAEAE'
          }`}
          onClick={() => onSelect(option)}
        >
          <Text
            fontSize={18}
            fontWeight={800}
            color={selected === option ? '1C1C1E' : 'AEAEB2'}
          >
            {option}
          </Text>
        </div>
      ))}
    </section>
  );
};

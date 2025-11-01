import { Minus, Plus } from "lucide-react";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityInputProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center bg-[#F1F1F1] h-12 w-[120px]">
      <button
        onClick={handleDecrement}
        className="flex-1 flex items-center justify-center text-black/25 hover:text-primary transition-colors disabled:opacity-30"
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={16} strokeWidth={3} />
      </button>
      <span className="flex-1 text-center text-[13px] font-bold">{value}</span>
      <button
        onClick={handleIncrement}
        className="flex-1 flex items-center justify-center text-black/25 hover:text-primary transition-colors disabled:opacity-30"
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  );
}

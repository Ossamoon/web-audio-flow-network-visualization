import { createContext, useState, useContext } from "react";
import { Slider } from "@/shadcn/app/ui/slider";
import { Input } from "@/shadcn/app/ui/input";
import { Label } from "@/shadcn/app/ui/label";
import { Switch } from "@/shadcn/app/ui/switch";

const sliderContext = createContext(false);

export function SliderProvider({ children }: { children: React.ReactNode }) {
  const [slider, setSlider] = useState(true);
  return (
    <sliderContext.Provider value={slider}>
      <div className="absolute top-14 right-5 opacity-80 flex gap-1 items-center">
        <Label>Slider</Label>
        <Switch
          checked={slider}
          onCheckedChange={(checked) => setSlider(checked)}
        />
      </div>
      {children}
    </sliderContext.Provider>
  );
}

type AudioParamInputProps = {
  name: string;
  value: number;
  setValue: (value: number) => void;
  sliderOption?: {
    step?: number;
    min?: number;
    max?: number;
    logarithm?: boolean;
  };
  nonNegative?: boolean;
  id?: string;
  disabled?: boolean;
};

export function AudioParamInput({
  name,
  value,
  setValue,
  sliderOption,
  nonNegative = false,
  id = name,
  disabled = false,
}: AudioParamInputProps) {
  const slider = useContext(sliderContext);

  return slider ? (
    <div className="flex items-center gap-2">
      <Slider
        className="nodrag w-48"
        id={id}
        name={name}
        step={sliderOption?.step ?? 0.01}
        min={sliderOption?.min ?? 0}
        max={sliderOption?.max ?? 1}
        value={[sliderOption?.logarithm ? Math.log10(value) : value]}
        onValueChange={([v]) => setValue(sliderOption?.logarithm ? 10 ** v : v)}
        disabled={disabled}
      />
      <div className="w-10 font-mono">
        {Number.isInteger(sliderOption?.step)
          ? Math.floor(value)
          : value.toFixed(value < 10 ? 2 : value < 100 ? 1 : 0)}
      </div>
    </div>
  ) : (
    <Input
      className="w-52"
      id={id}
      name={name}
      type="text"
      inputMode="decimal"
      defaultValue={value.toFixed(2)}
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        if (isNaN(value)) return;
        setValue(Math.max(nonNegative ? 0 : -Infinity, value));
      }}
      disabled={disabled}
    />
  );
}

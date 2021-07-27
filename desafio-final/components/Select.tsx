import React from "react";

interface ISelectProps {
  children: string[];
  onSelectChange: (element: string) => void;
}

export default function Select({ children: items, onSelectChange }: ISelectProps) {
  function handleChange(evt: React.FormEvent<HTMLSelectElement>) {
    onSelectChange(evt.currentTarget.value);
  }

  return (
    <select onChange={handleChange}>
      {items.map((item: string, index: number) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default function Select({ children: cities, onSelectChange = null }) {
  function handleSelectChange({ currentTarget }) {
    if (onSelectChange) {
      const city = currentTarget.value;
      onSelectChange(city);
    }
  }
  return (
    <select
      className="border rounded-md text-lg font-semibold pr-4 pl-4 w-60"
      onChange={handleSelectChange}
    >
      <option value="">Selecione o municipio</option>
      {cities}
    </select>
  );
}

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE_NAMES, LANGUAGES } from '../constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LanguageSelector = ({ language, onSelect }) => {
  const items = useMemo(
    () =>
      LANGUAGES.map(([name, version, logo]) => ({
        name,
        value: name,
        label: LANGUAGE_NAMES[name],
        version,
        logo,
      })),
    []
  );

  const selected = items.find((item) => item.name === language) || items[0];

  const handleChange = (item) => {
    if (item?.name) onSelect(item.name);
  };

  return (
    <Select
      items={items}
      value={selected}
      onValueChange={handleChange}
      itemToStringValue={(item) => item?.label ?? language}
    >
      <SelectTrigger className="min-w-48" aria-label="Select language">
        <SelectValue className="gap-1.5">
          {(item) => (
            <span className="flex items-center gap-1.5">
              <img src={item?.logo} alt="" className="size-4 rounded-[2px]" />
              <span>{item?.label ?? language}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent sideOffset={4} side="bottom" alignItemWithTrigger={false} className="w-48">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.name} value={item} className="gap-2">
              <img src={item.logo} alt="" className="size-4 rounded-[2px]" />
              <span>{item.label}</span>
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                {item.version}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LanguageSelector;

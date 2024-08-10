import React from 'react';
import {Center, Box, Select} from 'native-base';

interface DropdownProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

const FilterDropDown = ({label, value, onValueChange}: DropdownProps) => {
  const handleValueChange = (value: string) => {
    onValueChange(value);
  };
  return (
    <Center>
      <Box maxW="300">
        <Select
          selectedValue={value}
          minWidth="200"
          accessibilityLabel={label}
          placeholder={label}
          _selectedItem={{
            bg: 'teal.600',
          }}
          mt={1}
          onValueChange={handleValueChange}>
          <Select.Item label="Option 1" value="option1" />
          <Select.Item label="Option 2" value="option2" />
          <Select.Item label="Option 3" value="option3" />
        </Select>
      </Box>
    </Center>
  );
};

export default FilterDropDown;

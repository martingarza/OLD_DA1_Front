import React from 'react';
import {Box, Center, CheckIcon, Select} from 'native-base';

const DropdownMenu = (params: {
  purpose: string;
  disabled: any;
  data: any;
  options: string[];
  onChange: any;
  valueSelected?: string;
}) => {
  const onChange = params.onChange;
  const renderOptions = () => {
    const elements = [];
    for (let count = 0; count < params.options.length; count++) {
      const opt = params.options[count];
      const dataId = params.data[count];
      elements.push(<Select.Item key={count} label={opt} value={dataId} />);
    }
    return elements;
  };
  return (
    <Center>
      <Box maxW="300">
        <Select
          selectedValue={params.valueSelected}
          isDisabled={params.disabled}
          minWidth="310"
          accessibilityLabel="Select"
          borderRadius="12"
          placeholder={`Select ${params.purpose}`}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={onChange}>
          {renderOptions()}
        </Select>
      </Box>
    </Center>
  );
};

export default DropdownMenu;

import React from 'react';
import {Box, Input, SearchIcon} from 'native-base';

const SearchBar = (props: {
  placeholder: string;
  onChangeText: any;
  value: string;
  onSubmitEditing: any;
}) => {
  return (
    <Box>
      <Input
        w={{base: '90%', md: '25%'}}
        InputLeftElement={<SearchIcon ml="5" />}
        placeholder="Search"
        variant="rounded"
        paddingLeft="3"
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onSubmitEditing}
        value={props.value}
      />
    </Box>
  );
};

export default SearchBar;

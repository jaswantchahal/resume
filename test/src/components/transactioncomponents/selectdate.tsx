import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Flex, Space } from 'antd';
import "./comman.scss"

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const SelectDate: React.FC = () => (
  <Flex style={{justifyContent:"space-between" ,marginBottom:"24px",gap:"12px"}} >
    <DatePicker onChange={onChange} placeholder='dd/mm/yy' />
    <DatePicker onChange={onChange} placeholder='dd/mm/yy'/>
  
  </Flex>
);

export default SelectDate;
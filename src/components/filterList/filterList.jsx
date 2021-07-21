import { Select } from 'antd';
import './filterList.css';

function FilterList(props) {

  const { Option } = Select;

  const filterChannels = (event) => {
    let updatedList = props.items;
    if (event.length === 0) {
      props.setData(props.items);
    } else {
      updatedList = updatedList.filter(item =>
        (item.channel === event[0]) || 
        (item.channel === event[1]) || 
        (item.channel === event[2])
      );
      props.setData(updatedList);
    }
  }

  const filterScores = (event) => {
    let updatedList = props.items;
    if (event.length === 0) {
      props.setData(props.items);
    } else {
      if (event[0] === "4 - 4.5" || event[1] === "4 - 4.5") {
        updatedList = updatedList.filter(item =>
          (item.score === 4) || 
          (item.score === 4.1) || 
          (item.score === 4.2) || 
          (item.score === 4.3) || 
          (item.score === 4.4)
        );
      } if (event[0] === "4.5 - 5" || event[1] === "4.5 - 5") {
        updatedList = updatedList.filter(item =>
          (item.score === 4.5) || 
          (item.score === 4.6) || 
          (item.score === 4.7) || 
          (item.score === 4.8) || 
          (item.score === 4.9) || 
          (item.score === 5)
        );
      }
      props.setData(updatedList);
    }
  }

  return (
    <div className="FilterList">
      <span><b>Filter:</b></span>
      <Select
        mode="multiple"
        placeholder="select channels"
        onChange={filterChannels}
        optionLabelProp="label"
      >
        <Option value="AIRBNB" label="AIRBNB">AIRBNB</Option>
        <Option value="HOLIDU" label="HOLIDU">HOLIDU</Option>
        <Option value="BOOKINGCOM" label="BOOKINGCOM">BOOKINGCOM</Option>
      </Select>
      <Select
        mode="multiple"
        placeholder="select scores"
        onChange={filterScores}
        optionLabelProp="label"
      >
        <Option value="4 - 4.5" lable="4 - 4.5">4 - 4.5</Option>
        <Option value="4.5 - 5" lable="4.5 - 5">4.5 - 5</Option>
      </Select>
    </div>
  );
}

export default FilterList;

import React, { useState, useEffect } from 'react';
import { List, Badge } from 'antd';
import dateFormat from 'dateformat';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import HOLIDU from '../../assets/HOLIDU.svg';
import AIRBNB from '../../assets/AIRBNB.svg';
import BOOKINGCOM from '../../assets/BOOKINGCOM.svg';
import FilterList from '../filterList/filterList';
import './showList.css';

function ShowList() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getList() {
      try {
        let response = await fetch("https://interview-task-api.bookiply.io/reviews");
        response = await response.json();
        await response.forEach((item, index) => {item.key = index});
        setIsLoaded(true);
        setItems(response);
        setData(response);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    }

    getList();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="ShowList">
        <FilterList items={items} setData={setData} />
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: window.scrollTo(0, 0),
            pageSize: 5,
            total: data.length,
          }}
          dataSource={data}
          header={
            <div>
              <h1><b>{data.length} Reviews</b></h1>
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.key}
            >
              <div><Badge count={item.score} />
              {item.channel === "HOLIDU" && <img src={HOLIDU} alt="HOLIDU"/>}
              {item.channel === "AIRBNB" && <img src={AIRBNB} alt="AIRBNB" />}
              {item.channel === "BOOKINGCOM" && <img src={BOOKINGCOM} alt="BOOKINGCOM" />}
              </div>
              <List.Item.Meta
                title={item.headline}
              />
              <div>{item.comment}</div>
              {item.positiveFeedback != null && <div><LikeFilled style={{color: 'green'}}/> {item.positiveFeedback}</div>}
              {item.negativeFeedback != null && <div><DislikeFilled style={{color: 'black'}}/> {item.negativeFeedback}</div>}
              <div style={{marginTop: '12px'}}><b>{item.author}</b></div>
              <div style={{color: 'gray'}}>{dateFormat(item.publishedAt, "Review d mmmm yyyy")}</div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ShowList;

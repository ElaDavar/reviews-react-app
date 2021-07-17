import React, { useState, useEffect } from 'react';
import { List } from 'antd';

function FilteredList() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://interview-task-api.bookiply.io/reviews")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const length = items.length;
  const listData = items.map(item => (
    {
      title: item.headline,
      description: item.score,
      content: item.comment,
    }
  ));

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
            total: length,
          }}
          dataSource={listData}
          header={
            <div>
              <h1>Reviews</h1>
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.title}
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default FilteredList;

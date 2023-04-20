import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [count, setCount] = useState(0);

  const mockManyElements = useMemo(() => {
    return new Array(count).fill(id).map((i, index) => <p key={index}>{i}</p>);
  }, [count, id]);

  return (
    <div id={id}>
      {id}-{count}
      {mockManyElements}
      <p>
        <button onClick={() => setCount((prev) => prev + 1)}>add count</button>
      </p>
    </div>
  );
}

export default Detail;

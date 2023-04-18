import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  console.log('pathname', pathname, 'session', searchParams.get('session'));
  const timeCountRef = useRef(1000);
  const [count, setCount] = useState(0);

  const freshByIdTime = useCallback(() => {
    setTimeout(() => {
      if (timeCountRef.current--) {
        setCount((prev) => prev + 1);
        freshByIdTime();
      }
    }, 1000);
  }, []);

  const mockManyElements = useMemo(() => {
    return new Array(count).fill(id).map((i, index) => <p key={index}>{i}</p>);
  }, [count, id]);

  useEffect(() => {
    freshByIdTime();
  }, [freshByIdTime]);

  return (
    <div>
      {id}-{count}
      {mockManyElements}
    </div>
  );
}

export default Detail;

// Core dependencies
import React, { useEffect, useState } from 'react';
import {
  useRecoilValue,
} from 'recoil';

// Constants
import { CURRENT_PAGE_STATE } from '../../constants/atoms';

// Components

// Interfaces

const ItemsPagerHandler = (props: { currentPageObserver: (page:number)=>void}) => {
  const currentPage = useRecoilValue(CURRENT_PAGE_STATE);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender === false) { props.currentPageObserver(currentPage); }
    setFirstRender(false);
  }, [currentPage]);

  return (
    <div />
  );
};
export default ItemsPagerHandler;

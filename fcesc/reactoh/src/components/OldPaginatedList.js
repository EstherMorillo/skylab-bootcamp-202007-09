import React from 'react';
import './PaginatedList.css';
import { NavLink } from 'react-router-dom';
import * as ROUTES from './../config/routes';

function PaginatedList(props){
  const data = props.data;
  let empty = [];
  for (let i=0; i<data.length; i++){
    empty.push(<li key={i}><NavLink to={ROUTES.HERO_DETAIL_SOME + data[i].id}><strong>{data[i].name}</strong>, id: {data[i].id}</NavLink></li>);
  }
  let result = (         
    <div className="App">
      <h2>Heroes list</h2>
      <div className="herolist__container">
        <ul className="heroList--paginated">{empty}</ul>
        <div className="pagination__component">
            <p>Displaying page {props.currentPage} of {props.numberOfPages}, listing {props.itemsPerPage} of {props.numberOfHeroes} heroes.</p>
            <button id='button__goToPreviousPage' onClick={props.previousPage}>Previous Page</button> <button id='button__goToNextPage' onClick={props.nextPage}>Next Page</button>
        </div>
      </div>
    </div>);

  return result;
}

export default PaginatedList;

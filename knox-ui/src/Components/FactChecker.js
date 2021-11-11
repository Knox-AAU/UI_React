import React from 'react'
import SearchBar from './SearchBar';
import '../Css/SeacrhBar.css';



const FactChecker = props => {
    const onClick = (searchText)=>{
        console.log(searchText)
    }

    return (
        <div className="outerbox">
            <h1> Factchecker </h1>
            <div className='searchBarPlacement'>
            <SearchBar
            searchText="Enter potential truth"
            onClick={onClick}
            />
            </div>
        </div>
    )
}
FactChecker.propTypes = {

}

export default FactChecker

import React from 'react'
import SearchBar from './SearchBar';


const FactChecker = props => {
    const onClick = (searchText)=>{
        console.log(searchText)
    }

    return (
        <div>
            <SearchBar
            searchText="Enter potential truth"
            onClick={onClick}
            />
        </div>
    )
}
FactChecker.propTypes = {

}

export default FactChecker

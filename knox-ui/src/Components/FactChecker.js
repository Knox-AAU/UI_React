import React from 'react'
import SearchBar from './SearchBar';




const FactChecker = props => {
    const onClick = (searchText)=>{
        console.log(searchText)
    }

    const searchBarPlacementStyle = {
        marginTop: "5%",
        width: "50%",
        marginLeft: "5%" 
    };

    return (
        <div>
            <h1 style={{marginTop: "3%", marginLeft: "5%"}}> Factchecker </h1>
            <div  style={searchBarPlacementStyle}>
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

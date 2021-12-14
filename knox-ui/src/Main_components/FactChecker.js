import React from 'react'
import SearchBar from '../Shared_components/SearchBar';
import '../Css/FactChecker.css';



const FactChecker = props => {
    const onClick = (searchText) => {
        console.log(searchText)
    }

    return (
        <div className="ContentOfPage">
            <div className='SearchBarPlacement'>
                <div data-testid="headerDiv" className="HeaderDiv">
                    <h1 >Fact Checker</h1>
                    <h2 >It is possible to fact check the data of the toolbox!</h2>
                </div>
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

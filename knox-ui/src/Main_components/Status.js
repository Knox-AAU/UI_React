import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import '../Css/Status.css';
import DatabaseStatus from "./DatabaseStatus";

const Status = props => {
    return (
        <div>
            {/* Header including subheader */}
            <div className="d-flex justify-content-center" >
                <h1>Statistics</h1>
            </div>
            <div className="ParagraphIntroDiv d-flex justify-content-center" >
                <p>The main function of this site is to display specific statistics of how many fils
                    that have been parsed from Nordjyske and Grundfoss, and how many are still missing.
                </p>
            </div>

            {/* Section for Nordjysk statistics */}
            <div data-testid="nordjyskDiv" className="GroupSpecificlDiv" >
                <h2>Nordjysk Status of parsing:</h2>
                <p>Probably gonna be some kind of piechart to display the percentage of files that have been parsed</p>

                <PieChart viewBoxSize={10} //https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/index.tsx and https://www.npmjs.com/package/react-minimal-pie-chart
                    data={[
                        { title: 'One', value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                    ]}
                />
            </div>
            {/* Section for Grundfoss statistics */}
            <div data-testid="grundfosskDiv" className="GroupSpecificlDiv">
                <h2>Grundfoss Status of parsing:</h2>
            </div>
            {/* Section for Database statistics */}
            <div data-testid="databaseDiv" className="GroupSpecificlDiv">
                <h2>Some kind of database data:</h2>
                <DatabaseStatus/>
            </div>
        </div>
    )
}

Status.propTypes = {

}

export default Status

import React, { useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import '../Css/Status.css'
import axios from "axios";

const Status = props => {
    
    const [value, setValue] = React.useState(null);

    React.useEffect(() => {
      axios.get("http://localhost:8000/NordjyskeCount").then((response) => {
        setValue(response.data);
        console.log(response.data)
      });
    }, []);
  
    if (!value) return null;
    //fetch("http://127.0.0.1:5000/collection_count?col=1.0").then(response => response.json()).then(setPost(reponse["count"])).catch(err=>console.log(err));

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
            <div className="GroupSpecificlDiv" >
                <h2>Nordjysk Status of parsing:</h2>
                <p>Probably gonna be some kind of piechart to display the percentage of files that have been parsed</p>

                <PieChart viewBoxSize={10} //https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/index.tsx and https://www.npmjs.com/package/react-minimal-pie-chart
                    data={[
                        { title: 'Parsed json', value: value.count, color: '#E38627' },
                        { title: 'Not yet parsed json', value: 1550, color: '#C13C37' },
                    ]}
                />
            </div>



            {/* Section for Grundfoss statistics */}
            <div className="GroupSpecificlDiv">
                <h2>Grundfoss Status of parsing:</h2>
            </div>




            {/* Section for Database statistics */}
            <div className="GroupSpecificlDiv">
                <h2>Some kind of database data:</h2>
            </div>

        </div>
    )
}


Status.propTypes = {

}


export default Status

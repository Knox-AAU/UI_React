import React, { useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import '../Css/Status.css';

const Status = props => {
    useEffect(() => {
        let primaryProgressBarOuter = document.getElementById("primaryProgressBar");
        let primaryProgressBar = primaryProgressBarOuter.getElementsByClassName("progress-bar")[0];
        primaryProgressBar.textContent = ""

        let secondaryProgressBarOuter = document.getElementById("secondaryProgressBar");
        let secondaryProgressBar = secondaryProgressBarOuter.getElementsByClassName("progress-bar")[0];
        secondaryProgressBar.textContent = ""

        let wsStart = () => {
            let ws = new WebSocket("ws://localhost:1337/");
        
            ws.onopen = (e) => {
                console.log("Connection to grundfos preprocessing ws established.");
            };

            let state = "no state jet"
            let current_pdf = 0;
            let pdfs = 0;
            let page = 0;
            let pages = 0;
            let imagePage = 0;
            let imagePages = 0;

            let setState = ((newState) => {
                state = newState

                console.log("Grundfos processing new state: " + state)

                document.getElementById("primaryProgressBarLegend").style.display = "none"

                if (primaryProgressBar.classList.contains("progress-bar-animated") === false)
                    primaryProgressBar.classList.add("progress-bar-animated");
                if (secondaryProgressBar.classList.contains("progress-bar-animated") === false)
                    secondaryProgressBar.classList.add("progress-bar-animated");
                
                primaryProgressBarOuter.style.display = "none";
                secondaryProgressBarOuter.style.display = "none";
                document.getElementById("no_ws_connection").style.display = "none";
                document.getElementById("success_message").style.display = "none";

                switch(state) {
                    case "PROCESSING":
                        primaryProgressBarOuter.style.display = "initial";
                        secondaryProgressBarOuter.style.display = "initial";
                        document.getElementById("primaryProgressBarLegend").style.display = "initial"
                        primaryProgressBarOuter.getElementsByClassName("ProgessBarTitle")[0].textContent = "Pdf files processed";
                        secondaryProgressBarOuter.getElementsByClassName("ProgessBarTitle")[0].textContent = "Page processed";
                        break;
                    case "GENERATING_IMAGES":
                        primaryProgressBarOuter.getElementsByClassName("ProgessBarTitle")[0].textContent = "Pdf files converted to images";
                        primaryProgressBarOuter.style.display = "initial";
                        secondaryProgressBarOuter.style.display = "none";
                        break;
                    case "CLIENT_WARNING":
                        primaryProgressBarOuter.style.display = "none";
                        secondaryProgressBarOuter.style.display = "none";
                        if (primaryProgressBar.classList.contains("progress-bar-animated"))
                            primaryProgressBar.classList.remove("progress-bar-animated");
                        if (secondaryProgressBar.classList.contains("progress-bar-animated"))
                            secondaryProgressBar.classList.remove("progress-bar-animated");

                        document.getElementById("buttons").style.display = "none";
                        document.getElementById("no_ws_connection").style.display = "block";
                        break;
                    case "FINISHED":
                        primaryProgressBar.textContent = "Finished!";
                        secondaryProgressBar.textContent = "Finished!";
                        document.getElementById("success_message").style.display = "block";
                        document.getElementById("buttons").style.display = "block";
                        break;
                    default:
                        break;
                }
            });

            let updatePdfNumber = (() => {
                updateProgressBar(primaryProgressBar, current_pdf, pdfs, "Pdf");

                page = 0;
                updatePageNumber();
            });

            let updatePageNumber = (() => {
                updateProgressBar(secondaryProgressBar, page, pages, "Page");
            });

            let updateImagePageNumber = (() => {
                updateProgressBar(primaryProgressBar, imagePage, imagePages, "Page");
            });

            let updateProgressBar = ((elm, minVal, maxVal, type) => {
                elm.style.width = ((maxVal ? minVal / maxVal : 0) * 100) + "%";
                elm.textContent = type + " " + minVal + " of " + maxVal;
                elm.setAttribute("aria-valuemax", maxVal);
                elm.setAttribute("aria-valuemin", 0);
                elm.setAttribute("aria-valuenow", minVal);
            });

            ws.onmessage = (e) => {
                let msg = JSON.parse(e.data);
                if (msg.source === "grundfoss_preprocessing" && msg.type === "updateStatus"){
                    let contents = msg.contents;
                    
                    if (contents.hasOwnProperty("setState")){
                        setState(contents.setState);
                    }
                    if (contents.hasOwnProperty("currentPdf")){
                        current_pdf = contents.currentPdf;
                        if (state === "PROCESSING")
                            updatePdfNumber();
                    }
                    if (contents.hasOwnProperty("fileName")){
                        document.getElementById("primaryProgressBarLegend").textContent = contents.fileName;
                    }
                    if (contents.hasOwnProperty("numberOfPDFs")){
                        console.log("Updated number of pdfs: " + contents.numberOfPDFs);
                        pdfs = contents.numberOfPDFs;
                        if (state === "PROCESSING")
                            updatePdfNumber();
                    }
                    if (contents.hasOwnProperty("page")){
                        page = contents.page;
                        if (state === "PROCESSING")
                            updatePageNumber();
                    }
                    if (contents.hasOwnProperty("pages")){
                        pages = contents.pages;
                        if (state === "PROCESSING")
                            updatePageNumber();
                    }
                    if (contents.hasOwnProperty("imagePage")){
                        imagePage = contents.imagePage
                        if (state === "GENERATING_IMAGES")
                            updateImagePageNumber();
                    }
                    if (contents.hasOwnProperty("imagePages")){
                        imagePages = contents.imagePages
                        if (state === "GENERATING_IMAGES")
                            updateImagePageNumber();
                    }
                }
            }

            ws.onclose = (e) => {
                setTimeout(() => {
                    setState("CLIENT_WARNING");
                    wsStart();
                }, 1000);
            }
        }
        wsStart();
    });
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
                        { title: 'One', value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                    ]}
                />
            </div>



            {/* Section for Grundfoss statistics */}
            <div className="GroupSpecificlDiv">
                <h2>Grundfoss Status of parsing:</h2>
                <div>
                    <div id="no_ws_connection">
                        <br />
                        <Alert variant="warning">
                            <Alert.Heading>No Connection</Alert.Heading>
                                <p>
                                    Disconnected from the preprocessing server. Check your internet connection, and validate that the server is running.
                                </p>
                            </Alert>
                    </div>

                    <div id="primaryProgressBar" class="progrssBarOuter">
                        <div class="ProgessBarTitle"></div><i>&nbsp;&nbsp;&nbsp;<span id="primaryProgressBarLegend"></span></i>
                        <br />
                        <ProgressBar now={0} animated label="" />
                    </div>
                    
                    <br />
                    <div id="secondaryProgressBar" class="progrssBarOuter">
                        <div class="ProgessBarTitle"></div>
                        <ProgressBar now={0} animated label="" variant="info" />
                    </div>
                    
                    <div id="success_message">
                        <br />
                        <Alert variant="success">
                            <Alert.Heading>The program finsihed</Alert.Heading>

                            </Alert>
                    </div>

                    <div id="buttons">
                        <Button variant="primary" size="lg">Scrape manuals, process them and send them to Knowladge layer</Button>{' '}
                        <br />
                        <br />
                        <Button variant="primary">Scrape manuals</Button>{' '}
                        <Button variant="primary">Process all manuals from lates scraping</Button>{' '}
                        <Button variant="primary">Send scraped data to Knowladge layer</Button>{' '}
                    </div>
                    <br />
                </div>
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

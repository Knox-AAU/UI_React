import '../Css/Status.css';
import GrundfosLogo from '../Img/grundfos_logo.svg'
import React, { useEffect } from 'react'

// Grundfos dependencies
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

// Nordjyske dependencies
import axios from "axios";
import DatabaseStatus from "./DatabaseStatus";
import Visualiser from '../Shared_components/Visualiser';
import { PieChart } from 'react-minimal-pie-chart'

const Status = props => {
    useEffect(() => {
        let primaryProgressBarOuter = document.getElementById("primaryProgressBar");
        let primaryProgressBar = primaryProgressBarOuter.getElementsByClassName("progress-bar")[0];
        primaryProgressBar.textContent = ""

        let secondaryProgressBarOuter = document.getElementById("secondaryProgressBar");
        let secondaryProgressBar = secondaryProgressBarOuter.getElementsByClassName("progress-bar")[0];
        secondaryProgressBar.textContent = ""

        let wsStart = () => {
            let ws = new WebSocket("ws://localhost:8000/statsWebsocket/");

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
            let currentDownloadFile = 0;
            let totalDownloadFiles = 0;
            let currentScrapeLink = 0;
            let totalScrapeLinks = 0;

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
                document.getElementById("loading_message").style.display = "none";
                document.getElementById("buttons").style.display = "none";

                switch (state) {
                    case "IDLE":
                        document.getElementById("buttons").style.display = "grid";
                        break;
                    case "SCRAPING":
                        primaryProgressBarOuter.style.display = "initial";
                        document.getElementById("primaryProgressBarLegend").style.display = "initial";
                        primaryProgressBarOuter.getElementsByClassName("ProgressBarTitle")[0].textContent = "Current link being scraped: ";
                        break;
                    case "DOWNLOADING":
                        primaryProgressBarOuter.style.display = "initial";
                        document.getElementById("primaryProgressBarLegend").style.display = "initial";
                        primaryProgressBarOuter.getElementsByClassName("ProgressBarTitle")[0].textContent = "Current PDF file being downloaded: ";
                        break;
                    case "PROCESSING":
                        primaryProgressBarOuter.style.display = "initial";
                        secondaryProgressBarOuter.style.display = "initial";
                        document.getElementById("primaryProgressBarLegend").style.display = "initial";
                        primaryProgressBarOuter.getElementsByClassName("ProgressBarTitle")[0].textContent = "Current PDF file being processed: ";
                        break;
                    case "GENERATING_IMAGES":
                        primaryProgressBarOuter.getElementsByClassName("ProgressBarTitle")[0].textContent = "PDF files are being converted to images.";
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
                        document.getElementById("buttons").style.display = "grid";
                        break;
                    default:
                        break;
                }
            });

            let updatePdfNumber = (() => {
                updateProgressBar(primaryProgressBar, current_pdf, pdfs, "PDF");

                page = 0;
                updatePageNumber();
            });

            let updatePageNumber = (() => {
                updateProgressBar(secondaryProgressBar, page, pages, "Page");
            });

            let updateImagePageNumber = (() => {
                updateProgressBar(primaryProgressBar, imagePage, imagePages, "Page");
            });

            let updateDownloadFileNumber = (() => {
                updateProgressBar(primaryProgressBar, currentDownloadFile, totalDownloadFiles, "PDF");
            });

            let updateScrapeLink = (() => {
                primaryProgressBar.style.width = (100 - (totalScrapeLinks - currentScrapeLink)) + "%";
                primaryProgressBar.textContent = "Link " + currentScrapeLink + " of " + totalScrapeLinks;
                primaryProgressBar.setAttribute("aria-valuemax", totalScrapeLinks);
                primaryProgressBar.setAttribute("aria-valuemin", totalScrapeLinks - 100);
                primaryProgressBar.setAttribute("aria-valuenow", currentScrapeLink);
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
                if (msg.source === "grundfoss_preprocessing" && msg.type === "updateStatus") {
                    let contents = msg.contents;

                    if (contents.hasOwnProperty("setState")) {
                        setState(contents.setState);
                    }
                    if (contents.hasOwnProperty("currentPdf")) {
                        current_pdf = contents.currentPdf;
                        if (state === "PROCESSING")
                            updatePdfNumber();
                    }
                    if (contents.hasOwnProperty("fileName")) {
                        let progressBar = document.getElementById("primaryProgressBarLegend");
                        let link = progressBar.getElementsByTagName("a")[0];
                        link.textContent = contents.fileName;
                        link.href = `http://net.grundfos.com/Appl/ccmsservices/public/literature/filedata/${contents.fileName}`;
                    }
                    if (contents.hasOwnProperty("numberOfPDFs")) {
                        console.log("Updated number of pdfs: " + contents.numberOfPDFs);
                        pdfs = contents.numberOfPDFs;
                        if (state === "PROCESSING")
                            updatePdfNumber();
                    }
                    if (contents.hasOwnProperty("page")) {
                        page = contents.page;
                        if (state === "PROCESSING")
                            updatePageNumber();
                    }
                    if (contents.hasOwnProperty("pages")) {
                        pages = contents.pages;
                        if (state === "PROCESSING")
                            updatePageNumber();
                    }
                    if (contents.hasOwnProperty("imagePage")) {
                        imagePage = contents.imagePage
                        if (state === "GENERATING_IMAGES")
                            updateImagePageNumber();
                    }
                    if (contents.hasOwnProperty("imagePages")) {
                        imagePages = contents.imagePages
                        if (state === "GENERATING_IMAGES")
                            updateImagePageNumber();
                    }

                    if (contents.hasOwnProperty("currentDownloadFile")) {
                        currentDownloadFile = contents.currentDownloadFile;
                        if (state === "DOWNLOADING")
                            updateDownloadFileNumber();
                    }

                    if (contents.hasOwnProperty("totalDownloadFiles")) {
                        totalDownloadFiles = contents.totalDownloadFiles;
                        if (state === "DOWNLOADING")
                            updateDownloadFileNumber();
                    }

                    if (contents.hasOwnProperty("currentScrapeLink")) {
                        currentScrapeLink = contents.currentScrapeLink;
                        if (state === "SCRAPING")
                            updateScrapeLink();
                    }

                    if (contents.hasOwnProperty("totalScrapeLinks")) {
                        totalScrapeLinks = contents.totalScrapeLinks;
                        if (state === "SCRAPING")
                            updateScrapeLink();
                    }
                }
            }

            const jsonBaseObject = {
                "target": "grundfos_preprocessing",
                "type": "executeCommands",
                "contents": [],
            };

            document.getElementById("executeAllButton").addEventListener("click", () => {
                let jsonObject = JSON.parse(JSON.stringify(jsonBaseObject));
                jsonObject.contents.push({ "commandType": "SCRAPE" });
                jsonObject.contents.push({ "commandType": "PROCESS" });
                jsonObject.contents.push({ "commandType": "SEND" });
                ws.send(JSON.stringify(jsonObject));
            });

            document.getElementById("scrapeButton").addEventListener("click", () => {
                let jsonObject = JSON.parse(JSON.stringify(jsonBaseObject));
                jsonObject.contents.push({ "commandType": "SCRAPE" });
                ws.send(JSON.stringify(jsonObject));
            });

            document.getElementById("processButton").addEventListener("click", () => {
                let jsonObject = JSON.parse(JSON.stringify(jsonBaseObject));
                jsonObject.contents.push({ "commandType": "PROCESS" });
                ws.send(JSON.stringify(jsonObject));
            });

            document.getElementById("sendButton").addEventListener("click", () => {
                let jsonObject = JSON.parse(JSON.stringify(jsonBaseObject));
                jsonObject.contents.push({ "commandType": "SEND" });
                ws.send(JSON.stringify(jsonObject));
            });

            ws.onclose = (e) => {
                setTimeout(() => {
                    setState("CLIENT_WARNING");
                    wsStart();
                }, 1000);
            }
        }
        wsStart();
    });

    const [value, setValue] = React.useState(null);

    React.useEffect(() => {
      axios.get("http://localhost:8000/NordjyskeCount").then((response) => {
        setValue(response.data);
        console.log(response.data)
      });
    }, []);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "50%" }}>
            {/* Header including subheader */}
            <div className="" style={{ gridColumn: "span 2" }}>
                <div className="ParagraphIntroDiv">
                    <h1>Statistics for the Preprocessing Layer</h1>
                    <p>The main function of this site is to display specific statistics of how many files
                        that have been parsed from Nordjyske and Grundfos and how many are still missing.
                    </p>
                </div>
            </div>

            {/* Section for Nordjysk statistics */}
            <div data-testid="nordjyskDiv" className="GroupSpecificlDiv" >
                <h2>Nordjysk Status of parsing:</h2>

                <PieChart viewBoxSize={10} //https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/index.tsx and https://www.npmjs.com/package/react-minimal-pie-chart
                    data={[
                        { title: 'Parsed json', value: value ? value.count : 0, color: '#E38627' },
                        { title: 'Not yet parsed json', value: 1550, color: '#C13C37' },
                    ]}
                />
                <p>Yellow is parsed</p>
                <p>red is not yet parsed</p>
            </div>
            {/* Section for Nordjyske and Grundfos statistics */}
            <div className="GroupSpecificlDiv knowledgelayerbox">
            <h2 className="knowledgelayerelement">Nordjyske/Grundfos Named Enitity Recognition (NER) Visualiser:</h2>
            <Visualiser publishers={["NJ", "GF"]} urlNer="/visualiseNer/" urlKg="/generateKG/" />
            </div>
            {/* Section for Grundfoss statistics */}
            <div id="groupB" className="GroupSpecificlDiv" style={{ justifyContent: "left", gridColumn: "2", gridRow: "2", backgroundRepeat: "no-repeat", backgroundSize:"100%", display: "block", backgroundImage:`url(${GrundfosLogo})`}}>
                <div data-testid="grundfosskDiv" style={{backgroundColor: "rgba(255, 255, 255, 0.8)", margin:"0", minHeight: "100%"}}>
                    <h2>Grundfos</h2>

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

                        <div id="primaryProgressBar" class="ProgressBarOuter">
                            <div class="ProgressBarTitle"></div>
                            <strong>&nbsp;<span id="primaryProgressBarLegend"><a target="_blank" href="status"> </a></span></strong>
                            <div>
                                <br />
                                <strong>
                                    <p style={{ float: "left", fontSize: "0.75rem", marginRight: "1vw" }}>PDFs Progress:</p>
                                    <ProgressBar now={0} animated label="" />
                                </strong>
                            </div>

                        </div>
                        <br />
                        <div id="secondaryProgressBar" class="ProgressBarOuter">
                            <div>
                                <strong>
                                    <p style={{ float: "left", fontSize: "0.75rem", marginRight: "1vw" }}>Page Progress:</p>
                                    <ProgressBar now={0} animated label="" variant="info" />
                                </strong>
                            </div>
                        </div>

                        <div id="success_message">
                            <br />
                            <Alert variant="success">
                                <Alert.Heading>The program finished!</Alert.Heading>

                            </Alert>
                        </div>

                        <div id="loading_message">
                            <br />
                            <Alert variant="info">
                                <Alert.Heading>Loading...</Alert.Heading>

                            </Alert>
                        </div>
                    </div>
                    <div class="btn-group" id="buttons" style={{ width: "100%" }}>
                        <Button id="executeAllButton" type="button" variant="primary" style={{ gridRow: "1", gridColumn: "span 3" }} size="lg">Scrape, Process &amp; Send data </Button>{' '} <br />
                        <Button id="scrapeButton" type="button" variant="primary" style={{ gridRow: "2", gridColumn: "1" }}>Scrape 100 links and download</Button>{' '}
                        <Button id="processButton" type="button" variant="primary" style={{ gridRow: "2", gridColumn: "2" }}>Process manuals</Button>{' '}
                        <Button id="sendButton" type="button" variant="primary" style={{ gridRow: "2", gridColumn: "3" }}>Send data</Button>{' '}
                    </div>
                    {/*<img src={GrundfosLogo} style={{width: "100%", height: "auto", backgroundRepeat: "no-repeat", backgroundPosition: "center", display: "block", opacity: "0.10"}} alt="" /> */}
                </div>
            </div>

            {/* Section for Database statistics */}
            <div data-testid="databaseDiv" className="GroupSpecificlDiv">
                <h3>Database status</h3>
                <DatabaseStatus port="8000" apiName="wordCountStatus" dbName="WordCount"/>
                <DatabaseStatus port="8000" apiName="rdfStatus" dbName="RDF"/>
            </div>
        </div>
    )
}

Status.propTypes = {

}

export default Status

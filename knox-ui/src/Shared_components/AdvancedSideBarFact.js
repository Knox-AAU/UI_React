import React from 'react'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import StickyBox from "react-sticky-box";
import "../Css/AdvancedSidebar.css"

function AdvancedSideBar({open,advancedOptions, setAdvancedOptions}) {

    const HandleCheck= (name, isChecked)=>{
        if(isChecked) setAdvancedOptions([...advancedOptions, name])
        else setAdvancedOptions(advancedOptions.filter(x=>x!==name))
        
    }
    
    return (
    <div className="CollapseDiv">
                    <Collapse in={open} dimension="width">
                        <StickyBox offsetTop={50}>
                            <div>
                                <Card data-testid="card" body style={{
                                        background: "#3874CB",
                                        width: '400px',
                                        height: "94vh",
                                        border:"0px",
                                        borderRadius: "0px" }}>
                                    <div className="sidebar_component">
                                    <h2 > Passage Extraction</h2>
                                        <div className="checkbox">
                                            <ul className="nobullets">
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">Default</p>
                                                        <input type="checkbox"
                                                            id="option0"
                                                            name="DefaultPassageExtraction"
                                                            defaultChecked={true}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">Rake</p>
                                                        <input type="checkbox"
                                                            id="option1"
                                                            name="Rake"
                                                            defaultChecked={false}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <h2 > Article Retrieval</h2>
                                        <div className="checkbox">
                                            <ul className="nobullets">
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">TFIDF</p>
                                                        <input type="checkbox"
                                                            disabled
                                                            id="option2"
                                                            name="TFIDF"
                                                            defaultChecked={true}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <h2 > Passage Ranking</h2>
                                        <div className="checkbox">
                                            <ul className="nobullets">
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">Levenshtein</p>
                                                        <input type="checkbox"
                                                            id="option3"
                                                            name="Levenshtein"
                                                            defaultChecked={false}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">Cosine</p>
                                                        <input type="checkbox"
                                                            id="option4"
                                                            name="Cosine"
                                                            defaultChecked={false}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">Jaccard</p>
                                                        <input type="checkbox"
                                                            id="option5"
                                                            name="Jaccard"
                                                            defaultChecked={false}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">Embedding</p>
                                                        <input type="checkbox"
                                                            id="option6"
                                                            name="WordEmbedding"
                                                            defaultChecked={false}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">TMWIIS</p>
                                                        <input type="checkbox"
                                                            id="option7"
                                                            name="TMWIIS"
                                                            defaultChecked={false}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <h2 > Confidence</h2>
                                        <div className="checkbox">
                                            <ul className="nobullets">
                                                <li>
                                                    <label>
                                                        <p className="sidebar_option_text">SimRank</p>
                                                        <input type="checkbox"
                                                            id="option8"
                                                            name="SimRank"
                                                            defaultChecked={false}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </StickyBox>
                    </Collapse>
                </div>
                )
}

export default AdvancedSideBar

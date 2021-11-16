import React from 'react'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import StickyBox from "react-sticky-box/dist/esnext";
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
                                <Card body style={{ backgroundColor: "darkgray", width: '400px', height: "94vh" }}>
                                    <div class="sidebar_component">
                                        <h2 > Filter Datasets</h2>
                                        <div class="checkbox">
                                            <ul class="nobullets">
                                                <li>
                                                    <label>
                                                        <p class="sidebar_option_text">Grundfos</p>
                                                        <input type="checkbox"
                                                            id="option0"
                                                            name="Grundfos A/S"
                                                            defaultChecked={true}
                                                            onChange={(e)=>HandleCheck(e.target.name,e.target.checked)}/>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <p class="sidebar_option_text">Nordjyske</p>
                                                        <input type="checkbox"
                                                            id="option1"
                                                            name="Nordjyske Medier"
                                                            defaultChecked={true}
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
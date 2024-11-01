<template>
     <div class="card">
    <div class="card-body setup-child setup-configuration-child configuration-chart">
        <nav class="nav mb-4">
            
            <a class="nav-link" href="#">Expand all </a>
            <a class="nav-link" href="#">Collapse all</a>
        </nav>
        <div class="accordion" id="accordion">
            <div class="card">
                <div class="card-header" id="headingPedigree">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Pedigree" aria-expanded="true" aria-controls="Pedigree"> <i class="fas fa-arrow-circle-right"></i> Pedigree Chart </button>
                    </h2>
                </div>
                <div id="Pedigree" class="collapse" aria-labelledby="headingPedigree" data-parent="#accordion">
                    <div class="card-body">
                        <table class="table table-borderless w-auto mb-0">
                            <tbody>
                                <tr>
                                    <td valign="top">Initial Display:</td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="usepopups">
                                            <option value="1" selected="">Standard</option>
                                            <option value="0">Box</option>
                                            <option value="-1">Text Only</option>
                                            <option value="2">Compact</option>
                                            <option value="3">Ahnentafel</option>
                                            <option value="4">Vertical</option>
                                            <option value="5">Fan Chart</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">Max Generations:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="8" name="maxgen" size="5"></td>
                                </tr>
                                <tr>
                                    <td valign="top">Initial Generations:</td>
                                    <td colspan="4"><input class="form-control form-control-sm w-auto" type="text" value="4" name="initpedgens" size="5"></td>
                                </tr>
                                <tr>
                                    <td valign="top">Popup Spouses:</td>
                                    <td>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="popupSpouses1" name="popupspouses" value="1" checked class="custom-control-input">
                                            <label class="custom-control-label" for="popupSpouses1">Yes</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="popupSpouses0" name="popupspouses" value="0" class="custom-control-input">
                                            <label class="custom-control-label" for="popupSpouses0">No</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">Popup Children:</td>
                                    <td>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="popupKids1" name="popupkids" value="1" checked class="custom-control-input">
                                            <label class="custom-control-label" for="popupKids1">Yes</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="popupKids0" name="popupkids" value="0" class="custom-control-input">
                                            <label class="custom-control-label" for="popupKids0">No</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">Popup Chart Links:</td>
                                    <td>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="popupChartLinks1" name="popupchartlinks" value="1" checked class="custom-control-input">
                                            <label class="custom-control-label" for="popupChartLinks1">Yes</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="popupChartLinks0" name="popupchartlinks" value="0" class="custom-control-input">
                                            <label class="custom-control-label" for="popupChartLinks0">No</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">Hide Empty Boxes:</td>
                                    <td>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="hideEmpty1" name="hideempty" value="1" checked class="custom-control-input">
                                            <label class="custom-control-label" for="hideEmpty1">Yes</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="hideEmpty0" name="hideempty" value="0" class="custom-control-input">
                                            <label class="custom-control-label" for="hideEmpty0">No</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">Box Width (w/o popups):</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="231" name="boxwidth" size="10"></td>
                                </tr>
                                <tr>
                                    <td valign="top">Box Height (w/o popups):</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="131" name="boxheight" size="10"></td>
                                </tr>
                                <tr>
                                    <td valign="top">Box Alignment (w/o popups):</td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="boxalign">
                                            <option value="center">Center</option>
                                            <option value="left" selected="">Left</option>
                                            <option value="right">Right</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">Box Height Shift (w/o popups):</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="-2" name="boxheightshift" size="10"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <strong>Vertical Chart</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">Box Width:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="100" name="vwidth" size="5"></td>
                                </tr>
                                <tr>
                                    <td valign="top">Box Height:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="42" name="vheight" size="5"></td>
                                </tr>
                                <tr>
                                    <td valign="top">Spacing:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="20" name="vspacing" size="5"></td>
                                </tr>
                                <tr>
                                    <td valign="top">Box Name Size:</td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="7" name="vfontsize" size="5"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingDescendancy">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Descendancy" aria-expanded="true" aria-controls="Descendancy"> <i class="fas fa-arrow-circle-right"></i> Descendancy Chart </button>
                    </h2>
                </div>
                <div id="Descendancy" class="collapse" aria-labelledby="headingDescendancy" data-parent="#accordion">
                    <div class="card-body">
                        <table class="table table-borderless w-auto mb-0">
                            <tbody>
                                <tr>
                                    <td colspan="2">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td valign="top"><span class="normal">Initial Display:</span></td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="defdesc">
                                            <option value="2" selected="">Standard Format</option>
                                            <option value="0">Text Only</option>
                                            <option value="3">Compact</option>
                                            <option value="1">Register Format</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top"><span class="normal">Max Generations:</span></td>
                                    <td colspan="4"><input class="form-control form-control-sm w-auto" type="text" value="12" name="maxdesc" size="5"></td>
                                </tr>
                                <tr>
                                    <td valign="top"><span class="normal">Initial Generations:</span></td>
                                    <td colspan="4"><input class="form-control form-control-sm w-auto" type="text" value="4" name="initdescgens" size="5"></td>
                                </tr>
                                <tr>
                                    <td valign="top"><span class="normal">Start Descendancy:</span></td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="stdesc">
                                            <option value="0" selected="">Expanded</option>
                                            <option value="1">Collapsed</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top"><span class="normal">Show Notes and Custom Events on Register:</span></td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="regnotes">
                                            <option value="0" selected="">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top"><span class="normal">Register Generations:</span></td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="regnosp">
                                            <option value="0" selected="">Always show everyone</option>
                                            <option value="1">Remove individuals with no family</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingRelationship">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Relationship" aria-expanded="true" aria-controls="Relationship"> <i class="fas fa-arrow-circle-right"></i> Relationship Chart </button>
                    </h2>
                </div>
                <div id="Relationship" class="collapse" aria-labelledby="headingRelationship" data-parent="#accordion">
                    <div class="card-body">
                        <table class="table table-borderless mb-0 w-auto">
                            <tbody>
                                <tr>
                                    <td><span class="normal">Initial Relationships:</span></td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="1" name="initrels" size="5"></td>
                                </tr>
                                <tr>
                                    <td><span class="normal">Max Relationships:</span></td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="10" name="maxrels" size="5"></td>
                                </tr>
                                <tr>
                                    <td><span class="normal">Max Generations:</span></td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="15" name="maxupgen" size="5"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTimeline">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Timeline" aria-expanded="true" aria-controls="Timeline"> <i class="fas fa-arrow-circle-right"></i> Timeline Chart </button>
                    </h2>
                </div>
                <div id="Timeline" class="collapse" aria-labelledby="headingTimeline" data-parent="#accordion">
                    <div class="card-body">
                        <table class="table table-borderless w-auto mb-0">
                            <tbody>
                                <tr>
                                    <td><span class="normal">Starting chart width:</span></td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="500" name="tcwidth" size="5"></td>
                                </tr>
                                <tr>
                                    <td><span class="normal">Enable Simile timeline:</span></td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="simile" onchange="new Effect.toggle('simileTable', 'appear',{duration:.2});">
                                            <option value="0">No</option>
                                            <option value="1" selected="">Yes</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span class="normal">Chart height:</span></td>
                                    <td><input class="form-control form-control-sm w-auto" type="text" value="300" name="tcheight" size="5"></td>
                                </tr>
                                <tr>
                                    <td><span class="normal">Events to include:</span></td>
                                    <td>
                                        <select class="form-control form-control-sm w-auto" name="tcevents">
                                            <option value="0">All events</option>
                                            <option value="1" selected="">Only events that fall within the lifespans of the people on the chart</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingElements">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#Common" aria-expanded="true" aria-controls="Common"> <i class="fas fa-arrow-circle-right"></i> Common Elements</button>
                    </h2>
                </div>
                <div id="Common" class="collapse" aria-labelledby="headingElements" data-parent="#accordion">
                    <div class="card-body">
                        <table class="table table-borderless w-auto mb-0">
                            <tbody>
                                <tr>
                                    <td valign="top">
                                        <table class="table table-borderless w-auto mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>Left Indent:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="10" name="leftindent" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td>Box Name Size:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="11" name="boxnamesize" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td>Box Dates Size:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="10" name="boxdatessize" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td>Box Color:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="#e0e0f7" name="boxcolor" id="boxcolor" size="8"></td>
                                                </tr>
                                                <tr>
                                                    <td>Color Shift (%):</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="20" name="colorshift" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td>Empty Color:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="#CCCCCC" name="emptycolor" id="emptycolor" size="8"></td>
                                                </tr>
                                                <tr>
                                                    <td>Border Color:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="#777" name="bordercolor" id="bordercolor" size="8"></td>
                                                </tr>
                                                <tr>
                                                    <td>Shadow Color:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="#999999" name="shadowcolor" id="shadowcolor" size="8"></td>
                                                </tr>
                                                <tr>
                                                    <td>Shadow Offset:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="4" name="shadowoffset" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td>Box Horizontal Separation:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="31" name="boxHsep" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td>Box Vertical Separation:</td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="11" name="boxVsep" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td>Default PDF Page Size:</td>
                                                    <td>
                                                        <select class="form-control form-control-sm w-auto" name="pagesize">
                                                            <option value="a3">A3</option>
                                                            <option value="a4">A4</option>
                                                            <option value="a5">A5</option>
                                                            <option value="letter" selected="selected">Letter</option>
                                                            <option value="legal">Legal</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="20">&nbsp;</td>
                                    <td valign="top" style="vertical-align: top;">
                                        <table class="table table-borderless w-auto mb-0">
                                            <tbody>
                                                <tr>
                                                    <td valign="top"><span class="normal">Line Width:</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="1" name="linewidth" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Border Width:</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="1" name="borderwidth" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Popup Color:</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="#dddddd" name="popupcolor" id="popupcolor" size="8"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Popup Info Size:</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="10" name="popupinfosize" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Popup Timer (ms):</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="500" name="popuptimer" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Popup Event:</span></td>
                                                    <td>
                                                        <select class="form-control form-control-sm w-auto" name="pedevent">
                                                            <option value="down">Mouse Down</option>
                                                            <option value="over" selected="">Mouse Over</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Box Width (w/popups):</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="201" name="puboxwidth" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Box Height (w/popups):</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="80" name="puboxheight" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Box Alignment (w/popups):</span></td>
                                                    <td>
                                                        <select class="form-control form-control-sm w-auto" name="puboxalign">
                                                            <option value="center" selected="">Center</option>
                                                            <option value="left">Left</option>
                                                            <option value="right">Right</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Box Height Shift (w/popups):</span></td>
                                                    <td><input class="form-control form-control-sm w-auto" type="text" value="-2" name="puboxheightshift" size="10"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"><span class="normal">Include Photos:</span></td>
                                                    <td>
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input type="radio" id="inclPhotos1" name="inclphotos" value="1" checked class="custom-control-input">
                                                            <label class="custom-control-label" for="inclPhotos1">Yes</label>
                                                        </div>
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input type="radio" id="inclPhotos0" name="inclphotos" value="0" class="custom-control-input">
                                                            <label class="custom-control-label" for="inclPhotos0">No</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
</template>
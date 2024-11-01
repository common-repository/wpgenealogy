<template>
    <div class="card">
    <div class="card-body setup-child setup-configuration-child configuration-map">
        <table class="table table-borderless w-auto mb-0">
            <tbody>
                <tr>
                    <td>Map Key:</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="" name="mapkey" size="40"></td>
                </tr>
                <tr>
                    <td>Map Type:</td>
                    <td>
                        <select class="form-control form-control-sm w-auto" name="maptype">
                            <option value="TERRAIN" selected="">Terrain</option>
                            <option value="ROADMAP">Road Map</option>
                            <option value="HYBRID">Hybrid</option>
                            <option value="SATELLITE">Satellite</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Starting Latitude:</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="0" name="mapstlat" onblur="this.value = validateLatLong(this.value)"></td>
                </tr>
                <tr>
                    <td>Starting Longitude:</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="10" name="mapstlong" onblur="this.value = validateLatLong(this.value)"></td>
                </tr>
                <tr>
                    <td>Starting Zoom:</td>
                    <td>
                        <select class="form-control form-control-sm w-auto" name="mapstzoom">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2" selected="">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Location Zoom:</td>
                    <td>
                        <select class="form-control form-control-sm w-auto" name="mapfoundzoom">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10" selected="">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td valign="top" colspan="2"><br>Dimensions, Individual Page:</td>
                </tr>
                <tr>
                    <td>Width (% or px):</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="100%" name="mapindw" onblur="this.value = validateWidth(this.value)"></td>
                </tr>
                <tr>
                    <td>Height (px):</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="400px" name="mapindh" onblur="this.value = validateHeight(this.value)"></td>
                </tr>
                <tr>
                    <td valign="top" colspan="2"><br>Dimensions, Headstones Pages:</td>
                </tr>
                <tr>
                    <td>Width (% or px):</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="100%" name="maphstw" onblur="this.value = validateWidth(this.value)"></td>
                </tr>
                <tr>
                    <td>Height (px):</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="400px" name="maphsth" onblur="this.value = validateHeight(this.value)"></td>
                </tr>
                <tr>
                    <td valign="top" colspan="2"><br>Dimensions, Admin Pages:</td>
                </tr>
                <tr>
                    <td>Width (% or px):</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="100%" name="mapadmw" onblur="this.value = validateWidth(this.value)"></td>
                </tr>
                <tr>
                    <td>Height (px):</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="400px" name="mapadmh" onblur="this.value = validateHeight(this.value)"></td>
                </tr>
                <tr>
                    <td>Hide Admin Maps to Start:</td>
                    <td>
                        <select class="form-control form-control-sm w-auto" name="startoff">
                            <option value="1" selected="">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Hide Public Maps to Start:</td>
                    <td>
                        <select class="form-control form-control-sm w-auto" name="pstartoff">
                            <option value="1">Yes</option>
                            <option value="0" selected="">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td valign="top" colspan="2"><br></td>
                </tr>
                <tr>
                    <td>Consolidate Duplicate Pins:</td>
                    <td>
                        <select class="form-control form-control-sm w-auto" name="showallpins">
                            <option value="0" selected="">Yes</option>
                            <option value="1">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button class="btn btn-sm btn-primary">Save</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
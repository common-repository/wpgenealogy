<template>
    <div class="card">
    <div class="card-body setup-child setup-configuration-child configuration-import">
        <table class="table table-borderless w-auto mb-0">
            <tbody>
                <tr>
                    <td>GEDCOM Folder (Import/Export):</td>
                    <td><input class="form-control form-control-sm w-auto" type="text" value="gedcom" name="gedpath" size="30">
                    </td>
                    <td>
                        <input class="btn btn-sm btn-primary" type="button" value="Make Folder" onclick="makeFolder('gedcom',document.form1.gedpath.value);"> <span id="msg_gedcom"></span>
                    </td>
                </tr>
                <tr>
                    <td>Save Import State:</td>
                    <td colspan="2">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="saveImport" name="saveimport">
                            <label class="custom-control-label" for="saveImport">Save to allow resume if import fails</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Record Report Number:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="rrnum" size="5"></td>
                </tr>
                <tr>
                    <td>Progress Interval (ms):</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="readmsecs" size="5"></td>
                </tr>
                <tr>
                    <td>Default Replace Option:</td>
                    <td colspan="2">
                        <select class="form-control form-control-sm w-auto" name="defimpopt">
                            <option value="1">All current data</option>
                            <option value="0" selected="">Matching records only</option>
                            <option value="2">Do not replace any data</option>
                            <option value="3">Append all records</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>If 'Change Date' is blank:</td>
                    <td colspan="2">
                        <select class="form-control form-control-sm w-auto" name="blankchangedt">
                            <option value="0" selected="">Use current date</option>
                            <option value="1">Leave it as is</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>If no birth date, assume:</td>
                    <td colspan="2">
                        <select class="form-control form-control-sm w-auto" name="livingreqbirth">
                            <option value="0" selected="">Person is deceased</option>
                            <option value="1">Person is living</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>If no death date, assume deceased<br>if older than:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="110" name="maxlivingage" size="5"></td>
                </tr>
                <tr>
                    <td>Assume private if not dead this many years:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="maxprivyrs" size="5"></td>
                </tr>
                <tr>
                    <td>Assume living if not dead this many years:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="maxdecdyrs" size="5"></td>
                </tr>
                <tr>
                    <td>Embedded Media:</td>
                    <td colspan="2">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="embeddedMedia" name="assignnames">
                            <label class="custom-control-label" for="embeddedMedia">Allow WP Genealogy to assign names to embedded media</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Local Photo Path(s)*:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="localphotopathdisplay"></td>
                </tr>
                <tr>
                    <td>Local History Path(s)*:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="localhistorypathdisplay"></td>
                </tr>
                <tr>
                    <td>Local Document Path(s)*:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="localdocumentpathdisplay"></td>
                </tr>
                <tr>
                    <td>Local Headstone Path(s)*:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="localhspathdisplay"></td>
                </tr>
                <tr>
                    <td>Local Path(s) for Other Media*:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="localotherpathdisplay"></td>
                </tr>
                <tr>
                    <td>If no local path match:</td>
                    <td colspan="4">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="wholePath1" name="wholepath" value="1" checked class="custom-control-input">
                            <label class="custom-control-label" for="wholePath1">Import entire path</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="wholePath0" name="wholepath" value="0" class="custom-control-input">
                            <label class="custom-control-label" for="wholePath0">Import file name only</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Prefix for private notes:</td>
                    <td colspan="2"><input class="form-control form-control-sm w-auto" type="text" value="" name="privnote" size="5"></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <button class="btn btn-sm btn-primary">Save</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p>
            <small>
                <i>*Separate multiple entries with commas</i>
            </small>
        </p>
    </div>
    </div>
</template>
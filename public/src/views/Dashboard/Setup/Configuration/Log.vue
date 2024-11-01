<template>
    <div class="card">
    <div class="card-body setup-child setup-configuration-child configuration-log">
        <table class="table table-borderless w-auto mb-0">
            <tbody>
                <tr>
                    <td valign="top"><span class="normal">Log File Name (Public):</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="genlog.txt" name="logname" size="20">
                    </td>
                </tr>
                <tr>
                    <td valign="top"><span class="normal">Max Log Lines (Public):</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="250" name="maxloglines" size="5">
                    </td>
                </tr>
                <tr>
                    <td valign="top"><span class="normal">Exclude Host Names*:</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="" name="badhosts" size="40">
                    </td>
                </tr>
                <tr>
                    <td valign="top"><span class="normal">Exclude Usernames*:</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="" name="exusers" size="40">
                    </td>
                </tr>
                <tr>
                    <td valign="top"><span class="normal">Log File Name (Admin):</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="adminlog.txt" name="adminlogfile" size="20">
                    </td>
                </tr>
                <tr>
                    <td valign="top"><span class="normal">Max Log Lines (Admin):</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="1000" name="adminmaxloglines" size="5">
                    </td>
                </tr>
                <tr>
                    <td valign="top" colspan="2"><span class="normal"><br>Block suggestions or new user registrations where<br><br></span></td>
                </tr>
                <tr>
                    <td valign="top"><span class="normal">Address contains*:</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="" name="addr_exclude" size="40">
                    </td>
                </tr>
                <tr>
                    <td valign="top"><span class="normal">Message contains*:</span></td>
                    <td>
                        <input class="form-control form-control-sm w-auto" type="text" value="" name="msg_exclude" size="40">
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
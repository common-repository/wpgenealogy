<template>
    <div>
        <h3 class="top-breadcrumb"><strong>People</strong><small> Marge </small> </h3>
        <br>
        <div class="card">
            <div class="card-body people-child people-merge">
                <form>
                    <h5>Find Matches</h5>
                    <p><i>Choose individuals to merge or find potential matches</i></p>
                    <table class="table table-borderless w-auto">
                        <tr>
                            <td>Tree:</td>
                            <td>
                                <select class="form-control form-control-sm">
                                    <option>All Trees</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Person ID 1:</td>
                            <td><input type="text" class="form-control form-control-sm" name=""></td>
                            <td>OR</td>
                            <td> <a href="#" class="smallicon admin-find-icon"></a> </td>
                            <td>
                                <div style="width: 50px;"></div>
                            </td>
                            <td>Person ID 2:</td>
                            <td><input type="text" class="form-control form-control-sm" name=""></td>
                            <td>OR</td>
                            <td> <a href="#" class="smallicon admin-find-icon"></a> </td>
                        </tr>
                    </table>
                    <table class="table table-borderless w-auto">
                        <tr>
                            <td colspan="3">
                                <strong> Match the following fields: </strong>
                            </td>
                            <td colspan="2">
                                <strong> Other Options:</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> First Name</label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Birth Date</label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Death Date</label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Ignore Blanks</label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Combine notes & citations</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Last Name </label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Birth Place </label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Death Place</label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Use Soundex* </label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check form-group">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1"> Combine media</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5">
                                <button class="btn btn-sm btn-primary">Next Match</button>
                                <button class="btn btn-sm btn-primary">Next Duplicate</button>
                                <button class="btn btn-sm btn-primary">Compare / Refresh</button>
                                <button class="btn btn-sm btn-primary">Switch</button>
                                <button class="btn btn-sm btn-primary">Merge</button>
                            </td>
                        </tr>
                    </table>
                </form>
                <div class="results mt-4">
                    <h5>Matches: 1 to 1 of 1 </h5>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Select</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Birth Date</th>
                                <th scope="col">Birth Place </th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"><input type="checkbox" name="people[]">
                                </th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                    <h5>Matches: 1 to 1 of 1 </h5>
                </div>
                <p>
                    <small> *Using this option will cause the program to take longer when finding the next match or duplicate.</small>
                </p>
            </div>
        </div>
    </div>
</template>
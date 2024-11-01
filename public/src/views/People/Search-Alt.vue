<template>
    <div class="app">
        <br>
        <form class="form-inline">
            <label class="my-1 mr-2"> <strong>Search People:</strong> </label>
            <input class="form-control mr-2" placeholder="First Name" type="text" v-model="query.firstname.value">
            <input class="form-control" placeholder="Last Name" type="text" v-model="query.lastname.value">
            <button @click.prevent="search" class="btn btn-primary ml-2">Search</button>
        </form>
        <br>
        {{query}}
        <div class="results mt-4" :class="loading ? 'data-loading' : ''">
            <h6>
                Matches: 
                <span v-if="peoples.total">
                    {{peoples.from}} to {{peoples.to }} of {{peoples.total}}
                </span> 
                <span v-else>
                    Not found.
                </span> 
            </h6>
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th width="80">#</th>
                        <th class="sortable" width="280" @click.prevent="sort = 'firstname', order = order == 'DESC' ? 'ASC' : 'DESC'">Last Name, Given Name(s) </th>
                        <th class="sortable" width="100" @click.prevent="sort = 'personID', order = order == 'DESC' ? 'ASC' : 'DESC'">Person ID</th>
                        <th class="sortable" @click.prevent="sort = 'birthdatetr', order = order == 'DESC' ? 'ASC' : 'DESC'"> Born/Christened </th> 
                        <th>Location</th>
                        <th width="150">Tree | Branch</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="peoples.data.length" v-for="(people, index) in peoples.data" :key="people.id">
                        <td>
                            {{people.id}}
                        </td>
                        <td>
                            <router-link :to="{name: 'people-single', params:{id: people.id}}">
                                {{people.name}}
                            </router-link>
                        </td>
                        <td>{{people.personID}}</td>
                        <td>{{people.birthdate}}</td>
                        <td>{{people.birthplace}}</td>
                        <td>{{people.gedcom}} | {{people.branch}}</td>
                    </tr>
                    <tr v-if="peoples.data.length == 0">
                        <td colspan="8" class="preload-td">
                            <div v-if="!peoples.loaded">
                                <button class="btn btn-link" type="button">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span> Loading...</span>
                                </button>
                            </div>
                            <div v-else> Nothing found. </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="pt-2" aria-label="Page navigation example">
                <pagination :data="peoples" />
            </nav>
            <h6>Matches: <span v-if="peoples.total">{{peoples.from}} to {{peoples.to }} of {{peoples.total}}</span> <span v-else>Not found.</span> </h6>
        </div>
    </div>
</template>
<script>

    import axios from "axios";
    import qs from "qs";
    import Pagination from '@/components/dashboard/Pagination.vue';
    export default {
        components: {
            'pagination': Pagination,
        },
        data() {
            return {
                peoples: {
                    current_page: 1,
                    data: [],
                    first_page_url: null,
                    from: 1,
                    last_page: 0,
                    last_page_url: null,
                    next_page_url: null,
                    path: '',
                    per_page: 15,
                    prev_page_url: null,
                    to: 15,
                    total: 0,
                },
                sort: 'created_at',
                order: 'DESC',
                query: {
                    firstname: {
                        operator: 'contains',
                        value: ''
                    },
                    lastname: {
                        operator: 'contains',
                        value: ''
                    },
                },
                loading: false
            }
        },
        created(){
            
        },
        mounted: function() {
            if (this.$route.params.query) {
                this.query = this.$route.params.query
            }
            this.getData();
        },
        watch: {
            'peoples.current_page': function(newV, oldV) {
                this.getData();
            },
            sort: function(newV, oldV) {
                this.getData();
            },
            order: function(newV, oldV) {
                this.getData();
            },
        },
        computed: {
        },
        methods: {
            getData:function() {
                this.loading = true;
                const data = { 
                    action : 'people_search_advanced', 
                    current_page: this.peoples.current_page, 
                    per_page: this.query.per_page ? this.query.per_page : this.peoples.per_page, 
                    sort: this.sort, 
                    order: this.order, 
                    query: this.query
                }

                axios.post(wpGenealogy.ajax_url, qs.stringify(data)).then(response => { 
                    this.peoples = response.data  
                    this.loading = false;
                }).catch(error => { 
                });
            },
            search:function() {
                this.getData();
            }
        }
    }
</script>

<template>
    <div class="left-nav">
        <ul class="nav flex-column">
            <li class="nav-item nav-item-logo">
                <div class="logo">
                </div>
            </li>
            <template v-if="user.allcaps.allow_add_data || user.allcaps.allow_edit_data || user.allcaps.allow_delete_data">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'dashboard'}">
                        <span class="nav-icon dashboard"></span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'dashboard-people-search'}">
                        <span class="nav-icon user"></span>
                    </router-link>
                    <ul class="nav sub-nav flex-column">
                        <li class="nav-item">
                            <h4 class="nav-text">People</h4>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'dashboard-people-search'}">Search</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'people-add'}">Add New</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'people-review'}">Review</router-link>
                        </li>
                        <li class="nav-item" v-if="eanableEdit">
                            <router-link class="nav-link" :to="{name: 'people-edit'}">Edit</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'dashboard-family-search'}">
                        <span class="nav-icon family"></span>
                    </router-link>
                    <ul class="nav sub-nav flex-column">
                        <li class="nav-item">
                            <h4 class="nav-text">Family</h4>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'dashboard-family-search'}">Search</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'family-add'}">Add New</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'family-review'}">Review</router-link>
                        </li>
                        <li class="nav-item" v-if="eanableEdit">
                            <router-link class="nav-link" :to="{name: 'family-edit'}">Edit</router-link>
                        </li>
                    </ul> 
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'dashboard-tree-search'}">
                        <span class="nav-icon tree"></span>
                    </router-link>
                    <ul class="nav sub-nav flex-column">
                        <li class="nav-item">
                            <h4 class="nav-text">Tree</h4>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'dashboard-tree-search'}">Search</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'tree-add'}">Add New</router-link>
                        </li>
                        <li class="nav-item" v-if="eanableEdit">
                            <router-link class="nav-link" :to="{name: 'edit-tree'}">Edit</router-link>
                        </li>
                    </ul> 
                    
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'dashboard-branch-search'}">
                        <span class="nav-icon branch"></span>
                    </router-link>
                    <ul class="nav sub-nav flex-column">
                        <li class="nav-item">
                            <h4 class="nav-text">Branch</h4>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'dashboard-branch-search'}">Search</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'branch-add'}">Add New</router-link>
                        </li>
                        <li class="nav-item" v-if="eanableEdit">
                            <router-link class="nav-link" :to="{name: 'edit-branch'}">Edit</router-link>
                        </li>
                    </ul> 
                    
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'dashboard-chart-search'}">
                        <span class="nav-icon graph"></span>
                    </router-link>
                </li>
            </template>
            <template>
                <li class="nav-item">
                    <a class="nav-link" :href="wp_logout_url"><span class="nav-icon logout"></span> </a>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            admin_url: wpGenealogy.admin_url,
            user: wpGenealogy.user,
            wp_logout_url: wpGenealogy.wp_logout_url,
            plan: wpGenealogy.plan,
            eanableEdit: false,
            currentRoute: 'Search',
        }
    },
    mounted: function() {
        if (this.$route.name == 'people-edit') {
            this.eanableEdit = true
            this.currentRoute = 'Edit'
        }
    },
    watch: {
        $route(to, from) {
            if (to.name == 'people-edit') {
                this.eanableEdit = true
                this.currentRoute = 'Edit'
            }
            if (to.name != 'people-edit') {
                this.eanableEdit = false
            }
            if (to.name == 'people-search') {
                this.currentRoute = 'Search'
            }
            if (to.name == 'people-add') {
                this.currentRoute = 'Add'
            }
            if (to.name == 'people-review') {
                this.currentRoute = 'Review'
            }
            if (to.name == 'people-merge') {
                this.currentRoute = 'Merge'
            }
        }
    },
    computed: {
        setting: function() {
            return this.$store.getters['setting/data'].data;
        },
        is_pro() {
            if (this.plan == 'premium') {
                return true
            } else {
                return false;
            }
        }
    },
}
</script>
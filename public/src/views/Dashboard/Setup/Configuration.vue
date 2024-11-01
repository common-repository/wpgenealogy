<template>
    <div class="card">
        <div class="card-body setup-child setup-configuration">
            <table class="table table-borderless w-auto mb-0">
                <tr>
                    <td>
                    	<i class="fas fa-arrow-circle-right"></i>
                    </td>
                    <td>
                        <router-link :to="{name: 'setup-configuration-general'}"> Configure Hub Page </router-link>
                    </td>
                    <!--
                    <td><i class="fas fa-arrow-circle-right"></i></td>
                    <td>
                        <router-link :to="{name: 'setup-configuration-log'}"> Log Settings </router-link>
                    </td>
                    <td><i class="fas fa-arrow-circle-right"></i></td>
                    <td>
                        <router-link :to="{name: 'setup-configuration-map'}"> Map Settings </router-link>
                    </td> 
                    -->
                </tr>
                <!--
                <tr>
                    <td><i class="fas fa-arrow-circle-right"></i></td>
                    <td>
                        <router-link :to="{name: 'setup-configuration-chart'}"> Chart Settings </router-link>
                    </td>
                    <td><i class="fas fa-arrow-circle-right"></i></td>
                    <td>
                        <router-link :to="{name: 'setup-configuration-import'}"> Import Settings </router-link>
                    </td>
                    <td><i class="fas fa-arrow-circle-right"></i></td>
                    <td>
                        <router-link :to="{name: 'setup-configuration-template'}"> Template Settings </router-link>
                    </td>
                </tr> 
                -->
            </table>
         
        </div>
    </div>
</template>
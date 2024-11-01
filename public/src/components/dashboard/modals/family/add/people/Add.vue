<template>
    <div class="family-add-people-add">
        <div class="modal" id="family-add-people-add">
            <people-add :addPeopleArgs="addPeopleArgs" @peopleAdded="peopleAdded" />
        </div>
    </div>
</template>
<script>
import peopleAdd from '@/components/dashboard/modals/components/people/Add.vue'
export default {
    props: ['addPeopleArgs'],
    components: {
        'people-add': peopleAdd
    },
    data() {
        return {}
    },
    methods: {
        peopleAdded: function(people) {
            this.$emit('peopleAdded', people);
        }
    }
}
</script>
<template>
    <div class="family-edit-people-add">
        <div class="modal" id="family-edit-people-add">
            <people-add :gedcom="gedcom" :branch="branch" :sex="sex" @peopleAdded="peopleAdded" />
        </div>
    </div>
</template>
<script>
import peopleAdd from '@/components/dashboard/modals/components/people/Add.vue'
export default {
    props: ['gedcom', 'branch', 'sex'],
    components: {
        'people-add': peopleAdd
    },
    data() {
        return {}
    },
    watch: {
        gedcom(value) {
            this.gedcom = value;
        },
        branch(value) {
            this.branch = value;
        },
        sex(value) {
            this.sex = value;
        },
    },
    methods: {
        peopleAdded: function(people) {
            this.$emit('peopleAdded', people);
        }
    }
}
</script>
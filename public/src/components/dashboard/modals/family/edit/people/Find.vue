<template>
    <div class="family-edit-people-find">
        <div class="modal" id="family-edit-people-find">
            <people-find :findPeopleArgs="findPeopleArgs" @peopleFound="peopleFound" />
        </div>
    </div>
</template>
<script>
import peopleFind from '@/components/dashboard/modals/components/people/Find.vue'
export default {
    props: ['findPeopleArgs'],
    components: {
       'people-find': peopleFind 
    },
    data() {
        return {
        }
    },
    methods: {
        peopleFound: function(people) {
            this.$emit('peopleFound', people);
        }
    }
}
</script>
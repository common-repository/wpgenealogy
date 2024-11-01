<template>
    <div>
        <div class="family-tree">
            <ul>
                <li>
                    <ul>
                        <li class="root">
                            <ul class="parents" v-if="parentsFamily">
                                <li>
                                    <div class="indd" v-if="parentsFamily.husbandOBJ">
                                        <a href=""> {{parentsFamily.husbandOBJ.name}}</a>
                                    </div>
                                </li>
                                <li>
                                    <div class="indd" v-if="parentsFamily.wifeOBJ">
                                        <a href=""> {{parentsFamily.wifeOBJ.name}}</a>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="family && family.husbandOBJ" class="indd-box">
                                <div class="indd father">
                                    <a href=""> {{family.husbandOBJ.name}}</a>
                                </div>
                            </div>   
                        </li>
                        <li class="spouse">
                            <ul class="parents" v-if="familyWifeParentsFamily">
                                <li>
                                    <div class="indd" v-if="familyWifeParentsFamily.husbandOBJ">
                                        <a href=""> {{familyWifeParentsFamily.husbandOBJ.name}}</a>
                                    </div>
                                </li>  
                                <li> 
                                    <div class="indd" v-if="familyWifeParentsFamily.wifeOBJ">
                                        <a href=""> {{familyWifeParentsFamily.wifeOBJ.name}}</a>
                                    </div>
                                </li>
                            </ul>
                            <div class="indd-box" v-if="family && family.wifeOBJ">
                                <div class="indd mother">
                                    <a href=""> {{family.wifeOBJ.name}}</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="indd-box childrens" v-if="family && family.childrens">
                        <div class="indd" v-for="child in family.childrens">
                            <a href=""> {{child.peopleOBJ.name}}</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        computed: {
            people() {
                return this.$store.getters['people/data'].data.find(people => people.id == this.$route.params.id);
            },
            family() {
                
                let family = this.$store.getters['family/data'].data.find(
                    family => family.id == this.$route.params.familyId
                );

                if (family && family.husband) {
                    family.husbandOBJ = this.$store.getters['people/data'].data.find(
                        people => people.personID == family.husband && people.gedcom == family.gedcom
                    );
                }
                if (family && family.wife) {
                    family.wifeOBJ = this.$store.getters['people/data'].data.find(
                        people => people.personID == family.wife && people.gedcom == family.gedcom
                    );
                }
                if (family) {
                    family.childrens = this.$store.getters['children/data'].data.filter(children => {
                        if (children.familyID == family.familyID && children.gedcom == family.gedcom) {
                            children.peopleOBJ = this.$store.getters['people/data'].data.find(
                                people => people.personID == children.personID && people.gedcom == children.gedcom
                            );
                            return children;
                        }
                    });
                }
                return family
            },
            families() {
                return this.$store.getters['family/data'].data.filter(family => {
                    if (
                        this.people 
                        && 
                        family.gedcom == this.people.gedcom 
                        && 
                        (family.husband == this.people.personID || family.wife == this.people.personID) 
                        && 
                        family.id != this.$route.params.familyId
                    ) {
                        return family;
                    }
                });
            },
            parentsFamily() {
                
                let family = this.$store.getters['family/data'].data.find(
                    family => family.id == this.$route.params.pFamilyId
                );

                if (family && family.husband) {
                    family.husbandOBJ = this.$store.getters['people/data'].data.find(
                        people => people.personID == family.husband && people.gedcom == family.gedcom
                    );
                }
                if (family && family.wife) {
                    family.wifeOBJ = this.$store.getters['people/data'].data.find(
                        people => people.personID == family.wife && people.gedcom == family.gedcom
                    );
                }
                if (family) {
                    family.childrens = this.$store.getters['children/data'].data.filter(children => {
                        if (children.familyID == family.familyID && children.gedcom == family.gedcom) {
                            children.peopleOBJ = this.$store.getters['people/data'].data.find(
                                people => people.personID == children.personID && people.gedcom == children.gedcom
                            );
                            return children;
                        }
                    });
                }
                return family  
            },
            familyWifeParentsFamily() {
                if (this.family) {
                    let wifeFamily = this.$store.getters['children/data'].data.find(
                        children => children.personID == this.family.wife && children.gedcom == this.family.gedcom
                    );
                    if (wifeFamily) {
                        let family = this.$store.getters['family/data'].data.find(
                            family => family.familyID == wifeFamily.familyID && family.gedcom == wifeFamily.gedcom
                        );
                        if (family && family.husband) {
                            family.husbandOBJ = this.$store.getters['people/data'].data.find(
                                people => people.personID == family.husband && people.gedcom == family.gedcom
                            );
                        }
                        if (family && family.wife) {
                            family.wifeOBJ = this.$store.getters['people/data'].data.find(
                                people => people.personID == family.wife && people.gedcom == family.gedcom
                            );
                        }
                        if (family) {
                            family.childrens = this.$store.getters['children/data'].data.filter(children => {
                                if (children.familyID == family.familyID && children.gedcom == family.gedcom) {
                                    children.peopleOBJ = this.$store.getters['people/data'].data.find(
                                        people => people.personID == children.personID && people.gedcom == children.gedcom
                                    );
                                    return children;
                                }
                            });
                        }
                        return family
                    }
                }
            },
        }
    }
</script>
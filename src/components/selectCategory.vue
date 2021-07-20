<template>
    <b-form-group label-cols="3" horizontal label="Kategori">
        <v-select v-model="kategori" :options="kategoriOption" :dir="direction" :getOptionLabel="kategoriOption => kategoriOption.name"/>
    </b-form-group>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../utils";
export default {
    name: "selectCategory",
    components: {
        "v-select": vSelect,
    },
	props: ['parent-Data'],
    data(){
        return {
            kategori: "",
            kategoriOption: [],
            direction: getDirection().direction
        }
    },
	watch: {
		kategori: function (newVal) {
			this.$emit('answers',newVal);
		}
	},
    async mounted(){
        
    }
}
</script>

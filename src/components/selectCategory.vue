<template>
    <b-form-group label-cols="3" horizontal label="Kategori">
        <v-select v-model="kategori" :options="kategoriOption" :dir="direction" :getOptionLabel="kategoriOption => kategoriOption.name" @change="$emit('answers', kategori)"/>
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
    data(){
        return {
            kategori: "",
            kategoriOption: [],
            direction: getDirection().direction
        }
    },
    async mounted(){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
					query{ customerCategory { 
						name    
					}}
				`,
			}),
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(text) {
			return text.data.customerCategory;
		})
		.then(resp => {
            this.kategoriOption = resp;
		})
    }
}
</script>

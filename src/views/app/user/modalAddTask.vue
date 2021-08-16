<template>
    <b-modal id="modalright" ref="modalright" title="Add Task" modal-class="modal-right">
        <b-form v-if="isLoad2" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-form-group label="Notes">
                <b-textarea v-model="alamat"></b-textarea>
            </b-form-group>
            <b-form-group label="Customer">
                    <vue-autosuggest
                        class="autosuggest suggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik nama customer'}"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        clearable
                        v-model="customer"
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >
                    </vue-autosuggest>
                <b-form-input type="text" v-model="$v.customer.$model" :state="!$v.customer.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                <b-form-invalid-feedback v-if="!$v.customer.required">Harap pilih customer</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Project">
                    <vue-autosuggest
                        class="autosuggest suggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik nama customer'}"
                        :suggestions="filteredOption2s"
                        :render-suggestion="renderSuggestion2"
                        :get-suggestion-value="getSuggestionValue2"
                        :limit="6"
                        clearable
                        v-model="customer"
                        @selected="onAutosuggestSelected2"
                        @input="onAutoSuggestInputChange2"
                    >
                    </vue-autosuggest>
                <b-form-input type="text" v-model="$v.customer.$model" :state="!$v.customer.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                <b-form-invalid-feedback v-if="!$v.customer.required">Harap pilih customer</b-form-invalid-feedback>
            </b-form-group>
        </b-form>
        <template slot="modal-footer">
        <b-row>
            <b-colxx xxs="6" class="text-center">
                <b-form @submit.prevent="onValitadeFormSubmit2('modalright');" class="av-tooltip">
                    <b-button @click="passingData();$emit('answerss', dataReturn);" type="submit" variant="primary" style="width: 100%" :disabled="!isLoad2">Add</b-button>
                </b-form>
            </b-colxx>
            <b-colxx xxs="6" class="text-center">
                <b-button @click="$emit('answerss',null);onFormReset()" type="submit" variant="danger" style="width: 100%" :disabled="!isLoad2">Reset</b-button>
            </b-colxx>
            </b-row>
        </template>
    </b-modal>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapGetters } from "vuex";

import {
    validationMixin
} from "vuelidate";
const {
    required,
    maxLength,
    minLength,
    alpha,
    email,
    numeric,
    maxValue,
    minValue,
    helpers
} = require("vuelidate/lib/validators");

export default {
    components: {
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest
    },
    props:['dataPassing'],
    data() {
        return {
            isLoad2: false,
            
            customer: "",

            filteredOptions: [],
            selected: {},
            dataCust: [],

            filteredOptions2: [],
            selected2: {},
            dataPro: [],
        };
    },
    mixins: [validationMixin],
    validations: {
        customer:{
            required
        }
    },
    methods: {
        passingData(){
            if(!this.$v.namaPro.$invalid && !this.$v.katPro.$invalid){
                this.dataReturn.tmpNama = this.namaPro;
            }
        },
        onValitadeFormSubmit(refname) {
            this.$v.$touch();
            if(!this.$v.$invalid){
                console.log("valid");
                // fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                // method: 'POST',
                // headers: {
                // 'Content-Type': 'application/json',
                // 'Authorization' :'Bearer '+this.currentUser.jwt
                // },
                // body: JSON.stringify({
                //     query: `
                //         mutation{
                //             addProject(params:{
                //                 customer_id:"${this.dataPassing.id}"
                //                 name:"${this.namaPro}"
                //                 project_category:${this.katProId}
                //             }){
                //                 id
                //                 status
                //                 message
                //             }
                //         }
                //     `,
                // }),
				// })
				// .then(function(response) {
				// 	return response.json()
				// })
				// .then(function(text) {
				// 	console.log(text);
				// 	return text.data.addProject;
				// })
				// .then(resp => {
				// 	console.log(resp.id);
				// 	if(resp.status.toLowerCase() == "success"){
                //         this.$toast(resp.message, {
                //             type: "success",
                //             hideProgressBar: true,
                //             timeout: 2000
                //         });
                //         this.$refs[refname].hide();
                //         this.onFormReset2();
                //     }else{
                //         this.$toast(resp.message, {
                //             type: "error",
                //             hideProgressBar: true,
                //             timeout: 2000
                //         });
                //     }
				// });
            }else{
                console.log("error");
            }
        },
        onFormReset(){
            this.$v.$reset();
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
        }
        const filteredData = this.dataCust.customers.filter(option => {
            return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });

        // Store data in one property, and filtered in another
        this.filteredOptions = [
            {
            data: filteredData
            }
        ];
        },

        onAutosuggestSelected(item) {
            this.selected = item;
        },
        renderSuggestion(suggestion) {
            const character = suggestion.item;
            return <b-card class="mb-0 d-flex flex-row" no-body><img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/><div class="d-flex flex-grow-1 min-width-zero"><div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"><div class="min-width-zero"><h6 class="text-muted text-medium mb-1">{character.name}</h6><p class="text-muted text-small mb-2">{character.workPhone}</p></div></div></div></b-card>
        },
        getSuggestionValue(suggestion) {
            this.customer = suggestion.item;
            return suggestion.item.name;
        },

        //autoSuggest project
        onAutoSuggestInputChange2(text, oldText) {
        if (text === "") {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            this.proKat = '';
            this.dataPro = [];
            this.filteredOptions2 = [];
        }
        if(this.custId == ""){
            if(text !== "" && text.length >= 2){
                this.fetchProject("",text);
                setTimeout(() => {
                    const filteredData = this.dataPro.projects.filter(option => {
                        return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
                });
                this.filteredOptions2 = [
                    {
                        data: filteredData
                    }
                ];
                }, 500);
            }
        // Store data in one property, and filtered in another
        }else{
            if(text !== "" && text.length >= 2){
                this.fetchProject(this.custId,text);
                setTimeout(() => {
                    const filteredData = this.dataPro.projects.filter(option => {
                        return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
                });
                this.filteredOptions2 = [
                    {
                        data: filteredData
                    }
                ];
                }, 500);
            }
        }
        },

        onAutosuggestSelected2(item) {
            this.selected2 = item;
        },
        renderSuggestion2(suggestion) {
            const character = suggestion.item;
            return <b-card class="mb-0 d-flex flex-row" no-body><img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/><div class="d-flex flex-grow-1 min-width-zero"><div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"><div class="min-width-zero"><h6 class="text-muted text-medium mb-1">{character.name}</h6><p class="text-muted text-small mb-2">{character.category.name}</p></div></div></div></b-card>
        },
        getSuggestionValue2(suggestion) {
            console.log(suggestion.item);
            this.proId = suggestion.item.id;
            this.proNama = suggestion.item.name;
            this.proKat = suggestion.item.category;
            this.fetchCustomer(suggestion.item.customer_id);
            this.fetchArea(this.proKat.id);
            this.fetchSurface();
            return suggestion.item.name;
        },
        fetchProject(custId,proName){
            let str = "";
            let filter = "";
            let search = "";
            if(custId != "" || proName != ""){
                if(custId != ""){
                    filter = `customer_id: "${custId}"`;
                }
                if(proName != ""){
                    search = `search:"${proName}"`;
                }
                str = "(filter: {"+filter+" "+search+"})";
                console.log(str);
            }
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                 'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query {projects ${str}{
                        count
                        projects{
                            name
                            id
                            status
                            customer_id
                            category {
                                id
                                name
                            }
                        }
                        }
                        }
                    `,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.projects;
            })
            .then(resp => {
                this.dataPro = resp;
            })
        },
    },
    async mounted(){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
			},
			body: JSON.stringify({
				query: `
					query{ customers {
                    count
                    customers{
                        id
                        name
                        workPhone
                    }}
                    }
				`,
			}),
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(text) {
			return text.data.customers;
		})
		.then(resp => {
            this.dataCust = resp;
            this.isLoad2 = true;
		})
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
            },
            body: JSON.stringify({
                query: `
                    query {projects ${str}{
                    count
                    projects{
                        name
                        id
                        status
                        customer_id
                        category {
                            id
                            name
                        }
                    }
                    }
                    }
                `,
            }),
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(text) {
            return text.data.projects;
        })
        .then(resp => {
            this.dataPro = resp;
        })
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
    } 

};
</script>
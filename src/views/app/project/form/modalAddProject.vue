<template>
    <b-modal id="modalright2" ref="modalright" title="Add Project" modal-class="modal-right">
        <b-form @submit.prevent="onValitadeFormSubmit2" class="av-tooltip tooltip-label-right">
            <b-form-group label-cols="3" horizontal label="Customer">
                <b-form-input type="text" v-model="$v.custNama.$model" :state="!$v.custNama.$error" disabled placeholder="Harap pilih customer"/>
                <b-form-invalid-feedback v-if="!$v.custNama.required">Harap pilih customer</b-form-invalid-feedback>        
            </b-form-group>
            <b-form-group label-cols="3" horizontal label="Nama" >
                <b-form-input type="text" v-model="$v.namaPro.$model" :state="!$v.namaPro.$error" placeholder="Masukkan judul proyek"/>
                <b-form-invalid-feedback v-if="!$v.namaPro.required">Harap isi nama</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.namaPro.minLength || !$v.namaPro.maxLength">Panjang nama 10-255 karakter</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label-cols="3" horizontal label="Kategori">
                <v-select
                v-model="katPro"
                :options="katProOption"
                label="name"
                @input="choose"
                placeholder="Pilih kategori"/>
                <b-form-input type="text" v-model="$v.katPro.$model" :state="!$v.katPro.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                <b-form-invalid-feedback v-if="!$v.katPro.required">Harap pilih kategori</b-form-invalid-feedback>
            </b-form-group>
        </b-form>
        <template slot="modal-footer">
        <b-row>
            <b-colxx xxs="6" class="text-center">
                <b-form @submit.prevent="onValitadeFormSubmit2('modalright');" class="av-tooltip">
                    <b-button @click="passingData();$emit('answers', dataReturn);" type="submit" variant="primary" style="width: 100%">Add</b-button>
                </b-form>
            </b-colxx>
            <b-colxx xxs="6" class="text-center">
                <b-button @click="$emit('answers',null);onFormReset2()" type="submit" variant="danger" style="width: 100%">Reset</b-button>
            </b-colxx>
            </b-row>
        </template>
    </b-modal>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection, setThemeRadius } from "../../../../utils";

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
    data() {
        return {
            isLoad: false,
            custPhone: "",
            custId: "",
            custNama: "",
            customer: "",
            namaPro: "",
            tglPro: "",
            katPro: "",
            katProId: 0,
            katProOption: [],
            katArea: [],

            filteredOptions: [],
            selected: {},
            dataCust: [],
        };
    },
    mixins: [validationMixin],
    validations: {
        custNama:{
            required
        },
        namaPro: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(255)
        },
        katPro:{
            required
        }
    },
    methods: {
        choose(value) {
            this.katPro = value.name;
            this.katProId = value.id;
            this.fetchArea(value.id);
        },
        passingData(){
            if(!this.$v.custNama.$invalid && !this.$v.namaPro.$invalid && !this.$v.katro.$invalid){
                this.dataReturn.tmpNama = this.namaPro;
            }
        },
        fetchArea(val){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query{
                            areaCategory(project_category:${val}) {
                                id
                                name
                            }
                        }
                    `,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.areaCategory;
            })
            .then(resp => {
                this.katArea = resp;
            })
        },
        onValitadeFormSubmit2() {
            this.$v.custNama.$touch();
            this.$v.namaPro.$touch();
            this.$v.katPro.$touch();
            if(!this.$v.custNama.$invalid && !this.$v.namaPro.$invalid && !this.$v.katPro.$invalid){
                console.log("valid");
                fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation{
                            addProject(params:{
                                customer_id:"${this.custId}"
                                name:"${this.namaPro}"
                                project_category:${this.katProId}
                            }){
                                status
                                message
                            }
                        }
                    `,
                }),
				})
				.then(function(response) {
					return response.json()
				})
				.then(function(text) {
					console.log(text);
					return text.data.addProject;
				})
				.then(resp => {
					console.log(resp.message);
					if(resp.status.toLowerCase() == "success"){
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                    }else{
                        this.$toast(resp.message, {
                            type: "error",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                    }
				});
            }else{
                console.log("error");
            }
        },
        onFormReset(){
            this.custNama=""; this.custPhone="";this.namaPro = "";this.tglPro = "";this.katPro = "";
            this.$v.$reset();
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            this.custPhone = '';
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
            this.custId = suggestion.item.id;
            this.custNama = suggestion.item.name;
            this.custPhone = suggestion.item.workPhone;
            console.log(this.custPhone);
            return suggestion.item.name;
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
            query{
                          projectCategory{
                              id
                              name
                          }
                      }
          `,
        }),
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(text) {
        return text.data.projectCategory;
      })
      .then(resp => {
              this.katProOption = resp;
      })
      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
					query{ customers {
                    count
                    customers{
                        id
                        name
                        email
                        category{
                            name
                        }
                        priceCategory{
                            name
                        }
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
            this.isLoad = true;
            this.dataCust = resp;
		})
    }

};
</script>
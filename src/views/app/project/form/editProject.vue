<template>
<div v-if="isLoad">
<b-row>
    <b-colxx xxs="12">
        <h1>Edit Project</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Profil Project">
                <b-form-group label-cols="3" horizontal label="Customer">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik nama customer'}"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        v-model="custNama"
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >
                    <template slot-scope="{suggestion}">
                        <span class="my-suggestion-item">{{suggestion.item.name}}</span>
                    </template>
                    </vue-autosuggest>
                    <b-form-input type="text" v-model="$v.custNama.$model" :state="!$v.custNama.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                    <b-form-invalid-feedback v-if="!$v.custNama.required">Harap pilih customer</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Nama">
                    <b-form-input type="text" v-model="$v.namaPro.$model" :state="!$v.namaPro.$error" />
                    <b-form-invalid-feedback v-if="!$v.namaPro.required">Harap isi nama</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.namaPro.minLength || !$v.namaPro.maxLength">Panjang nama 10-255 karakter</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Tgl reminder">
                    <datepicker
                        :bootstrap-styling="true"
                        :placeholder="$t('form-components.date')"
                        :clear-button="true"
                        @cleared="clear"
                        v-model="tglPro"
                    ></datepicker>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Kategori">
                    <v-select 
                    v-model="katPro" 
                    :options="katProOption" 
                    label="name" @input="choose" 
                    placeholder="Pilih kategori"/>
                    <b-form-input type="text" v-model="$v.katPro.$model" :state="!$v.katPro.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                    <b-form-invalid-feedback v-if="!$v.katPro.required">Harap pilih kategori</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Kategori Area">
                    <div class="text text-medium mt-1" for="" v-for="item in katArea" :key="item.id">{{ item.name }}</div><br>
                </b-form-group>
            </b-card>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4" style="position: sticky; top: 20vh">
                <b-card-title>Project Summary</b-card-title>
                <b-card v-if="custNama != ''" class="mb-3 d-flex flex-row" no-body>
                    <img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/>
                    <div class="d-flex flex-grow-1 min-width-zero">
                        <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div class="min-width-zero">
                                <h6 class="text-muted text-medium mb-1">
                                    {{ custNama }}
                                </h6>
                                <p class="text-muted text-small mb-2">
                                    {{ custPhone }}
                                </p>
                            </div>
                        </div>
                    </div>
                </b-card>
                <b-card v-else class="mb-3 d-flex flex-row" no-body>
                    <p class="text-muted m-3" style="font-style: italic;">No customer selected</p>
                </b-card>
                <p v-if="namaPro != ''" class="mb-3">{{ namaPro }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Your project name</p>
                <p v-if="tglPro != ''" class="mb-3">{{ dateFormat(tglPro) }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Reminder date</p>
                <b-row>
                    <b-colxx xxs="8">
                        <p v-if="katPro != ''" class="mb-3">{{ katPro }}</p>
                        <p v-else class="text-muted mb-3" style="font-style: italic;">Kategori</p>
                    </b-colxx>
                    <b-colxx xxs="4" class="text-right">
                        <b-badge pill variant="warning">Kategori</b-badge>
                    </b-colxx>
                </b-row>
                <b-row>
                    <b-colxx xxs="6" class="text-center">
                    <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip">
                        <b-button type="submit" variant="primary" style="width: 100%">Edit</b-button>
                    </b-form>
                    </b-colxx>
                    <b-colxx xxs="6" class="text-center">
                    <b-button @click="onFormReset" type="submit" variant="danger" style="width: 100%">Reset</b-button>
                    </b-colxx>
                </b-row>
            </b-card>
        </b-colxx>
</b-row>
</div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection, setThemeRadius } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";
import Datepicker from "vuejs-datepicker";

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

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)
const phone = helpers.regex('numeric', /^(09)[0-9]{9}/);

export default {
    components: {
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest,
        "selectCategory": selectCategory,
        datepicker: Datepicker
    },
    data() {
        return {
            isLoad: false,
            proId: 0,
            custPhone: '',
            custNama: '',
			customer: "",
			namaPro: "",
			tglPro: "",
			katPro: "",
			katProId: 0,
			katStr: "",
            katProOption: [],
            katArea: [],

            filteredOptions: [],
            selected: {},
            dataCust: []
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
            this.katProId = value.id;
            this.katPro = value.name;
            this.fetchArea(value.id);
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
        dateFormat(date){
            let d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            return da + " "+ mo + " " +ye;
        
        },
        clear(){
            this.tglPro = "";
        },
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                console.log("valid");
                let date;
                let str;
                if(this.tglPro != ''){
                    date = new Date(this.tglPro).toISOString();
                    str = `tgl_reminder:"${date}"`;
                }else{
                    date = null;
                    str = `tgl_reminder:${date}`;
                }
                console.log(str);
                fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                        query: `
                            mutation{
                                updateProject(
                                    project_id:${this.proId}
                                    params:{
                                    name:"${this.namaPro}"
                                    project_category:${this.katProId}
                                    ${str}
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
					return text.data.updateProject;
				})
				.then(resp => {
					console.log(resp.message);
					if(resp.status.toLowerCase() == "success"){
                        this.$toast(resp.message, {
                            type: "success",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        setTimeout(() => {
                            window.location = window.location.origin+"/app/datatable/projectTable";
                        }, 1000);
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
            this.fetching();
            this.$v.$reset();
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === '') {
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
            this.custNama = suggestion.item.name;
            this.custPhone = suggestion.item.workPhone;
            console.log(this.custPhone);
            return suggestion.item.name;
        },
        fetching(){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query{
                            projectDetail(project_id:${this.proId}){
                                name
                                customer{
                                    id
                                    name
                                    workPhone
                                }
                                category{
                                    id
                                    name
                                }
                                areaCategories{
                                    name
                                }
                                tgl_reminder
                            }
                        }
                    `,
                })
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                console.log(text.data.projectDetail);
                return text.data.projectDetail;
            })
            .then(resp => {
                this.detail = resp;
                console.log(resp);
                if(this.detail == null){
                    window.location = window.location.origin +"/error?id=404&name=project";
                }else{
                    this.isLoad = true;
                    this.custId = this.detail.customer.id;
                    this.custNama = this.detail.customer.name;
                    this.custPhone = this.detail.customer.workPhone;
                    this.namaPro = this.detail.name;
                    this.katPro = this.detail.category.name;
                    this.katProId = this.detail.category.id;
                    this.katArea = this.detail.areaCategories;
                    if(!this.detail.tgl_reminder){
                        this.tglPro = '';
                    }
                }
            })
        }
    },
    async mounted(){
        this.proId = this.$route.query.id;
		this.fetching();
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
            this.isLoad = true;
            this.dataCust = resp;
			console.log(resp);
		})
    }
    
};
</script>

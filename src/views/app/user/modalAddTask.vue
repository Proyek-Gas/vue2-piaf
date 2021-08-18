<template>
    <b-modal id="modalright" ref="modalright" title="Add Task" modal-class="modal-right">
        <b-form v-if="isLoad2" @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-form-group label="Notes">
                <b-textarea v-model="notes"></b-textarea>
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
                        v-model="tmpCustNama"
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >
                    </vue-autosuggest>
                <b-form-input type="text" v-model="$v.custNama.$model" :state="!$v.custNama.$error" style="display:none;"/>
                <b-form-invalid-feedback v-if="!$v.custNama.required">Harap pilih customer</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Project">
                    <vue-autosuggest
                        class="autosuggest suggest"
                        :input-props="{id:'autosuggest__input2', class:'form-control', placeholder:'Ketik judul proyek'}"
                        :suggestions="filteredOptions2"
                        :render-suggestion="renderSuggestion2"
                        :get-suggestion-value="getSuggestionValue2"
                        :limit="6"
                        clearable
                        v-model="tmpProNama"
                        @selected="onAutosuggestSelected2"
                        @input="onAutoSuggestInputChange2"
                    >
                    </vue-autosuggest>
                <b-form-input type="text" v-model="$v.proNama.$model" :state="!$v.proNama.$error" style="display:none;"/>
                <b-form-invalid-feedback v-if="!$v.proNama.required">Harap pilih project</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Tanggal Jatuh Tempo">
                <datepicker
                    :bootstrap-styling="true"
                    :placeholder="$t('form-components.date')"
                    :clear-button="true"
                    @cleared="clear"
                    v-model="tglTask"
                ></datepicker>
            </b-form-group>
            <b-form-group label="Reccuring">
                <b-input-group append="hari" class="mb-3">
                    <b-form-input type="number" step="1" v-model="$v.recur.$model" :state="!$v.recur.$error" @blur="defaultRecur" placeholder="Masukkan jumlah hari" />
                    <b-form-invalid-feedback v-if="!$v.recur.minValue">Minimum 0</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.recur.maxValue">Maksimal 365</b-form-invalid-feedback>
                </b-input-group>
            </b-form-group>  
        </b-form>
        <template slot="modal-footer">
        <b-row>
            <b-colxx xxs="6" class="text-center">
                <b-form @submit.prevent="onValitadeFormSubmit('modalright');" class="av-tooltip">
                    <b-button type="submit" variant="primary" style="width: 100%" :disabled="!isLoad2">Add</b-button>
                </b-form>
            </b-colxx>
            <b-colxx xxs="6" class="text-center">
                <b-button @click="onFormReset()" type="submit" variant="danger" style="width: 100%" :disabled="!isLoad2">Reset</b-button>
            </b-colxx>
            </b-row>
        </template>
    </b-modal>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
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
        "vue-autosuggest": VueAutosuggest,
        datepicker: Datepicker
    },
    props:['dataPassing'],
    data() {
        return {
            isLoad2: false,
            notes: "",

            customer: "",
            tmpCustNama: "",
            custNama: "",
            project: "",
            tmpProNama: "",
            proNama: "",
            tglTask: "",
            recur: 30,

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
        recur: {
            minValue: minValue(0),
            maxValue: maxValue(365),
        },
        custNama:{
            required
        },
        proNama:{
            required
        }
    },
    methods: {
        defaultRecur(){
            console.log("y");
            if(this.recur == ""){
                this.recur = 30;
            }
        },
        clear(){
            this.tglTask = "";
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        onValitadeFormSubmit(refname) {
            this.$v.$touch();
            console.log(this.proNama);
            if(!this.$v.$invalid){
                if(new Date(this.tglTask) < new Date()){
                    this.$toast("Tanggal jatuh tempo tidak valid", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }else{
                    console.log("valid");
                    let str;
                    if(this.tglTask != ''){
                        str = `due_date:"${this.formatDate(this.tglTask)}"`;
                    }else{
                        str = `due_date:null`;
                    }
                    // fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                    // method: 'POST',
                    // headers: {
                    // 'Content-Type': 'application/json',
                    // 'Authorization' :'Bearer '+this.currentUser.jwt
                    // },
                    // body: JSON.stringify({
                    //     query: `
                    //         mutation{
                    //             addTask(
                    //                 params:{
                    //                     description:"${this.notes}",
                    //                     project_id:${this.project.id},
                    //                     ${str}
                    //                     recurring:${this.recur},
                    //                     tags: 1
                    //                 }
                    //             ){
                    //                 status
                    //                 message
                    //             }
                    //         }   
                    //      `,
                    // }),
                    // })
                    // .then(function(response) {
                    // 	return response.json()
                    // })
                    // .then(function(text) {
                    //     console.log(text.data);
                    // 	return text.data.addTask;
                    // })
                    // .then(resp => {
                    // 	if(resp.status.toLowerCase() == "success"){
                    //         this.$toast(resp.message, {
                    //             type: "success",
                    //             hideProgressBar: true,
                    //             timeout: 2000
                    //         });
                    //         this.$refs[refname].hide();
                    //         this.onFormReset();
                    //     }else{
                    //         this.$toast(resp.message, {
                    //             type: "error",
                    //             hideProgressBar: true,
                    //             timeout: 2000
                    //         });
                    //     }
                    // });
                }
            }else{
                console.log("error");
            }
        },
        onFormReset(){
            this.customer = ""; this.project = "";
            this.custNama = ""; this.proNama = "";
            this.recur = 30;
            this.$v.$reset();
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
            this.customer = '';
            this.custNama = '';
            this.proNama = '';
            this.project = '';
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
            this.tmpCustNama = suggestion.item.name;
            this.custNama = this.tmpCustNama;
            return suggestion.item.name;
        },

        //autoSuggest project
        onAutoSuggestInputChange2(text, oldText) {
            if (text === "") {
                /* Maybe the text is null but you wanna do
                *  something else, but don't filter by null.
                */
                this.proNama = "";
                this.project = "";
                this.dataPro = [];
                this.filteredOptions2 = [];
            }
            if(this.customer == ""){
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
                    console.log(this.customer);
                    this.fetchProject(this.customer.id,text);
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
            this.project = suggestion.item;
            this.tmpProNama = suggestion.item.name;
            this.proNama = this.tmpProNama;
            console.log(this.proNama);
            this.fetchCustomer(suggestion.item.customer_id);
            //this.fetchArea(this.proKat.id);
            //this.fetchSurface();
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
        fetchCustomer(val){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{ customerDetail(customer_id:"${val}") {
                            id
                            name
                            email
                            category{
                                name
                            }
                            priceCategory{
                                name
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
                return text.data.customerDetail;
            })
            .then(resp => {
                if(resp != null){
                    this.custNama = resp.name;
                    this.tmpCustNama = resp.name;
                    this.customer = resp;
                }
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
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
    } 

};
</script>
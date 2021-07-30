<template>
<div v-if="isLoad">
<b-row>
    <b-colxx xxs="12">
        <h1>Detail Quote</h1>
        <piaf-breadcrumb />
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-row>
            <b-colxx xxs="6" xl="6">
                <h1>Logo dan <br> profil perusahaan</h1>
            </b-colxx>
            <b-colxx xxs="6" xl="6" class="mb-3">
                <b-row>
                    <b-colxx xxs="6" xl="6" class="text-left">
                    <p class="text text-medium mt-1">
                        Quote
                    </p>
                    </b-colxx>
                    <b-colxx xxs="6" xl="6" class="text-left">
                    <p class="text text-medium mt-1">
                        {{ quote }}
                    </p>
                    </b-colxx>
                     <b-colxx xxs="6" xl="6" class="text-left">
                    <p class="text text-medium mt-1">
                        Tanggal
                    </p>
                    </b-colxx>
                    <b-colxx xxs="6" xl="6" class="text-left">
                    <p class="text text-medium mt-1">
                        {{ dateFormat(tglQuote) }}
                    </p>
                    </b-colxx>
                     <b-colxx xxs="6" xl="6" class="text-left">
                    <p class="text text-medium mt-1">
                        Berlaku sampai
                    </p>
                    </b-colxx>
                    <b-colxx xxs="6" xl="6" class="text-left">
                    <p class="text text-medium mt-1">
                        {{ dateFormat(tglUntil) }}
                    </p>
                    </b-colxx>
                </b-row>
            </b-colxx>
        </b-row>
        <div class="separator mb-5"></div>
        <b-row>
            <b-colxx xxs="12" xl="6">
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-card class="mb-4" title="Customer">  
                    <b-card class="mb-0" title="Data Customer">
                        <h6 class="text-muted text-medium mb-1">
                            {{ custNama }}
                        </h6>
                        <p class="text-muted text-small mb-2">
                            {{ custEmail }}
                        </p>
                        <p class="text-muted text-small mb-2">
                            {{ custCate }}
                        </p>
                        <div class="text-right" v-if="custId != ''">
                            <b-button class="mb-1" variant="primary " :to="movePageDetail(custId)">Detail</b-button>
                        </div>
                    </b-card>
                </b-card>
            </b-form>
            </b-colxx>
            <b-colxx xxs="12" xl="6">
                <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-card class="mb-4" title="Project">
                    <b-card class="mb-0" title="Data Project">
                        <h6 class="text-muted text-medium mb-1">
                            {{ proNama }}
                        </h6>
                        <p class="text-muted text-small mb-2">
                            {{ proKat }}
                        </p>
                    </b-card>
                </b-card>
            </b-form>
            </b-colxx>
        </b-row>
        <div class="separator mb-2"></div>
         <b-card class="mb-4" v-for="area in arrKumpulanArea" :key="area.category.name" >
                  <b-row style="margin-bottom: 2vh">
                    <b-colxx xxs="6" xl="6"><h2>{{area.category.name}}</h2></b-colxx>
                  </b-row>
                 <b-row>
                    <b-colxx xxs="12" xl="6">
                        <b-row>
                            <b-colxx xxs="6" xl="6" class="text-left">
                            <p class="text text-medium mt-1">
                                Section Area
                            </p>
                            </b-colxx>
                            <b-colxx xxs="6" xl="6" class="text-left">
                            <p class="text text-medium mt-1">
                                {{ surface(area.surface_preparation) }}
                            </p>
                            </b-colxx>
                        </b-row>
                    </b-colxx>
                    <b-colxx xxs="12" xl="6">
                        <b-row>
                            <b-colxx xxs="6" xl="6" class="text-left">
                            <p class="text text-medium mt-1">
                                Luas Area
                            </p>
                            </b-colxx>
                            <b-colxx xxs="6" xl="6" class="text-left">
                            <p class="text text-medium mt-1">
                                {{ area.surface_area }}
                            </p>
                            </b-colxx>
                        </b-row>
                    </b-colxx>
                </b-row>
                
         </b-card>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
        <div class="mb-4" style="position: sticky; top: 20vh">
            <b-card class="mb-4" no-body>
                <b-tabs card no-fade>
                <b-tab title="Action" active title-item-class="w-50 text-center">
                    <h5 class="mb-4 card-title">Homemade Cheesecake with Fresh Berries and Mint</h5>
                    <b-button size="sm" variant="outline-primary">Edit</b-button>
                </b-tab>
                <b-tab title="Logs" title-item-class="w-50 text-center">
                    <h5 class="mb-4 card-title">Wedding Cake with Flowers Macarons and Blueberries</h5>
                    <b-button size="sm" variant="outline-primary">Edit</b-button>
                </b-tab>
                </b-tabs>
          </b-card>
        </div>
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
import Switches from "vue-switches";

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
    helpers,
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)
const phone = helpers.regex('numeric', /^(09)[0-9]{9}/);

export default {
    components: {
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest,
        "selectCategory": selectCategory,
        datepicker: Datepicker,
    },
    data() {
        return {
            isLoad: false,
            quote: "# 5037",
            status: "",
            custEmail: "",
            custId: "",
            custNama: "",
            custCate: "",
            proNama: "",
            proKat: "",
            tglQuote: "",
            tglUntil: "",
            detail: [],
            arrDetailProject : [],

/////
            arrKumpulanArea : [],
            area: "",
///ini nanti tak pakai

            luasArea : -1,
            arrSelectedItem : [],


            surface: [],
            surfaceOptions: [],
          //  schItem: "",
            primarySmall: false,
            btn1: "",
            btn2: "",

            areaOptions: [],
            filteredOptions: [],
            selected: {},
            dataCust: [],
            filteredOptions2: [],
            selected2: {},
            dataPro: [],
            filteredOptions3: [],
            selected3: {},
            dataSchItem: []
        };
    },
    mixins: [validationMixin],
    validations: {
        proNama:{
            required
        },
    },
    methods: {
        movePageDetail(val){
            return "/app/datatable/customerTable/cDetail?id="+val
		},
        newArea(){
          let cek = true
            for(let i=0; i<this.arrKumpulanArea.length; i++){
              if(this.arrKumpulanArea[i].id == this.area.id){
                cek = false
              }
            }
          if(cek){
            this.arrKumpulanArea.push(this.area)
          }
        },
        surface(arr){
            let arrTmp = arr.split(",");
            console.log(arrTmp);
        },
        dateFormat(date){
            let d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            return da + " "+ mo + " " +ye;
        },
        clear(){
            this.tglQuote = "";
        },
        fetchArea(val) {
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
                this.areaOptions = resp;
                for(let i=0; i< this.areaOptions.length; i++){
                  this.areaOptions[i].selectedItem = []
                }
            })
        },
        fetchSurface(){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query{
                            surfacePreparations{
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
                return text.data.surfacePreparations;
            })
            .then(resp => {
                this.surfaceOptions = resp;
                console.log(this.surfaceOptions);
            })
        },
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                if(new Date(this.tglUntil) < new Date(this.tglQuote)){
                    this.$toast("Tanggal berlaku tidak valid", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }else{
                    console.log("valid");
                }
                // let date;
                // let str;
                // if(this.tglQuote != ''){
                //     date = new Date(this.tglQuote).toISOString();
                //     str = `tgl_reminder:"${date}"`;
                // }else{
                //     date = null;
                //     str = `tgl_reminder:${date}`;
                // }
                // console.log(str);
                // fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                // method: 'POST',
                // headers: {
                // 'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({
                //     query: `
                //         mutation{
                //             addProject(params:{
                //                 customer_id:"${this.custId}"
                //                 name:"${this.namaPro}"
                //                 project_category:${this.katProId}
                //                 ${str}
                //             }){
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
				// 	console.log(resp.message);
				// 	if(resp.status.toLowerCase() == "success"){
                //         this.$toast(resp.message, {
                //             type: "success",
                //             hideProgressBar: true,
                //             timeout: 2000
                //         });
                //         setTimeout(() => {
                //             window.location = window.location.origin+"/app/datatable/projectTable";
                //         }, 1000);
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
            this.custNama=""; this.custEmail="";this.namaPro = "";this.tglQuote = "";this.katPro = "";
            this.$v.$reset();
        },
        //autoSuggest customer
        onAutoSuggestInputChange(text, oldText) {
        if (text === "") {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            this.custEmail = '';
            this.custCate = '';this.custId = '';
            this.proNama = '';this.proKat = '';
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
            this.custEmail = suggestion.item.email;
            console.log(suggestion.item);
            this.custCate = suggestion.item.category.name +" - "+ suggestion.item.priceCategory.name;
            return suggestion.item.name;
        },

        //autoSuggest project
        onAutoSuggestInputChange2(text, oldText) {
        if (text === "") {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            console.log("masuk");
            this.proKat = '';
            this.dataPro = [];
            this.filteredOptions2 = [];
        }
        console.log("data:"+this.filteredOptions2);
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
            return <b-card class="mb-0 d-flex flex-row" no-body><img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/><div class="d-flex flex-grow-1 min-width-zero"><div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"><div class="min-width-zero"><h6 class="text-muted text-medium mb-1">{character.name}</h6><p class="text-muted text-small mb-2">{character.name}</p></div></div></div></b-card>
        },
        getSuggestionValue2(suggestion) {
            this.proNama = suggestion.item.name;
            this.proKat = suggestion.item.category;
            this.fetchCustomer(suggestion.item.customer_id);
            this.fetchArea(this.proKat.id);
            this.fetchSurface();
            return suggestion.item.name;
        },
        deleteProject(index){
            this.arrKumpulanArea.splice(index,1)
        },

        //autoSuggest item
        onAutoSuggestInputChange3(text, oldText) {
        if (text === "") {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            //this.item = '';
            this.dataSchItem = [];
            this.filteredOptions3 = [];
        }
        console.log(this.primarySmall);
            if(text !== "" && text.length >= 2){
                this.fetchSchItem(text);
                console.log("masuk1");
                    const filteredData = this.dataSchItem.filter(option => {
                        return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
                    });
                    this.filteredOptions3 = [
                        {
                            data: filteredData
                        }
                    ];
            }
            console.log(this.filteredOptions3);
        },

        onAutosuggestSelected3($event,a) {
          console.log(a)
          console.log($event.item)
          let cek = true
          for(let i=0; i<this.arrKumpulanArea[a].selectedItem.length; i++){
              if(this.arrKumpulanArea[a].selectedItem[i].id == $event.item.id){
                cek = false
              }
          }
          if(cek){
             this.arrKumpulanArea[a].selectedItem.push($event.item)
          }
          console.log(this.arrKumpulanArea[a].selectedItem)
        },
        renderSuggestion3(suggestion) {
            const character = suggestion.item;
            console.log(character.isItem);
            if(character.isItem == true){
                return <b-card class="mb-0 d-flex flex-row" no-body>
                            <div src="/assets/img/profiles/l-1.jpg" 
                                alt="Card image cap" 
                                class="align-self-center list-thumbnail-letters rounded-circle small mr-2" 
                                style={{ background: `#${character.color.hex_code}` }}>
                            </div>
                            <div class="d-flex flex-grow-1 min-width-zero">
                                <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                    <div class="min-width-zero">
                                        <h6 class="text-muted text-medium mb-1">{character.name}</h6>
                                        <p class="text-muted text-small mb-2">{character.item_code} - {character.itemCategory.name}</p>
                                    </div>
                                </div>
                            </div>
                            <h6 class="mr-1 text-muted text-medium mt-3">
                                ITEM
                            </h6>
                        </b-card>

            }else{
                return <b-card class="mb-0 d-flex flex-row" no-body>
                            <div src="/assets/img/profiles/l-1.jpg" 
                                alt="Card image cap" 
                                class="align-self-center list-thumbnail-letters small mr-2" 
                                style={{ background: `#${character.color.hex_code}` }}>
                            </div>
                            <div class="d-flex flex-grow-1 min-width-zero">
                                <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                    <div class="min-width-zero">
                                        <h6 class="text-muted text-medium mb-1">{character.name}</h6>
                                        <p class="text-muted text-small mb-2">{character.color.ind_name}</p>
                                    </div>
                                </div>
                            </div>
                            <h6 class="mr-1 text-muted text-medium mt-3">
                                SCHEME
                            </h6>
                        </b-card>
            }
        },
        getSuggestionValue3(suggestion) {

            return suggestion.item.name;
        },
        fetchCustomer(val){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query{ customerDetail(customer_id:"${val}") {
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
                console.log(text.data.customerDetail);
                return text.data.customerDetail;
            })
            .then(resp => {
                console.log(resp)
                if(resp != null){
                    this.custNama = resp.name;  
                    this.custEmail = resp.email;
                    this.custCate = resp.category.name +" - "+ resp.priceCategory.name;    
                }
            })
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
                console.log(text.data.projects);
                return text.data.projects;
            })
            .then(resp => {
                this.dataPro = resp;
                console.log(this.dataPro);
            })
        },
        fetchSchItem(val){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query{
                            schemeAndItemSearch(search:"${val}"){
                                id
                                name
                                color{
                                    id_ral
                                    hex_code
                                    ind_name
                                    eng_name
                                }
                                isItem
                                item_code
                                itemCategory{
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
                return text.data.schemeAndItemSearch;
            })
            .then(resp => {
                this.dataSchItem = resp;
                console.log(this.dataSchItem);
            })
        },
    },
    async mounted(){
        this.qId = this.$route.query.id;
        this.qVer = this.$route.query.ver;
        if(this.qId && this.qVer){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
					query{
                    quoteDetail(quote_id:${this.qId} version:${this.qVer}){
                        id
                        project{
                        id
                        name
                        category{
                            name
                        }
                        customer{
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
                        status{
                        name
                        }
                        total
                        last_version
                        notes
                        created_at
                        userCreate{
                        name
                        role{
                            name
                        }
                        }
                        areaItems{
                            category{
                            name
                            }
                            surface_area
                            total
                            total_hpp
                            surface_preparation
                            items{
                                        item_id
                            liter
                            coat
                            dry_film_thickness
                            theoritical
                            practical
                            loss
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
			return text.data.quoteDetail;
		})
		.then(resp => {
            this.detail = resp;
            console.log(this.detail);
            this.isLoad = true;
            this.tglQuote = new Date(this.detail.created_at);
            this.tglUntil = new Date(new Date(this.detail.created_at).getTime()+(30*24*60*60*1000));
            this.custNama = this.detail.project.customer.name;
            this.custEmail = this.detail.project.customer.email;
            this.custCate = this.detail.project.customer.category.name + " - "+ this.detail.project.customer.priceCategory.name;
            this.proNama = this.detail.project.name;
            this.proKat = this.detail.project.category.name;
            this.arrKumpulanArea = this.detail.areaItems;
            console.log(this.arrKumpulanArea);
        })
        }else{
            window.location = window.location.origin +"/error?id=404&name=quote";
        }
    }   
};
</script>

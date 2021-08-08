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
                                Section Area :
                            </p>
                            </b-colxx>
                            <b-colxx xxs="6" xl="6" class="text-left">
                                <div v-if="area.surface_preparation != null" >
                                    <div v-for="item in splitSurface(area.surface_preparation)" :key="item">
                                        <h6>
                                            <b-badge class="mb-0" pill variant="secondary" style="width: 100%;">{{ item }}</b-badge>
                                        </h6>
                                    </div>
                                </div>
                                <div v-else>
                                    <p class="text-muted text-medium mt-1" style="font-style: italic;">No surface selected</p>
                                </div>
                            </b-colxx>
                        </b-row>
                    </b-colxx>
                    <b-colxx xxs="12" xl="6">
                        <b-row>
                            <b-colxx xxs="6" xl="6" class="text-right">
                                <p class="text text-medium mt-1">
                                    Luas Area :
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
                <b-row>

                      <b-colxx xxs="12" xl="12" class="text-left">
                        <p class="mb-2">
                                HPP/Total
                                <span class="float-right text-muted">  {{area.total_hpp |currency}}/  {{area.total | currency}}</span>
                              </p>
                              <b-progress :value="(area.total_hpp / area.total) * 100"></b-progress>
                  </b-colxx>
                </b-row>
                <b-row>
                   <b-colxx xxs="12" xl="12">
                    <p class="text text-medium mt-3">
                        Item
                    </p>
                    <table-item :dataComponent="area.items"></table-item>
                   </b-colxx>
                </b-row>
         </b-card>
        <h4>Other Version</h4>
        <div v-if="arrVersi == ''">
            <b-card class="mb-4 text-center">
                <p class="text-muted text-medium mt-1" style="font-style: italic;">
                    This is the latest version
                </p>
            </b-card>
        </div>
        <div v-else>
            <b-row class="mb-3">
                <b-colxx xxs="6" class="text-center">
                    <b-button @click="previous" variant="primary" style="width: 50%">Previous</b-button>
                </b-colxx>
                <b-colxx xxs="6" class="text-center">
                <b-button @click="next" variant="danger" style="width: 50%">Next</b-button>
                </b-colxx>
            </b-row>
            <h4>Version {{ versi }}</h4>
            <div class="separator mb-5"></div> 
            <b-colxx xxs="12" xl="12">
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
                                {{ dateFormat(new Date(arrVersi.created_at)) }}
                            </p>
                            </b-colxx>
                            <b-colxx xxs="6" xl="6" class="text-left">
                            <p class="text text-medium mt-1" :style="returnColor(new Date(tglUntil),new Date(new Date(arrVersi.created_at).getTime()+(31*24*60*60*1000)))">
                                Berlaku sampai
                            </p>
                            </b-colxx>
                            <b-colxx xxs="6" xl="6" class="text-left">
                            <p class="text text-medium mt-1">
                                {{ dateFormat(new Date(new Date(arrVersi.created_at).getTime()+(31*24*60*60*1000))) }}
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
                            <b-card class="mb-0" title="Data Customer" :style="returnColor(custNama, arrVersi.project.customer.name)">
                                <h6 class="text-muted text-medium mb-1">
                                    {{ arrVersi.project.customer.name }}
                                </h6>
                                <p class="text-muted text-small mb-2">
                                    {{ arrVersi.project.customer.email }}
                                </p>
                                <p class="text-muted text-small mb-2">
                                    {{ arrVersi.project.customer.category.name + " - " + arrVersi.project.customer.priceCategory.name }}
                                </p>
                            </b-card>
                        </b-card>
                    </b-form>
                    </b-colxx>
                    <b-colxx xxs="12" xl="6">
                        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                        <b-card class="mb-4" title="Project">
                            <b-card class="mb-0" title="Data Project">
                                <h6 class="text-muted text-medium mb-1" :style="returnColor(proNama, arrVersi.project.name)">
                                    {{ arrVersi.project.name }}
                                </h6>
                                <p class="text-muted text-small mb-2">
                                    {{ arrVersi.project.category.name }}
                                </p>
                            </b-card>
                        </b-card>
                    </b-form>
                    </b-colxx>
                </b-row>
                <div class="separator mb-2"></div>
                <b-card class="mb-4" v-for="area in arrVersi.areaItems" :key="area.category.id" >
                        <b-row style="margin-bottom: 2vh">
                            <b-colxx xxs="6" xl="6"><h2>{{area.category.name}}</h2></b-colxx>
                        </b-row>
                        <b-row>
                            <b-colxx xxs="12" xl="6">
                                <b-row>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                    <p class="text text-medium mt-1" :style="returnColor(arrKumpulanArea.surface_preparation,area.surface_preparation)">
                                        Section Area :
                                    </p>
                                    </b-colxx>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                        <div v-if="area.surface_preparation != null" >
                                            <div v-for="item in splitSurface(area.surface_preparation)" :key="item">
                                                <h6>
                                                    <b-badge class="mb-0" pill variant="secondary" style="width: 100%;">{{ item }}</b-badge>
                                                </h6>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p class="text-muted text-medium mt-1" style="font-style: italic;">No surface selected</p>
                                        </div>
                                    </b-colxx>
                                </b-row>
                            </b-colxx>
                            <b-colxx xxs="12" xl="6">
                                <b-row>
                                    <b-colxx xxs="6" xl="6" class="text-right">
                                    <p class="text text-medium mt-1" :style="returnColor(arrKumpulanArea.surface_area,area.surface_area)">
                                        Luas Area :
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
                        <b-row>

                        <b-colxx xxs="12" xl="12" class="text-left">
                            <p class="mb-2">
                                HPP/Total
                                <span class="float-right text-muted">  {{area.total_hpp |currency}}/  {{area.total | currency}}</span>
                            </p>
                                <b-progress :value="(area.total_hpp / area.total) * 100"></b-progress>
                        </b-colxx>
                        </b-row>
                        <b-row>
                        <b-colxx xxs="12" xl="12">
                            <p class="text text-medium mt-3" :style="returnColor(arrKumpulanArea.length,area.items.length)">
                                Item
                            </p>
                            <table-item :dataComponent="area.items"></table-item>
                        </b-colxx>
                        </b-row>
                </b-card>
            </b-colxx>
        </div>
        <!-- <glide-component :settings="glideSingleOption">
            <div class="glide__slide" v-for="i in 2" :key="i">
                <h6>
                    <b-badge class="mb-0" pill variant="secondary" style="width: 50%;">{{ arrVersi.created_at  }}</b-badge> 
                </h6>
            </div>
        </glide-component> -->
        
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
        <div class="mb-4" style="position: sticky; top: 20vh">
            <b-card class="mb-4" no-body>
                <b-tabs card no-fade>
                <b-tab title="Action" active title-item-class="w-50 text-center">
                    <div v-if="status != 6">
                        <div v-if="btn1 != '' && btn2 != ''" >
                        <b-row>
                            <b-colxx xxs="6" class="text-center">
                            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip">
                                <b-button type="submit" variant="primary" style="width: 100%">{{ btn1 }}</b-button>
                            </b-form>
                            </b-colxx>
                            <b-colxx xxs="6" class="text-center">
                            <b-button @click="onFormReset" type="submit" variant="danger" style="width: 100%">{{ btn2 }}</b-button>
                            </b-colxx>
                        </b-row>
                        </div>
                        <div v-if="btn3 != ''" >
                            <b-row class="mt-2">
                                <b-colxx xxs="12" class="text-center">
                                <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip">
                                    <b-button type="submit" variant="primary" style="width: 100%">{{ btn3 }}</b-button>
                                </b-form>
                                </b-colxx>
                            </b-row>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-muted text-medium mt-1">No action</p>
                    </div>
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
import TableItem from "./tableItemQuote.vue"
import { mapGetters } from "vuex";
import GlideComponent from '../../../../components/Carousel/GlideComponent'

import {
    validationMixin
} from "vuelidate";
import Pie from '../../../../components/Charts/Pie.vue';
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
        'glide-component': GlideComponent,
        "table-item" : TableItem
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
            arrKumpulanArea : [],
            arrTmp: [],
            arrVersi: "",
            versi: 1,
          //  schItem: "",
            primarySmall: false,
            btn1: "",
            btn2: "",
            btn3: "",

            glideSingleOption: {
                gap: 5,
                perView: 1,
                type: "carousel"
            },
        };
    },
    mixins: [validationMixin],
    validations: {
        proNama:{
            required
        },
    },
    methods: {
        returnColor(a,b){
            if(a != b){
                const style = {
                    color: "yellow",
                }
                return style
            }
        },
        // returnStyle(a,b){
        //     const style = {};
        //     console.log(a)
        //     if(a != b){
        //         style = {
        //             color: "yellow",
        //         }
        //     }
        //     return style;
        // },
        previous(){
            if(this.versi > 1){
                if(this.versi == this.qVer){
                    this.versi = this.versi - 1;
                }
                this.fetchVersion(this.versi);
            }
        },
        next(){
            if(this.versi < this.qVer){
                if(this.versi == this.qVer){
                    this.versi = this.versi + 1;
                }
                this.fetchVersion(this.versi);
            }
        },
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
        splitSurface(arr){
            let adaKoma = false;
            let tmp = [];
            if(arr != null){
            for (let i = 0; i < arr.length; i++) {
                if(arr.charAt(i) == ','){
                    adaKoma = true;
                }
            }
            console.log(adaKoma);
            if(adaKoma){
                let arrTmp = arr.split(',');
                console.log(arrTmp.length);
                for (let i = 0; i < 3; i++) {
                
                    for (let j = 0; j < this.surfaceOptions.length; j++) {
                        if(arrTmp[i] == this.surfaceOptions[j].id){
                            console.log(this.surfaceOptions[j].name);
                            tmp.push(this.surfaceOptions[j].name);
                        }
                    }
                }
                return tmp;
            }else{
                return arr;
            }
            }
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
                'Authorization' :'Bearer '+this.currentUser.jwt
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
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                            surfacePreparations{
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
                // 'Authorization' :'Bearer '+this.currentUser.jwt
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
        fetchVersion(ver){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                        quoteDetail(quote_id:${this.qId} version:${ver}){
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
                                id
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
                                    item_name
                                    price
                                    subtotal
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
                this.arrTmp = resp
                var parsedyourElement = JSON.parse(JSON.stringify(this.arrTmp));
                this.arrVersi = parsedyourElement;
                console.log(this.arrVersi);
            });
        }
    },
    async mounted(){
        console.log(GlideComponent.data);
        this.qId = this.$route.query.id;
        this.qVer = this.$route.query.ver;
        if(this.qId && this.qVer){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
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
                            id
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
                                item_name
                                price
                                subtotal
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
            this.tglQuote = new Date(this.detail.created_at);
            this.tglUntil = new Date(new Date(this.detail.created_at).getTime()+(31*24*60*60*1000));
            this.custNama = this.detail.project.customer.name;
            this.custEmail = this.detail.project.customer.email;
            this.custCate = this.detail.project.customer.category.name + " - "+ this.detail.project.customer.priceCategory.name;
            this.proNama = this.detail.project.name;
            this.proKat = this.detail.project.category.name;
            this.arrKumpulanArea = this.detail.areaItems;
            console.log(this.arrKumpulanArea);
            this.fetchSurface();
            this.user = this.detail.userCreate;
            this.status = this.detail.status.id;
            if(this.status == 1){
                if(this.user.name == this.currentUser.title || this.user.role.name.toLowerCase() == "manager"){
                    this.btn1 = "Submit";
                    this.btn2 = "Close";
                }
            }
            else if(this.status == 2){
                if(this.user.role.name.toLowerCase() == "manager"){
                    this.btn1 = "Approve";
                    this.btn2 = "Reject";
                }
                if(this.user.name == this.currentUser.title){
                    this.btn3 = "Close";
                }
            }else if (this.status == 3){
                if(this.user.name == this.currentUser.title || this.user.role.name.toLowerCase() == "manager"){
                    this.btn1 = "Rejected by Customer";
                    this.btn2 = "Forward";
                }
            }else if (this.status == 4){
                if(this.user.name == this.currentUser.title || this.user.role.name.toLowerCase() == "manager"){
                    this.btn1 = "Close";
                    this.btn2 = "Submit";
                }
            }else if (this.status == 5){
                if(this.user.name == this.currentUser.title || this.user.role.name.toLowerCase() == "manager"){
                    this.btn1 = "Close";
                    this.btn2 = "Revise";
                }
            }
            else if (this.status == 7){
                this.btn1 = "";
                this.btn2 = "";
                this.btn3 = "Cancel";
            }
            if(this.user){
                if(this.user.role.name.toLowerCase() == "manager"){
                    }
            }else{
                
            }
            if(this.qVer > 1){
                this.fetchVersion(this.versi);
            }
            this.isLoad = true;
        })
        }else{
            window.location = window.location.origin +"/error?id=404&name=quote";
        }
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
    } 
};
</script>

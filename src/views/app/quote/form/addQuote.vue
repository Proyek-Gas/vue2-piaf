<template>
<div v-if="isLoad">
<b-row>
    <b-colxx xxs="12">
        <h1>Add Quote</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-row>
            <b-colxx xxs="6" xl="6">
                <h1>Logo dan <br> profil perusahaan</h1>
            </b-colxx>
            <b-colxx xxs="6" xl="6">
                <b-form-group label-cols="5" horizontal label="Quote" >
                    <b-form-input type="text" v-model="quote" disabled/>
                </b-form-group>
                <b-form-group label-cols="5" horizontal label="Tanggal">
                    <datepicker
                        :bootstrap-styling="true"
                        :placeholder="$t('form-components.date')"
                        @cleared="clear"
                        disabled
                        v-model="tglQuote"
                    ></datepicker>
                </b-form-group>
                <b-form-group label-cols="5" horizontal label="Berlaku sampai">
                    <datepicker
                        :bootstrap-styling="true"
                        :placeholder="$t('form-components.date')"
                        @cleared="clear"
                        v-model="tglUntil"
                    ></datepicker>
                </b-form-group>
            </b-colxx>
        </b-row>
        <div class="separator mb-5"></div>
        <b-row>
            <b-colxx xxs="12" xl="6">
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-card class="mb-4" title="Customer">
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
                        <template slot="before-section-default">
                            <div class="p-1">
                                <b-button
                                    class="glyph-icon simple-icon-plus"
                                    variant="success"
                                    v-b-modal.modalright
                                    size="sm"
                                    style="width: 100%;"
                                    @click="showModal('modalright')">
                                </b-button>
                                <b-modal id="modalright" ref="modalright" title="Add Customer" modal-class="modal-right">
                                    <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                                            <b-card class="mb-4" title="Profil Customer">
                                                <b-form-group label-cols="3" horizontal label="Kode">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Nama">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Kategori">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Kategori Harga">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Limit Piutang" >

                                                </b-form-group>
                                            </b-card>
                                    </b-form>
                                </b-modal>
                            </div>
                        </template>
                        </vue-autosuggest>
                    </b-form-group>
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
                    <b-form-group label-cols="3" horizontal label="Project">
                        <vue-autosuggest
                            class="autosuggest"
                            :input-props="{id:'autosuggest__input2', class:'form-control', placeholder:'Ketik nama project'}"
                            :suggestions="filteredOptions2"
                            :render-suggestion="renderSuggestion2"
                            :get-suggestion-value="getSuggestionValue2"
                            :limit="6"
                            v-model="proNama"
                            @selected="onAutosuggestSelected2"
                            @input="onAutoSuggestInputChange2"
                        >
                        <template slot="before-section-default">
                            <div class="p-1">
                                <b-button
                                    class="glyph-icon simple-icon-plus"
                                    variant="success"
                                    v-b-modal.modalright
                                    size="sm"
                                    style="width: 100%;"
                                    @click="showModal('modalright')">
                                </b-button>
                                <b-modal id="modalright" ref="modalright" title="Add Customer" modal-class="modal-right">
                                    <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                                            <b-card class="mb-4" title="Profil Customer">
                                                <b-form-group label-cols="3" horizontal label="Kode">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Nama">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Kategori">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Kategori Harga">

                                                </b-form-group>

                                                <b-form-group label-cols="3" horizontal label="Limit Piutang" >

                                                </b-form-group>
                                            </b-card>
                                    </b-form>
                                </b-modal>
                            </div>
                        </template>
                        </vue-autosuggest>
                        <b-form-input type="text" v-model="$v.proNama.$model" :state="!$v.proNama.$error" style="display:none;" placeholder="Masukkan judul proyek"/>
                        <b-form-invalid-feedback v-if="!$v.proNama.required">Harap pilih project</b-form-invalid-feedback>
                    </b-form-group>
                    <b-card class="mb-0" title="Data Project">
                        <h6 class="text-muted text-medium mb-1">
                            {{ proNama }}
                        </h6>
                        <p class="text-muted text-small mb-2">
                            {{ proKat.name }}
                        </p>
                    </b-card>
                </b-card>
            </b-form>
            </b-colxx>
        </b-row>
        {{area}}
        {{custId}}
        <b-form-group label-cols="3" horizontal label="Pilih Area">
          <v-select
          v-model="area"
          :options="areaOptions"
          label="name"
          @input="newArea"
          :disabled="proKat === ''"
          placeholder="Harap pilih project"/>
      </b-form-group>
        <div class="separator mb-2"></div>
        <!-- {{arrKumpulanArea}} -->
         <b-card class="mb-4" v-for="(areas,index) in arrKumpulanArea" v-bind:key="areas.id" >
                  <b-row style="margin-bottom: 2vh">
                    <b-colxx xxs="6" xl="6"><h2>{{areas.name}}</h2></b-colxx>
                    <b-colxx xxs="6" xl="6"  style="text-align:right">
                      <b-button variant="danger" @click="deleteProject(index)">Delete</b-button>
                    </b-colxx>
                  </b-row>
                 <b-row>
                    <b-colxx xxs="12" xl="6">
                        <b-form-group label-cols="3" horizontal label="Section Area">
                        <v-select
                            label="name"
                            v-model="areas.surface"
                            multiple
                            :options="surfaceOptions"
                            :disabled="proKat === ''"
                            placeholder="Harap pilih project"
                        />
                        </b-form-group>
                    </b-colxx>
                    <b-colxx xxs="12" xl="6">
                        <b-form-group label-cols="3" horizontal label="Luas Area">
                            <b-form-input type="number" step="0.01" v-model="areas.luas" />
                        </b-form-group>
                    </b-colxx>
                </b-row>
                <b-form-group label-cols="3" horizontal label="Pilih Item" :disabled="proKat === ''">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input3', class:'form-control', placeholder:'Ketik nama item'}"
                        :suggestions="filteredOptions3"
                        :render-suggestion="renderSuggestion3"
                        :get-suggestion-value="getSuggestionValue3"
                        :limit="6"


                        @selected="onAutosuggestSelected3($event,index)"
                        @input="onAutoSuggestInputChange3"
                    >
                    <template slot="before-section-default">
                        <div class="p-1">
                            <b-button
                                class="glyph-icon simple-icon-plus"
                                variant="success"
                                v-b-modal.modalright
                                size="sm"
                                style="width: 100%;"
                                @click="showModal('modalright')">
                            </b-button>
                          <!-- disini tempatnya modal tadi ya shan -->
                        </div>
                    </template>
                    </vue-autosuggest>
                </b-form-group>
                <b-form-group label-cols="3" horizontal>
                </b-form-group>
                <table-item :dataComponent="areas.selectedItem"></table-item>
         </b-card>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
        <b-card class="mb-4" style="position: sticky; top: 20vh">
            <b-card-title>Quote Summary</b-card-title>
            <b-row class="mb-2">
                <b-colxx xxs="3">
                <p class="text text-small mb-2">
                    {{ dateFormat(tglQuote) }}
                </p>
                </b-colxx>
                <b-colxx xxs="3">
                    <b-badge pill variant="warning">Rejected(M)</b-badge>
                </b-colxx>
                <b-colxx xxs="3">
                    <b-badge pill variant="primary">0</b-badge>
                </b-colxx>
                <b-colxx xxs="3">
                <p class="text text-small mb-2">
                    {{ dateFormat(tglUntil) }}
                </p>
                </b-colxx>
                </b-row>
            <b-card v-if="custNama != ''" class="mb-3 d-flex flex-row" no-body>
                <img src="/assets/img/profiles/l-1.jpg" alt="Card image cap" class="img-thumbnail list-thumbnail rounded-circle align-self-center m-2 small"/>
                <div class="d-flex flex-grow-1 min-width-zero">
                    <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                        <div class="min-width-zero">
                            <h6 class="text-muted text-medium mb-1">
                                {{ custNama }}
                            </h6>
                            <p class="text-muted text-small mb-2">
                                {{ custEmail }}
                            </p>
                            <p class="text-muted text-small mb-2">
                                {{ custCate }}
                            </p>
                            <p class="text-muted text-small mb-2">
                                {{ proNama }}
                            </p>
                        </div>
                    </div>
                </div>
            </b-card>
            <b-card v-else class="mb-3 d-flex flex-row" no-body>
                <p class="text-muted m-3" style="font-style: italic;">No customer selected</p>
            </b-card>
            <p class="text text-medium mb-2">Area</p>
            <p class="text-muted m-3" style="font-style: italic;">No area selected</p>
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
import Switches from "vue-switches";
import TableItem from "./tableAddItemQuote.vue"

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
        "table-item" : TableItem,
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

            arrDetailProject : [],

/////
            arrKumpulanArea : [],
            area: "",
            kustId  : "",
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
            dataSchItem: [],


            ctrFetch : 0
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

      async  onAutosuggestSelected3($event,a) {
          console.log(a)
          console.log($event.item)
          let cek = true
          let cekItem = $event.item.isItem
          for(let i=0; i<this.arrKumpulanArea[a].selectedItem.length; i++){
              if(this.arrKumpulanArea[a].selectedItem[i].id == $event.item.id){
                cek = false
              }
          }
          if(cek){
             //this.arrKumpulanArea[a].selectedItem.push($event.item)

             //cek untuk apakah ini item atau scheme
            if(cekItem){
                this.fetchItemDetail($event.item,a,false,-1)
            }else{
               this.fetchSchemeDetail($event.item,a)
            }

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
      fetchSchemeDetail(item,index){
        //  this.ctrFetch = 0;
            let querystring = `query{
                schemeDetail(scheme_id:${item.id}){
                  id
                  name
                  notes
                  status
                  color{
                    id_ral
                    eng_name
                    hex_code
                    ind_name
                  }
                  items{
                    item_id
                    color{
                      id_ral
                      hex_code
                      ind_name
                      eng_name
                    }
                    coat
                    dry_film_thickness
                    loss
                    vs_volume_solid
                  }
                }
              }
              `
              let newArrItem = []

              console.log(querystring)
             fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: querystring,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                console.log(text);
                return text.data.schemeDetail;
            })
            .then(resp => {
              for(let i=0; i< resp.items.length; i++){
                    console.log(resp.items.length)
                    item.loss = resp.items[i].loss;
                    item.coat = resp.items[i].coat;
                    item.dft = resp.items[i].dry_film_thickness;
                    item.vol = resp.items[i].vs_volume_solid;
                    item.item_id = resp.items[i].item_id
                    newArrItem.push(item)
                    //this.fetchItemDetail(item,index,true)
              }
              this.fetchItemDetail(newArrItem,index,true,0)
              // do{
              //   let i = this.ctrFetch
              //   item.loss = resp.items[i].loss;
              //   item.coat = resp.items[i].coat;
              //   item.dft = resp.items[i].dry_film_thickness;
              //   item.vol = resp.items[i].vs_volume_solid;
              //   item.item_id = resp.items[i].item_id
              //   this.fetchItemDetail(item,index,true)
              // }while(this.ctrFetch<resp.items.length)

            })
        },
       fetchItemDetail(item, index,ck,ctrItem){
             let id = null
             if(ck){
               id = item[ctrItem].item_id
             }else{
               id = item.id
             }
             console.log(id)
              let querystring = `query{
                itemDetail(item_id:${id} customer_id : "${this.custId}" ){
                  no
                  name
                  id
                    type{
                      name
                      id
                    }
                    name
    								vs_volume_solid
                    itemCategory{
                      name
                      id
                    }
                  detailSellingPrice{
                    priceCategory{
                      id
                      name
                    }
                    price
                  }
                }
              }
              `

            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: querystring,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                console.log(text);
                return text.data.itemDetail;
            })
            .then(resp => {
              // item.no = resp.no;
              // item.name_s = resp.name
              //   item.price = resp.detailSellingPrice;
              //   this.ctrFetch = this.ctrFetch+1;
              //   this.arrKumpulanArea[index].selectedItem.push(item)
              if(ck){
                 item[ctrItem].no = resp.no;
                item[ctrItem].name_s = resp.name
                item[ctrItem].price = resp.detailSellingPrice;
                this.arrKumpulanArea[index].selectedItem.push(item[ctrItem])
                if(ctrItem < item.length){
                  this.fetchItemDetail(item,index,true,ctrItem+1)
                }
              }else{
                 item.no = resp.no;
                item.name_s = resp.name
                item.price = resp.detailSellingPrice;
                this.arrKumpulanArea[index].selectedItem.push(item)
              }
            })
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
        this.status = this.$route.query.status;
        if(this.status){
            if(this.status == 1){
                this.btn1 = "Submit";
                this.btn2 = "Close";
            }
        }else{
            this.btn1 = "Submit";
            this.btn2 = "Draft";
        }
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
            this.dataCust = resp;
            this.isLoad = true;
            this.tglQuote = new Date(Date.now());
            this.tglUntil = new Date(new Date().getTime()+(30*24*60*60*1000));
		})
    }
};
</script>

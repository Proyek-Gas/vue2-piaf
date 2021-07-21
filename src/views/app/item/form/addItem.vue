<template>
<b-row>
    <b-colxx xxs="12">
        <h1>Add Item</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Profil Customer">
                <b-form-group label-cols="3" horizontal label="VS">
                    <b-form-input type="number" step="0.1" v-model="$v.vs.$model" :state="!$v.vs.$error" placeholder="Masukkan volume solid" />
                    <b-form-invalid-feedback v-if="!$v.vs.minValue">Minimum 1</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.vs.maxValue">Maksimal 100</b-form-invalid-feedback>
                </b-form-group>  
                <b-form-group label-cols="3" horizontal label="Warna">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:'Ketik'}"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        clearable
                        v-model="warna" 
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    >>
                    </vue-autosuggest>
                </b-form-group>
            </b-card>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4" style="position: sticky; top: 20vh">
                <b-card-title>Summary</b-card-title>

                <b-row>
                    <b-colxx xxs="6" class="text-center">
                    <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip">
                        <b-button type="submit" variant="primary" style="width: 100%">Add</b-button>
                    </b-form>
                    </b-colxx>
                    <b-colxx xxs="6" class="text-center">
                    <b-button @click="onFormReset" type="submit" variant="danger" style="width: 100%">Reset</b-button>
                    </b-colxx>
                </b-row>
            </b-card>
        </b-colxx>
</b-row>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";

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
        "selectCategory": selectCategory
    },
    data() {
        return {
            vs: 0,
            warna:"",

            filteredOptions: [],
            selected: {},
            dataWarna: []
        };
    },
    mixins: [validationMixin],
    validations: {
        vs: {
            minValue: minValue(1),
            maxValue: maxValue(100),
        },
    },
    methods: {
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                console.log("valid");
                let floatLimit = 0;
                if(this.limit != ''){
                    floatLimit = parseFloat(this.limit);
                }else{
                    floatLimit = 0;
                }
            }else{
                console.log("error");
            }
        },
        onFormReset(){
            this.kode="";this.name="";this.kategori="";this.katHarga="";this.limit="";
            this.email="";this.hp="";this.tlp="";this.npwp="";this.alamat="";
            this.kota="";this.provinsi="";this.negara="";
            this.$v.$reset();
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === null) {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            return;
        }

        const filteredData = this.dataWarna.filter(option => {
            return option.ind_name.toLowerCase().indexOf(text.toLowerCase()) > -1 || option.eng_name.toLowerCase().indexOf(text.toLowerCase()) > -1 || option.id_ral.toLowerCase().indexOf(text.toLowerCase()) > -1;
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
            return <b-card class="mb-0 p-1 d-flex flex-row" no-body>
                        <div src="/assets/img/profiles/l-1.jpg" 
                            alt="Card image cap" 
                            class="align-self-center list-thumbnail-letters rounded-circle small mr-2" 
                            style={{ background: `#${character.hex_code}` }}>
                        </div>
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="pl-0 align-self-right d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div class="min-width-zero">
                                        <h6 class="text-muted text-medium mt-2">
                                            {character.ind_name}
                                        </h6>
                                    <p class="text-muted text-small mb-2">
                                        {character.eng_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <h6 class="ml-1 text-muted text-medium mt-3">
                            {character.id_ral}
                        </h6>
                    </b-card>;
        },
        getSuggestionValue(suggestion) {
            this.warna = suggestion.item.ind_name;
            return suggestion.item.ind_name;
        },
        returnColor(a){
            const style = {
                background: "#"+a,
            }
            return style
        },
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
                        ralColors{
                            id_ral
                            hex_code
                            ind_name
                            eng_name
                        }
                    }
                `,
            }),
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(text) {
            return text.data.ralColors;
        })
        .then(resp => {
            this.dataWarna = resp;
        })
    }
};
</script>

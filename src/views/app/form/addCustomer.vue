<template>
<b-row>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Profil Customer">
                <b-form-group label-cols="3" horizontal label="Kode">
                    <b-form-input type="text" v-model="$v.kode.$model" :state="!$v.kode.$error" />
                    <b-form-invalid-feedback v-if="!$v.kode.required">Harap isi kode</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.kode.maxLength">Panjang maksimal 10 karakter</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Nama">
                    <b-form-input type="text" v-model="$v.name.$model" :state="!$v.name.$error" />
                    <b-form-invalid-feedback v-if="!$v.name.required">Harap isi nama</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.name.minLength || !$v.name.maxLength">Panjang nama 3-50 karakter</b-form-invalid-feedback>
                </b-form-group>

                <selectCategory v-on:answers="onUpdateAnswer"></selectCategory>

                <b-form-group label-cols="3" horizontal label="Kategori Harga">
                    <v-select v-model="kategori" :options="kategoriOption" :dir="direction" :getOptionLabel="kategoriOption => kategoriOption.name"/>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Limit Piutang">
                    <b-form-input type="text" v-model="$v.limit.$model" :state="!$v.limit.$error" />
                    <b-form-invalid-feedback v-if="!$v.limit.numeric">Limit berupa angka</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.limit.minLength || !$v.limit.maxLength">Panjang nama 6-12 karakter</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Max">
                    <b-form-input type="text" v-model="$v.max.$model" :state="!$v.max.$error" />
                    <b-form-invalid-feedback v-if="!$v.max.required">Please enter a number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.max.numeric">Value must be a number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.max.maxValue">Maximum 5</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Min">
                    <b-form-input type="text" v-model="$v.min.$model" :state="!$v.min.$error" />
                    <b-form-invalid-feedback v-if="!$v.min.required">Please enter a number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.min.numeric">Value must be a number</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.min.minValue">Minimum 5</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Regex (^[A-Z]*$)" class="error-l-125">
                    <b-form-input type="text" v-model="$v.withRegex.$model" :state="!$v.withRegex.$error" />
                    <b-form-invalid-feedback v-if="!$v.withRegex.required">Please enter uppercase characters</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.withRegex.upperCase">Only uppercase characters</b-form-invalid-feedback>
                </b-form-group>
            </b-card>
            <b-card class="mb-4" title="Informasi Tambahan">
                <b-form-group label-cols="3" horizontal label="Email">
                    <b-form-input type="text" v-model="$v.email.$model" :state="!$v.email.$error" />
                    <b-form-invalid-feedback v-if="!$v.email.required">Please enter your email address</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.email.email">Please enter a valid email address</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Workphone">
                    <b-form-input type="text" v-model="$v.tlp.$model" :state="!$v.tlp.$error" />
                    <b-form-invalid-feedback v-if="!$v.tlp.numeric">Only number</b-form-invalid-feedback>
                     <b-form-invalid-feedback v-else-if="!$v.tlp.minLength || !$v.hp.maxLength">Your name must be between 10 and 13 characters</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Handphone">
                    <b-form-input type="text" v-model="$v.hp.$model" :state="!$v.hp.$error" />
                    <b-form-invalid-feedback v-if="!$v.hp.numeric">Only number</b-form-invalid-feedback>
                     <b-form-invalid-feedback v-else-if="!$v.hp.minLength || !$v.hp.maxLength">Your name must be between 10 and 13 characters</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="NPWP">
                    <b-form-input type="text" v-model="$v.npwp.$model" :state="!$v.npwp.$error" v-mask="'##.###.###.#-###.###'"/>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Alamat">
                    <b-textarea v-model.trim="$v.alamat.$model" :state="!$v.alamat.$error"></b-textarea>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Kota">
                    <vue-autosuggest
                        class="autosuggest"
                        :input-props="{id:'autosuggest__input', class:'form-control', placeholder:$t('form-components.type-a-cake')}"
                        :suggestions="filteredOptions"
                        :render-suggestion="renderSuggestion"
                        :get-suggestion-value="getSuggestionValue"
                        :limit="6"
                        @selected="onAutosuggestSelected"
                        @input="onAutoSuggestInputChange"
                    ></vue-autosuggest>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Provinsi">
                    <label class="text text-medium mt-1" for="">asasa</label>
                </b-form-group>
                <b-form-group label-cols="3" horizontal label="Negara">
                    <label class="text text-medium mt-1" for="">asasa</label>
                </b-form-group>
            </b-card>
        <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.submit') }}</b-button>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4">
                <b-card-title>Summary</b-card-title>
                <p v-if="name != ''" class="mb-3">{{ name }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Your name</p>
                
                <p v-if="email != ''" class="mb-3">{{ email }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Your email</p>

                <p v-if="name != ''" class="mb-3">{{ name }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Your name</p>
            </b-card>
        </b-colxx>
</b-row>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../../../utils";
import selectCategory from "../../../components/selectCategory.vue";

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
            name: "",
            kode: "",
            kategori: "",
            katHarga: "",
            limit: "",
            email: "",
            hp: "",
            tlp: "",
            npwp: "",
            alamat: "",
            kota: "",
            provinsi: "",
            negara: "",
            max: "",
            min: "",
            withRegex: "",
            direction: getDirection().direction,
            kategoriOption: [],
            katHargaOption: [],

            filteredOptions: [],
            selected: {},
            suggestions: []
        };
    },
    mixins: [validationMixin],
    validations: {
        kode: {
            required,
            maxLength: maxLength(10),
        },
        name: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50),
            alpha
        },
        kategori:{
            required
        },
        limit: {
            numeric,
            minLength: minLength(6),
            maxLength: maxLength(12),
        },
        email: {
            required,
            email
        },
        hp:{
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(13),
        },
        tlp:{
            numeric,
            minLength: minLength(7),
            maxLength: maxLength(13),
        },
        npwp:{
            numeric
        },
        alamat:{
            numeric,
            minLength: minLength(7),
            maxLength: maxLength(13),
        },
        max: {
            required,
            numeric,
            maxValue: maxValue(5)
        },
        min: {
            required,
            numeric,
            minValue: minValue(5)
        },
        withRegex: {
            required,
            upperCase
        }

    },
    methods: {
        onUpdateAnswer: function (a) {
            console.log(a)
        },
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                console.log(
                    JSON.stringify({
                        name: this.name,
                        email: this.email,
                        emailAgain: this.emailAgain,
                        kategori: "",
                        hp: this.hp,
                        max: this.max,
                        min: this.min,
                        withRegex: this.withRegex,

                    })
                );
            }else{
                console.log("error");
            }
        },
        onAutoSuggestInputChange(text, oldText) {
        if (text === null) {
            /* Maybe the text is null but you wanna do
            *  something else, but don't filter by null.
            */
            return;
        }

        const filteredData = this.suggestions.filter(option => {
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
            return character.name; /* renderSuggestion will override the default suggestion template slot. */
        },
        getSuggestionValue(suggestion) {
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
			this.suggestions = resp
            this.kategoriOption = resp;
            console.log(this.suggestions);
		})
    }
};
</script>

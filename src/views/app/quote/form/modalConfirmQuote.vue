<template>
    <b-modal id="modalConfirm" ref="modalConfirm" title="Confirmation" modal-class="modal-right">
        <b-row v-if="arrKumpulanArea.length >0" class="text-left">
            <b-colxx xxs="12">
                <b-row v-for="(areas) in arrKumpulanArea" v-bind:key="areas.id">
                <b-colxx  xxs="6"><p style="width:100%">{{areas.name}}</p></b-colxx>
                <b-colxx  xxs="6"><p style="width:100%">{{areas.total_harga | currency}}</p></b-colxx>
                </b-row>
                <b-row>
                <b-colxx xxs="6"><strong>Total:</strong></b-colxx>
                    <b-colxx xxs="6"><strong>{{countTotalHarga()|currency}}</strong></b-colxx>
                </b-row>
            </b-colxx>
        </b-row>
        <b-row v-else> <p class="text-muted m-3" style="font-style: italic;">No area selected</p></b-row>
        <template slot="modal-footer">
        <b-row>
            <b-colxx xxs="6" class="text-center">
                <b-form @submit.prevent="onValitadeFormSubmit2('modalright');" class="av-tooltip">
                    <b-button @click="passingData();$emit('answerss', dataReturn);" type="submit" variant="primary" style="width: 100%">Submit</b-button>
                </b-form>
            </b-colxx>
            <b-colxx xxs="6" class="text-center">
                <b-button @click="hideModal()" type="submit" variant="danger" style="width: 100%">Cancel</b-button>
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
        datepicker: Datepicker,
    },
    props:['dataPassing', 'countTotalHarga'],
    data() {
        return {
            arrKumpulanArea: []
        };
    },
    mixins: [validationMixin],
    validations: {
        
    },
    methods: {
        loadField(params){
            this.arrKumpulanArea = params;
        },
        hideModal(){
            this.$refs["modalConfirm"].hide()
        },
    },
    async mounted(){
        
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
    } 

};
</script>
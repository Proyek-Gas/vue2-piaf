<template>
<b-row>
    <b-colxx xxs="12">
        <h1>My Profile</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
        <b-colxx xxs="12" class="mt-5">
            <b-row>
                <b-colxx md="6" sm="6" lg="4" xxs="12">
                <single-lightbox
                thumb="/assets/img/profiles/1.jpg"
                large="/assets/img/profiles/1.jpg"
                class-name="img-thumbnail card-img social-profile-img"
                />
                <b-card class="mb-4">
                    <b-card-body>
                        <div class="text-center">
                        <p class="list-item-heading pt-2">{{ this.currentUser.title }}</p>
                        </div>
                        <p class="text-muted text-medium mb-2">Email</p>
                        <p v-if="this.currentUser.email" class="mb-3">{{ this.currentUser.email }}</p>
                        <p v-else class="text-muted text-medium mb-2">No email</p>
                        <p class="text-muted text-medium mb-2">Handphone</p>
                        <p class="mb-3">{{ this.currentUser.phone }}</p>
                        <p class="text-muted text-medium mb-2">Role</p>
                        <div class="mb-2">
                            <b-badge v-if="this.currentUser.role == 1" variant="outline-secondary" class="mb-1 mr-1" pill>SALES</b-badge>
                            <b-badge v-else-if="this.currentUser.role == 2" variant="outline-secondary" class="mb-1 mr-1" pill>MANAGER</b-badge>
                            <b-badge v-else variant="outline-secondary" class="mb-1 mr-1" pill>SALES-ADMIN</b-badge>
                        </div>
                        <p class="text-muted text-medium mb-2">Omzet rupiah</p>
                        <p v-if="this.currentUser.oRp" class="mb-3">{{ this.currentUser.oRp }}</p>
                        <p v-else class="mb-3" style="font-style: italic;">No omzet</p>
                        <p class="text-muted text-medium mb-2">Omzet Liter</p>
                        <p v-if="this.currentUser.oLtr" class="mb-3">{{ this.currentUser.oLtr }}</p>
                        <p v-else class="mb-3" style="font-style: italic;">No omzet</p>
                    </b-card-body>
                </b-card>
                </b-colxx>
                <b-colxx md="6" sm="6" lg="8" xxs="12">
                    <website-visit-chart-card></website-visit-chart-card>
                </b-colxx>
            </b-row>
        </b-colxx>    
</b-row>
</template>

<script>
import Password from 'vue-password-strength-meter'
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";
import { mapGetters } from "vuex";
import SingleLightbox from "../../../../containers/page/SingleLightbox";
import WebsiteVisitsChartCard from "../../../../containers/page/WebsiteVisitsChartCard";


import {
    validationMixin
} from "vuelidate";

const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

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
        "single-lightbox": SingleLightbox,
        "website-visit-chart-card": WebsiteVisitsChartCard,
        Password
    },
    data() {
        return {
            submit: false,
            nama: "",
            email: "",
            password: "",
            role: "",
            roleOption: [],
            hp: "",
            oRp: "",
            oLtr: "",
            acc1: "",
            acc2: "",
            accDb1Option: [],
            accDb2Option: [],
            image: null,
            select1: 0,
            imageSrc: "/assets/img/profiles/1.jpg",
            image2: null,
            select2: 0,
            imageSrc2: "/assets/img/profiles/1.jpg",
        };
    },
    mixins: [validationMixin],
    validations: {
        nama: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50),
        },
        email: {
            email
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20),
        },
        hp:{
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(13),
        },
        oRp:{
            numeric,
            minLength: minLength(6),
            maxLength: maxLength(12),
        },
        oLtr:{
            numeric,
            minLength: minLength(3),
            maxLength: maxLength(8),
        },
        acc1: {
            required,
        },
        acc2: {
            required,
        },
    },
    watch:{
        image(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (newValue) {
                base64Encode(newValue)
                    .then(value => {
                    this.imageSrc = value;
                    this.select1 = 1;
                    })
                    .catch(() => {
                    this.imageSrc = null;
                    });
                } else {
                this.imageSrc = null;
                }
            }
        },
        image2(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (newValue) {
                base64Encode(newValue)
                    .then(value => {
                    this.imageSrc2 = value;
                    this.select2 = 1;
                    })
                    .catch(() => {
                    this.imageSrc2 = null;
                    });
                } else {
                this.imageSrc2 = null;
                }
            }
        },
    },
    methods: {
    },
    async mounted(){
        console.log(this.currentUser);
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",

        }),
        hasImage() {
            return !!this.image;
        }
        
    }
};
</script>

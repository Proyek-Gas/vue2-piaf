<template>
<b-row>
    <b-colxx xxs="12">
        <h1>Add User</h1>
        <div class="separator mb-5"></div>
    </b-colxx>
    <b-colxx xxs="12" xl="8">
        <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
            <b-card class="mb-4" title="Profil User">
                <b-form-group label-cols="3" horizontal label="Nama">
                    <b-form-input type="text" v-model="$v.nama.$model" :state="!$v.nama.$error" placeholder="Masukkan nama" />
                    <b-form-invalid-feedback v-if="!$v.nama.required">Harap isi nama</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.nama.minLength || !$v.nama.maxLength">Panjang nama 3-50 karakter</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Email">
                    <b-form-input type="text" v-model="$v.email.$model" :state="!$v.email.$error" placeholder="Masukkan email"/>
                    <b-form-invalid-feedback v-if="!$v.email.email">Struktur email tidak valid</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Password">
                    <b-form-input type="password" v-model="$v.password.$model" :state="!$v.password.$error" placeholder="Masukkan password"/>
                    <password v-if="$v.password.$model != ''" v-model="$v.password.$model" :strength-meter-only="true"/>
                    <b-form-invalid-feedback v-if="!$v.password.required">Harap isi password</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.password.minLength || !$v.password.maxLength">Panjang nama 8-20 karakter</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Role">
                    <v-select v-model="role" :options="roleOption" :reduce="roleOption => roleOption.name" label="name" placeholder="Pilih role"/>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Handphone">
                    <b-form-input type="text" v-model="$v.hp.$model" :state="!$v.hp.$error" placeholder="Masukkan nomor handphone aktif"/>
                     <b-form-invalid-feedback v-if="!$v.hp.required">Harap isi nomor handphone</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.hp.numeric">Nomor handphone hanya angka</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.hp.minLength || !$v.hp.maxLength">Panjang nomor handphone antara 10-13 katakter</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Omzet Rupiah">
                    <b-form-input type="text" v-model="$v.oRp.$model" :state="!$v.oRp.$error" placeholder="Masukkan jumlah omzet rupiah"/>
                    <b-form-invalid-feedback v-if="!$v.oRp.numeric">Omzet rupiah hanya angka</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.oRp.minLength || !$v.oRp.maxLength">Panjang nominal antara 6-12 katakter</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Omzet Liter">
                    <b-form-input type="text" v-model="$v.oLtr.$model" :state="!$v.oLtr.$error" placeholder="Masukkan jumlah omzet liter"/>
                    <b-form-invalid-feedback v-if="!$v.oLtr.numeric">Omzet liter hanya angka</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.oLtr.minLength || !$v.oLtr.maxLength">Panjang nilai liter antara 3-8 katakter</b-form-invalid-feedback>
                </b-form-group>

                <!-- <b-form-group label-cols="3" horizontal label="Reference Accurate DB 1">
                    <v-select v-model="acc1" :options="accDb1Option" :reduce="accDb1Option => accDb1Option.name" label="name" placeholder="Pilih role"/>
                    <b-form-input type="text" v-model="$v.acc1.$model" :state="!$v.acc1.$error" style="display: none;"/>
                    <b-form-invalid-feedback v-if="!$v.acc1.required">Harap pilih referensi</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label-cols="3" horizontal label="Reference Accurate DB 2">
                    <v-select v-model="acc2" :options="accDb2Option" :reduce="accDb2Option => accDb2Option.name" label="name" placeholder="Pilih role"/>
                    <b-form-input type="text" v-model="$v.acc2.$model" :state="!$v.acc2.$error" style="display: none;"/>
                    <b-form-invalid-feedback v-if="!$v.acc2.required">Harap pilih referensi</b-form-invalid-feedback>
                </b-form-group> -->
                
                <b-row>
                    <b-colxx xxs="12" xl="6">
                        <b-form-group label="Foto">

                            <router-link v-b-modal.modalbasic to="?" class="d-flex">
                                <img
                                :src="imageSrc"
                                alt="Card image cap"
                                class="img-thumbnail align-self-center m-4"
                                style="width:200px; height:200px"
                                />
                            </router-link>
                            <p class="text-muted" style="font-style: italic;">Allowed JPG, PNG, or GIF. Max size of 800KB</p>
                            <b-modal id="modalbasic" ref="modalbasic" >
                                <img
                                :src="imageSrc"
                                alt="Card image cap"
                                class="img-thumbnail align-self-center m-4"
                                style="width:300px; height:300px"
                                />
                            </b-modal>
                            <div class="d-flex flex-grow-1 min-width-zero">
                                <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                    <div class="min-width-zero">
                                        <b-button @click="$refs.fileInput2.$el.querySelector('input[type=file]').click()">Upload</b-button>
                                        <b-form-file v-model="image" accept=".jpg, .png, .gif" style="display: none;" ref="fileInput2" />
                                        <b-button size="m" variant="outline-primary" @click="clearImage">Reset</b-button>
                                    </div>
                                </div>
                            </div>
                        </b-form-group>
                    </b-colxx>
                    <b-colxx xxs="12" xl="6">
                        <b-form-group label="TTD">
                            <router-link v-b-modal.modalbasic2 to="?" class="d-flex">
                                <img
                                :src="imageSrc2"
                                alt="Card image cap"
                                class="img-thumbnail align-self-center m-4"
                                style="width:200px; height:200px"
                                />
                            </router-link>
                            <p class="text-muted" style="font-style: italic;">Allowed JPG, PNG, or GIF. Max size of 800KB</p>
                            <b-modal id="modalbasic2" ref="modalbasic2" >
                                 <img
                                    :src="imageSrc2"
                                    alt="Card image cap"
                                    class="img-thumbnail align-self-center m-4"
                                    style="width:300px; height:300px"
                                  />
                              </b-modal>
                            <div class="d-flex flex-grow-1 min-width-zero">
                                <div class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                    <div class="min-width-zero">
                                        <b-button @click="$refs.fileInput3.$el.querySelector('input[type=file]').click()">Upload</b-button>
                                        <b-form-file v-model="image2" accept=".jpg, .png, .gif" style="display: none;" ref="fileInput3" />
                                        <b-button size="m" variant="outline-primary" @click="clearImage2">Reset</b-button>
                                    </div>
                                </div>
                            </div>
                        </b-form-group>
                    </b-colxx>
                </b-row>
            </b-card>
        </b-form>
    </b-colxx>
    <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4" style="position: sticky; top: 20vh">
                <b-card-title>Summary</b-card-title>
                <p v-if="nama != ''" class="mb-3">{{ nama }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Nama user</p>
                
                <p v-if="email != ''" class="mb-3">{{ email }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Email user</p>

                <p v-if="role != ''" class="mb-3">{{ role }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Role user</p>

                <p v-if="hp != ''" class="mb-3">{{ hp }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Nomor handphone user</p>

                <p v-if="oRp != ''" class="mb-3">{{ oRp | currency }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Omzet rupiah user</p>

                <p v-if="oLtr != ''" class="mb-3">{{ oLtr }} liter</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">Omzet liter user</p>

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
import Password from 'vue-password-strength-meter'
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";
import { mapGetters } from "vuex";


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
            required,
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
        // acc1: {
        //     required,
        // },
        // acc2: {
        //     required,
        // },
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
        clearImage() {
            this.imageSrc = "/assets/img/profiles/1.jpg";
            this.select1 = 0;
        },
        clearImage2() {
            this.imageSrc2 = "/assets/img/profiles/1.jpg";
            this.select2 = 0;
        },
        cekGambar(gambar, pilih){
            if(gambar){
                if(pilih == 1){
                    let a = gambar.name.split('.');
                    if(gambar.size > 800000){
                        this.$toast("Ukuran gambar maksimal 800KB", {
                            type: "warning",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        return false;
                    }else if(a[1] == 'pdf'){
                        this.$toast("Ektensi gambar tidak valid", {
                            type: "warning",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                        return false;
                    }
                }
            }else{
                return true;
            }
        },
        onValitadeFormSubmit() {
            this.$v.$touch();
            let gam1 = this.cekGambar(this.image, this.select1);
            let gam2 = this.cekGambar(this.image2, this.select2);
            console.log(gam1,gam2);
            if(this.currentUser.role == 2){
                if(!this.$v.$invalid && !this.submit && gam1 && gam2){
                    console.log("valid");
                    this.submit = true;
                    let floatLimit = 0;
                    if(this.limit != ''){
                        floatLimit = parseFloat(this.limit);
                    }else{
                        floatLimit = 0;
                    }
                    fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+this.currentUser.jwt
                        },
                        body: JSON.stringify({
                            query: `
                                mutation{
                                    register(params:{
                                        name:"${this.nama}"
                                        email:"${this.email}"
                                        phone:"${this.hp}"
                                        password:"${this.password}"
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
                        console.log(text.data);
                        //return text.data.register;
                    })
                    .then(resp => {
                        if(resp.status.toLowerCase() == "success"){
                            this.$toast(resp.message, {
                                type: "success",
                                hideProgressBar: true,
                                timeout: 2000
                            });
                            setTimeout(() => {
                                window.location = window.location.origin+"/app/datatable/customerTable";
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
            }else{
                this.$toast("Harap login sebagai manager", {
                    type: "error",
                    hideProgressBar: true,
                    timeout: 2000
                });
            }
        },
        onFormReset(){
            this.nama= "",this.email= "",this.password= "",
            this.role = this.roleOption[1].name;
            this.hp= "",this.oRp= "",this.oLtr= "",
            this.clearImage(); this.clearImage2();
            this.$v.$reset();
        },
        fetchAccurateDb(ref){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                            salesAccurate(ref_db:${ref}){
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
                return text.data.salesAccurate;
            })
            .then(resp => {
                if(ref == 1){
                    this.accDb1Option = resp
                }else{
                    this.accDb2Option = resp
                }
            })
        }
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
					query{
                        roles{
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
			return text.data.roles;
		})
		.then(resp => {
            this.roleOption = resp
            this.role = this.roleOption[1].name;
		})

        this.fetchAccurateDb(0);
        this.fetchAccurateDb(1);
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

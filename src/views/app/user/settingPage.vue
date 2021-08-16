<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{currentUser.title}}</h1>

      <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
        <b-tab title="Umum" @click="handleClick">
          <b-row>
            <b-colxx xs="12" xl="12">
               <b-card class="mb-4" >
                    <b-form
                      @submit.prevent="onValitadeOverLineFormFormSubmit"
                      class="av-tooltip tooltip-label-bottom"
                    >
                      <b-row class="mb-3">
                          <router-link v-b-modal.modalbasic to="?" class="d-flex">
                            <img
                              src="/assets/img/profiles/l-1.jpg"
                              alt="Card image cap"
                              class="img-thumbnail list-thumbnail align-self-center m-4"
                              style="width:120px; height:120px"
                            />
                          </router-link>
                            <b-modal id="modalbasic" ref="modalbasic" >
                                 <img
                                    src="/assets/img/profiles/l-1.jpg"
                                    alt="Card image cap"
                                    class="img-thumbnail list-thumbnail align-self-center m-4"
                                    style="width:100%; height:100%"
                                  />
                              </b-modal>
                          <div class="d-flex flex-grow-1 min-width-zero">
                            <div
                              class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                            >
                              <div class="min-width-zero">
                                <b-button size="m"  variant="primary">Upload</b-button>
                                <b-button size="m" variant="outline-primary">Reset</b-button>
                              </div>
                            </div>
                          </div>
                      </b-row>
                          <div class="separator mb-5"></div>
                        <b-row>
                              <b-colxx xxs = "6" >
                                 <b-form-group :label="$t('forms.phone')" class="has-float-label" style="font-size:12pt">
                                    <b-form-input
                                      type="text"
                                      v-model.trim="$v.overLineForm.phone.$model"
                                      :state="!$v.overLineForm.phone.$error"
                                      disabled
                                    />
                                    <b-form-invalid-feedback v-if="!$v.overLineForm.phone.required">Harap isi nomor telepon</b-form-invalid-feedback>

                                  </b-form-group>
                              </b-colxx>
                               <b-colxx xxs = "6" >
                                 <b-form-group :label="$t('forms.name')" class="has-float-label" style="font-size:12pt">
                                    <b-form-input
                                      @focus="ubah"
                                      type="text"
                                      v-model.trim="$v.overLineForm.name.$model"
                                      :state="!$v.overLineForm.name.$error"
                                    />
                                    <b-form-invalid-feedback v-if="!$v.overLineForm.name.required">Harap isi nama</b-form-invalid-feedback>
                                    <b-form-invalid-feedback v-else-if="!$v.overLineForm.name.minLength || !$v.overLineForm.name.maxLength">Panjang nama antara 3-50 karakter</b-form-invalid-feedback>

                                  </b-form-group>
                              </b-colxx>

                        </b-row>
                        <b-row>
                           <b-colxx xxs = "6" >
                                 <b-form-group :label="$t('forms.email')" class="has-float-label" style="font-size:12pt">
                                    <b-form-input
                                      @focus="ubah"
                                      type="text"
                                      v-model.trim="$v.overLineForm.email.$model"
                                      :state="!$v.overLineForm.email.$error"
                                    />
                                    <b-form-invalid-feedback v-if="!$v.overLineForm.email.required">Harap isi email</b-form-invalid-feedback>
                                    <b-form-invalid-feedback v-else-if="!$v.overLineForm.email.email">Struktur email tidak valid</b-form-invalid-feedback>
                                  </b-form-group>
                              </b-colxx>
                        </b-row>
                        <b-row>
                               <router-link to="?" v-b-modal.modalbasic2 class="d-flex">
                                  <img
                                    src="/assets/img/profiles/tt.png"
                                    alt="Card image cap"
                                     style="width:150px; height:150px"
                                    class="img-thumbnail list-thumbnail align-self-center m-4"
                                  />
                                </router-link>
                                  <b-modal id="modalbasic2" ref="modalbasic2" >
                                     <img
                                        src="/assets/img/profiles/tt.png"
                                        alt="Card image cap"
                                        style="width:100%; height:100%"
                                        class="img-thumbnail list-thumbnail align-self-center m-4"
                                      />
                                  </b-modal>
                                <div class="d-flex flex-grow-1 min-width-zero">
                                  <div
                                    class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero container"
                                  >
                                    <div class="min-width-zero">
                                      <b-button size="m"  variant="primary">Upload</b-button>
                                      <b-button size="m" variant="outline-primary">Reset</b-button>
                                    </div>
                                  </div>
                                </div>
                        </b-row>
                        <b-row class="container">
                          <b-form @submit.prevent="onValitadeOverLineFormFormSubmit" class="av-tooltip">
                              <b-button size="m" type="submit" variant="primary">Save Changes</b-button>
                          </b-form>
                        </b-row>
                    </b-form>
              </b-card>
            </b-colxx>
          </b-row>
        </b-tab>
        <b-tab title="Ganti Password" @click="handleClick">
          <b-row>
            <b-colxx xs="12" xl="12">
               <b-card class="mb-4" >
                  <b-form
                    @submit.prevent="onValitadeOverLineFormFormSubmit"
                    class="av-tooltip tooltip-label-bottom"
                  >
                    <b-row>
                        <b-colxx xxs = "6" >
                            <b-form-group :label="$t('forms.oldPass')" class="has-float-label" style="font-size:12pt">
                              <b-form-input
                                type="password"
                                v-model.trim="$v.overLineForm2.oldpass.$model"
                                :state="!$v.overLineForm2.oldpass.$error"
                                disabled
                              />
                            </b-form-group>
                        </b-colxx>
                    </b-row>
                    <b-row>
                        <b-colxx xxs = "6" >
                            <b-form-group :label="$t('forms.newPass')" class="has-float-label" style="font-size:12pt">
                              <b-form-input
                                type="password"
                                v-model.trim="$v.overLineForm2.newpass.$model"
                                :state="!$v.overLineForm2.newpass.$error"
                              />
                              <password v-if="$v.overLineForm2.newpass.$model != ''" v-model="$v.overLineForm2.newpass.$model" :strength-meter-only="true"/>
                              <b-form-invalid-feedback v-if="!$v.overLineForm2.newpass.required">Harap isi password baru</b-form-invalid-feedback>
                            </b-form-group>
                        </b-colxx>
                        <b-colxx xxs = "6" >
                          <b-form-group :label="$t('forms.rePass')" class="has-float-label" style="font-size:12pt">

                            <b-form-input
                              type="password"
                              v-model.trim="$v.overLineForm2.repass.$model"
                              :state="!$v.overLineForm2.repass.$error"
                            />
                            <b-form-invalid-feedback v-if="!$v.overLineForm2.repass.required">Harap ulangi password baru</b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.overLineForm2.newpass.sameAsPass">Password tidak sama</b-form-invalid-feedback>
                          </b-form-group>
                        </b-colxx>
                    </b-row>
                    <b-row class="container">
                      <b-form @submit.prevent="onValitadeOverLineFormFormSubmit2" class="av-tooltip">
                          <b-button size="m" type="submit" variant="primary">Save Changes</b-button>
                      </b-form>
                    </b-row>
                  </b-form>
              </b-card>
            </b-colxx>
          </b-row>
        </b-tab>

        <b-tab title="Ganti DB Accurate">
            <b-row>
              <b-colxx xs='12' xl='12'>
                  <b-card class="mb-4">
                      <b-row class="mb-2">
                        <b-colxx xs="12" xl="12">
                          <h2>Ganti Database</h2>
                        </b-colxx>
                      </b-row>
                      <b-row class="mb-4">
                          <b-colxx xl="12" xs="12">
                              <v-select
                              v-model="database"
                              :options="databaseOption"
                              placeholder ="Silahkan pilih Database"
                            >

                            </v-select>
                          </b-colxx>
                      </b-row>
                  </b-card>
              </b-colxx>
            </b-row>
        </b-tab>

      </b-tabs>
    </b-colxx>
  </b-row>
</template>

<script>

import Password from 'vue-password-strength-meter'
import { setCurrentUser, getCurrentUser } from '../../../utils'
import { mapGetters } from 'vuex';
import { validationMixin } from "vuelidate";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers
} = require("vuelidate/lib/validators");

export default {
  components: {
       "v-select": vSelect,
       Password
  },
  computed : {
      ...mapGetters({
          currentUser : "currentUser"
      })
  },
  data() {
    return {
      database : "",
      databaseOption : [],
      submit: false,
      overLineForm: {
        email: '',
        phone : '',
        name : '',
        },
      overLineForm2:{
        oldpass: '',
        newpass: '',
        repass: ''
      }
      };
    },
    mixins: [validationMixin],
    validations: {
      overLineForm: {
        email: {
          required,
          email
        },
        phone : {
          required
        },
        name : {
          required,
          minLength: minLength(3),
          maxLength: maxLength(50),
        },
      },
      overLineForm2: {
        oldpass:{
          required
        },
        newpass : {
          required
        },
        repass : {
          required,
          sameAsPass: sameAs('newpass')
        },
      }
    },
  methods: {
      ubah(){
        console.log("y");
        this.submit = false;
      },
      handleClick(){
        this.overLineForm2.newpass = "";
        this.overLineForm2.repass = "";
        this.$v.$reset();
      },
      onValitadeOverLineFormFormSubmit() {
      this.$v.overLineForm.$touch();
      if(!this.$v.overLineForm.$invalid && !this.submit){
        this.submit = true;
        console.log("valid");
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        updateUser(param:{
                            name: "${this.overLineForm.name}"
                            email:"${this.overLineForm.email}"
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
            return text.data.updateUser;

        })
        .then(resp => {
            if(resp.status.toLowerCase() == "success"){
                this.$toast(resp.message, {
                    type: "success",
                    hideProgressBar: true,
                    timeout: 2000
                });
                this.currentUser.title = this.overLineForm.name;
                this.currentUser.email = this.overLineForm.email;
                console.log(this.currentUser);
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
    onValitadeOverLineFormFormSubmit2() {
      this.$v.overLineForm2.$touch();
        if(!this.$v.overLineForm2.$invalid){
          console.log("valid2");
          fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        changePassword(
                        oldPassword: "${this.overLineForm2.oldpass}"
                        newPassword: "${this.overLineForm2.newpass}"
                        ){
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
            return text.data.changePassword;

        })
        .then(resp => {
            if(resp.status.toLowerCase() == "success"){
                this.$toast(resp.message, {
                    type: "success",
                    hideProgressBar: true,
                    timeout: 2000
                });
                this.currentUser.pass = this.overLineForm2.newpass;
                this.overLineForm2.oldpass = this.currentUser.pass;
                this.handleClick();
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
    }
  },
  mounted() {
    this.overLineForm.email = this.currentUser.email;
    this.overLineForm.phone = this.currentUser.phone;
    this.overLineForm.name = this.currentUser.title;
    this.overLineForm2.oldpass = this.currentUser.pass;
    console.log(this.currentUser)
  }
};
</script>

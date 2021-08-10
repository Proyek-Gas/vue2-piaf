<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{currentUser.title}}</h1>

      <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
        <b-tab title="Umum">
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
                                 <b-form-group :label="$t('forms.phone')" class="has-float-label" style="font-size:15pt">
                                    <b-form-input
                                      type="text"
                                      v-model.trim="$v.overLineForm.phone.$model"
                                      :state="!$v.overLineForm.phone.$error"
                                      disabled
                                    />
                                    <b-form-invalid-feedback v-if="!$v.overLineForm.phone.required">Phone is required!</b-form-invalid-feedback>

                                  </b-form-group>
                              </b-colxx>
                               <b-colxx xxs = "6" >
                                 <b-form-group :label="$t('forms.name')" class="has-float-label" style="font-size:15pt">
                                    <b-form-input
                                      type="text"
                                      v-model.trim="$v.overLineForm.name.$model"
                                      :state="!$v.overLineForm.name.$error"
                                    />
                                    <b-form-invalid-feedback v-if="!$v.overLineForm.name.required">Name is required!</b-form-invalid-feedback>

                                  </b-form-group>
                              </b-colxx>

                        </b-row>
                        <b-row>
                           <b-colxx xxs = "6" >
                                 <b-form-group :label="$t('forms.email')" class="has-float-label" style="font-size:15pt">
                                    <b-form-input
                                      type="text"
                                      v-model.trim="$v.overLineForm.email.$model"
                                      :state="!$v.overLineForm.email.$error"
                                    />
                                    <b-form-invalid-feedback v-if="!$v.overLineForm.email.required">Email is required!</b-form-invalid-feedback>
                                    <b-form-invalid-feedback v-else-if="!$v.overLineForm.email.email">Invalid email address</b-form-invalid-feedback>
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
                            <b-button size="m" variant="primary">Save Changes</b-button>
                        </b-row>
                    </b-form>
              </b-card>
            </b-colxx>
          </b-row>
        </b-tab>

        <b-tab title="Ganti Password">

        </b-tab>

        <b-tab title="Ganti DB Accurate">

        </b-tab>


      </b-tabs>
    </b-colxx>
  </b-row>
</template>

<script>

import { validationMixin } from "vuelidate";
const {
  required,
  email,
  minLength,
  maxLength,
  helpers
} = require("vuelidate/lib/validators");


import { mapGetters } from 'vuex';
export default {
  components: {

  },
  computed : {
      ...mapGetters({
          currentUser : "currentUser"
      })
  },
  data() {
    return {
    overLineForm: {
      email: '',
      phone : '',
      name : ''
      },
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
          required
        }
      }
    },
  methods: {
      onValitadeOverLineFormFormSubmit() {
      this.$v.overLineForm.$touch();
      console.log("overLineForm is invalid :", this.$v.overLineForm.$invalid);
    },
    onValitadeLabelInInputFormFormSubmit() {
      this.$v.labelsInInput.$touch();
      console.log("labelsInInput is invalid :", this.$v.labelsInInput.$invalid);
    }


  },
  mounted() {
    this.overLineForm.email = this.currentUser.email;
    this.overLineForm.phone = this.currentUser.phone;
    this.overLineForm.name = this.currentUser.title;
    console.log(this.currentUser.email)
  }
};
</script>

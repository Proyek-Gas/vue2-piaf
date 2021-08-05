<template>
  <b-modal id="modalright" ref="modalright" title="Filter Customer" modal-class="modal-right">
     <b-row>
        <b-colxx xxs="12" >
             <b-form-group label="Option">
              <v-select v-model="vueSelected" :options="selectData" :reduce="selectData => selectData.value" label="label" placeholder="Silahkan Pilih Filter"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <b-row>
        <b-colxx xxs="12">
            <b-form-group label="Nama" v-if="vueSelected == '1'">
                <b-form-input v-model="dataReturn.name"  placeholder="Masukkan Nama"/>
            </b-form-group>
            <b-form-group label="Warna" v-if="vueSelected == '2'">
                <v-select
                  v-model="dataReturn.warna"
                  :options="ListWarna"
                  label="ind_name"
                  item-text="eng_name"
                  placeholder ="Silahkan pilih warna"
                >
                  <template v-slot:option="option" style="width:auto">
                     <div
                        class="btn"
                        style="width:100%; text-align :center"
                        v-bind:style="returnColor(option.hex_code)"
                      >{{ option.eng_name }} <br>{{option.ind_name}}</div>
                  </template>
                </v-select>
            </b-form-group>
             <b-form-radio-group stacked label="Status" v-model="dataReturn.status" v-if="vueSelected == '3'">
                <b-form-radio value="1">Active</b-form-radio>
                <b-form-radio value="0">Non Active</b-form-radio>
                 <b-form-radio value="-1">All</b-form-radio>
            </b-form-radio-group>
        </b-colxx>
     </b-row>
     <template slot="modal-footer">
         <b-button variant="danger" @click="$emit('answers',null);hideModal('modalright');reset()">Reset</b-button>
         <b-button variant="primary" @click="$emit('answers', dataReturn);hideModal('modalright')" class="mr-1">Apply</b-button>
      </template>
   </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";

export default {
  components: {
    "v-select": vSelect,
     datepicker: Datepicker,
  },
  data() {
    return {
     vueSelected : "",
      selectData: [
        {
          value : "1",
          label : "Name"
        },
        {
          value : "2",
          label : "Warna"
        },
        {
          value : "3",
          label : "Status"
        },
      ],
      ListWarna : [],
      dataReturn : {
         name:'',
         status :"-1",
         warna : ""
      }
    };
  },
  methods: {
    hideModal (refname) {
      this.$refs[refname].hide()
      console.log('hide modal:: ' + refname)

      if (refname === 'modalnestedinline') {
        this.$refs['modalnested'].show()
      }
    },
     returnColor(a){
      const style = {
          "background-color": "#"+a,
          "color" : "white"

      }
      return style
  },
    reset(){
      this.vueSelected = ""
      this.dataReturn = {
         name:'',
         status :"-1",
         warna : ""
      }
    }

  },
  mounted(){
      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' :'Bearer '+this.currentUser.jwt
      },
      body: JSON.stringify({
        query: `
          query{ralColors{
            id_ral
            ind_name
            eng_name
            hex_code
          }
          }
        `,
          variables: {
          },
        }),
      }).then(function(response) {
          return response.json()
      }).then(function(text) {
        console.log(text.data)
          return text.data.ralColors;
      })
      .then(resp => {
        this.ListWarna = resp
      });
  },
  computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
  } 
};
</script>

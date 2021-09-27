<template>
  <b-modal id="modalright" ref="modalright" title="Filter Item" modal-class="modal-right">
     <b-row>
        <b-colxx xxs="12" >
             <b-form-group label="Option">
              <v-select v-model="vueSelected" :options="selectData" :reduce="selectData => selectData.value" label="label" placeholder="Silahkan Pilih Filter"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <b-row>
        <b-colxx xxs="12">
            <b-form-group label="Status" v-if="vueSelected == '1'">
                 <v-select v-model="dataReturn.status" :options="ListItemStatus" :reduce="ListItemStatus => ListItemStatus.value" label="name" placeholder="Silahkan Pilih Status"  />
            </b-form-group>
            <b-form-group label="Customer" v-if="vueSelected == '2'">
                <v-select v-model="dataReturn.customer" :options="ListCustomer" :reduce="ListCustomer => ListCustomer.id" label="name" placeholder="Silahkan Pilih Customer"  />
            </b-form-group>
            <b-form-group label="Transaction Date" v-if="vueSelected == '3'">
                 Tanggal Awal :
                <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Awal"
                  v-model="dataReturn.dateAwal"
                ></datepicker>
                  <br>
                  Tanggal Akhir
                  <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Akhir"
                  v-model="dataReturn.dateAkhir"
                ></datepicker>
            </b-form-group>
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
          label : "Status"
        },
        {
          value : "2",
          label : "Customer"
        },
        {
          value : "3",
          label : "Trans Date"
        },
      ],

      ListItemStatus : [
        {
          name : "aktiv",
          value : 1
        },
        {
          name : "non aktiv",
          value : 0
        },
        {
          name : "all",
          value : -1
        }
      ],
      ListCustomer : [],
      dataReturn : {
        status : -1,
        customer : null,
        dateAwal : null,
        dateAkhir : null
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
        status : -1,
        customer : null,
        dateAwal : null,
        dateAkhir : null
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
            query{customers{
              count
              customers {
                name
                id
              }
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
            return text.data.customers.customers;
        })
        .then(resp => {
          this.ListCustomer = resp
          console.log(this.ListCustomer)
        });
  },
  computed:{
    ...mapGetters({
      currentUser: "currentUser",

    })
  }
};
</script>

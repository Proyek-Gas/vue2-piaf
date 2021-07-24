<template>
  <b-modal id="modalright" ref="modalright" title="Filter Quote" modal-class="modal-right">
     <b-row>
        <b-colxx xxs="12" >
             <b-form-group label="Option">
              <v-select v-model="vueSelected" :options="selectData" :reduce="selectData => selectData.value" label="label" placeholder="Silahkan Pilih Filter"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <b-row>
        <b-colxx xxs="12" >
            <b-form-group label="Status" v-if="vueSelected == '1'">
                <v-select
                  v-model="dataReturn.status"
                  multiple
                  :options="listQuoteStatus"
                  :reduce="listQuoteStatus => listQuoteStatus.id" label="name" placeholder="Silahkan Pilih Status"
                />
            </b-form-group>

              <b-form-group label="Nama Customer" v-if="vueSelected == '2' && !this.$route.query.id">
                    <v-select
                      label="name"
                      :filterable="false"
                      multiple
                      v-model="dataReturn.customerId"
                      :options="listUser"
                      @search="fetchOptions"
                      :reduce="listUser => listUser.id"
                    >
                      <template slot="no-options">Cari nama Kustomer...</template>
                      <template slot="option" slot-scope="option">
                        <div class="row" >
                          <div class="col-3">  <div
                  src="/assets/img/profiles/l-1.jpg"
                  alt="Card image cap"
                  class="align-self-center list-thumbnail-letters rounded-circle small"
                >{{showAvatar(option.name)}}</div></div>
                        <div class="col-9 pt-2 " style="overflow: hidden;
                         text-overflow: ellipsis;">
                            {{ option.name }}
                        </div>
                        </div>
                      </template>
                      <template slot="selected-option" slot-scope="option">
                        <div class="selected d-center">
                          {{ option.name }}
                        </div>
                      </template>
                      <template slot="spinner" slot-scope="spinner">
                        <div class="spinner-border text-primary" v-show="spinner"></div>
                      </template>
                    </v-select>
            </b-form-group>

            <b-form-group label="Total" v-if="vueSelected == '3'">
               Minimum :
                <b-form-input type="number" v-model="dataReturn.minimum"  placeholder="Minimum"/>
                <br>
                Maximum :
                <b-form-input type="number" v-model="dataReturn.maximum"  placeholder="MAximum" />
            </b-form-group>
            <b-form-group label="Updated At" v-if="vueSelected == '4'">
              Tanggal Awal :
                <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Awal"
                  v-model="dataReturn.dateUpdateAwal"
                  format ="yyyy-MM-dd"
                ></datepicker>
                  <br>
                  Tanggal Akhir
                  <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Akhir"
                  v-model="dataReturn.dateUpdateAkhir"
                   format ="yyyy-MM-dd"
                ></datepicker>
            </b-form-group>
              <b-form-group label="Created At" v-if="vueSelected == '5'">
              Tanggal Awal :
                <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Awal"
                  v-model="dataReturn.dateCreateAwal"
                  format ="yyyy-MM-dd"
                ></datepicker>
                  <br>
                  Tanggal Akhir
                  <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Akhir"
                  v-model="dataReturn.dateCreateAkhir"
                   format ="yyyy-MM-dd"
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

export default {
  components: {
    "v-select": vSelect,
     datepicker: Datepicker,
  },
  data() {
    return {
     vueSelected : "",
     listQuoteStatus : [],
      selectData: [
        {
          value : "1",
          label : "Status"
        },
        {
          value : "2",
          label : "User Create"
        },
        {
          value : "3",
          label : "Total"
        },
        {
          value : "4",
          label : "Updated-At"
        },
        {
          value : "5",
          label : "Created-At"
        },
        {
          value : "6",
          label : "Customer"
        }

      ],
      listUser : [],
      dataReturn : {
        status : [],
        customerId : [],
        minimum : 0,
        maximum : 0,
        dateCreateAwal : "",
        dateCreateAkhir  : "",
        dateUpdateAwal : "",
        dateUpdateAkhir : "",
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
        status : [],
        customerId : [],
        minimum : 0,
        maximum : 0,
        dateCreateAwal : "",
        dateCreateAkhir  : "",
        dateUpdateAwal : "",
        dateUpdateAkhir : "",
      }
    }

  },
  mounted(){
      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
         query{
              quoteStatuses{
                id
                name
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
          return text.data.quoteStatuses;
      })
      .then(resp => {
        this.listQuoteStatus = resp
      });



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
                            workPhone
                        }}
                        }
            `,
          }),
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(text) {
          console.log(text)
          return text.data.customers.customers;
        })
        .then(resp => {
            this.listUser = resp
        })
  }
};
</script>

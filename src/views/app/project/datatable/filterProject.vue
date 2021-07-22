<template>
  <b-modal id="modalright" ref="modalright" title="Filter Customer" modal-class="modal-right">
     <b-row>
        <b-colxx xxs="12" >
             <b-form-group label="Option">
              <v-select v-model="vueSelected" :options="!this.$route.query.id ? selectData : selectData2" :reduce="selectData => selectData.value" label="label" placeholder="Silahkan Pilih Filter"  />
            </b-form-group>
        </b-colxx>
     </b-row>
     <b-row>
        <b-colxx xxs="12">
            <b-form-group label="Nama" v-if="vueSelected == '1'">
                <b-form-input v-model="dataReturn.name"  placeholder="Masukkan Nama"/>
            </b-form-group>
            <b-form-group label="Kategori" v-if="vueSelected == '2'">
                <v-select multiple v-model="dataReturn.kategori" :options="ListKategoriProject" :reduce="ListKategoriProject => ListKategoriProject.id" label="name" placeholder="Silahkan Pilih Kategori"  />
            </b-form-group>
            <b-form-group label="Tanggal Reminder" v-if="vueSelected == '3'">
              Tanggal Awal :
                <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Awal"
                  v-model="dataReturn.dateAwal"
                  format ="yyyy-MM-dd"
                ></datepicker>
                  <br>
                  Tanggal Akhir
                  <datepicker
                  :bootstrap-styling="true"
                  placeholder="Tanggal Akhir"
                  v-model="dataReturn.dateAkhir"
                   format ="yyyy-MM-dd"
                ></datepicker>
                <!-- <date-range-picker
            ref="picker"
            :opens="opens"
            :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
            :minDate="minDate" :maxDate="maxDate"
            :singleDatePicker="singleDatePicker"
            :timePicker="timePicker"
            :timePicker24Hour="timePicker24Hour"
            :showWeekNumbers="showWeekNumbers"
            :showDropdowns="showDropdowns"
            :autoApply="autoApply"
            v-model="dataReturn.dateRange"
            @update="updateValues"
            @toggle="checkOpen"
            :linkedCalendars="linkedCalendars"
            :dateFormat="dateFormat"
    >
        <template v-slot:input="picker" style="min-width: 350px;">
            {{ picker.startDate | date }} - {{ picker.endDate | date }}
        </template>
    </date-range-picker> -->
            </b-form-group>

            <b-form-group label="Total" v-if="vueSelected == '4'">
                 Minimum :
                <b-form-input type="number" v-model="dataReturn.minimum"  placeholder="Minimum"/>
                <br>
                Maximum :
                <b-form-input type="number" v-model="dataReturn.maximum"  placeholder="MAximum" />
            </b-form-group>
             <b-form-radio-group stacked label="Status" v-model="dataReturn.status" v-if="vueSelected == '5'">
                <b-form-radio value="1">Active</b-form-radio>
                <b-form-radio value="0">Non Active</b-form-radio>
                  <b-form-radio value="-1">All</b-form-radio>
            </b-form-radio-group>

            <b-form-group label="Nama Customer" v-if="vueSelected == '6' && !this.$route.query.id">
                  <b-form-group >
                    <v-select
                      label="name"
                      :filterable="false"
                      multiple
                      v-model="dataReturn.customerId"
                      :options="customerSelection"
                      @search="fetchOptions"
                      :reduce="customerSelection => customerSelection.id"
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
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { VueAutosuggest } from "vue-autosuggest";


export default {
  components: {
    "v-select": vSelect,
     datepicker: Datepicker,
    // "date-range-picker" : DateRangePicker,
     "vue-autosuggest": VueAutosuggest,
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
          label : "Kategori"
        },
        {
          value : "3",
          label : "Tanggal Reminder"
        },
        {
          value : "4",
          label : "Total"
        },
        {
          value : "5",
          label : "Status"
        },
        {
          value : "6",
          label : "Nama Customer"
        }
      ],

       selectData2: [
        {
          value : "1",
          label : "Name"
        },
        {
          value : "2",
          label : "Kategori"
        },
        {
          value : "3",
          label : "Tanggal Reminder"
        },
        {
          value : "4",
          label : "Total"
        },
        {
          value : "5",
          label : "Status"
        },
      ],
      ListKategoriProject : [],
      customerSelection : [],
      dataReturn : {
         name:'',
         status : "-1",
         kategori : [],
         minimum :0,
         maximum :0,
         dateAwal : "",
         dateAkhir :"",
         dateRange : [],
         customerId : [],
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

    reset(){
      this.vueSelected = ""
      this.customerSelection = []
      this.dataReturn = {
         name:'',
         status : "-1",
        minimum : 0,
        maximum : 0,
         kategori : [],
         dateAwal : "",
         dateAkhir :"",
         dateRange : [],
         customerId : []
      }
    },

    showAvatar(row){
      const tmp = row.split(' ');
      if(tmp.length  == 1){
        return tmp[0].substring(0,2).toUpperCase();
      }else{
         return tmp[0].substring(0,1).toUpperCase()+tmp[1].substring(0,1).toUpperCase();
      }
    },

     fetchOptions(search, loading) {
      loading(true);
      setTimeout(() => {
        this.customerSelection = this.customerSelection.filter(row=>{
           return row.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
        })
        loading(false)
      },2000);
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
          query{projectCategory{
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
          return text.data.projectCategory;
      })
      .then(resp => {
        this.ListKategoriProject = resp
      });

 if(!this.$route.query.id){

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
            this.customerSelection = resp
        })

 }

  }
};
</script>

<style scoped>
.breakWord{
  word-wrap: break-word;
}
</style>

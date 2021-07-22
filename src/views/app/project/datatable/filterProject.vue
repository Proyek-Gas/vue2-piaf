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
            <b-form-group label="Kategori" v-if="vueSelected == '2'">
                <v-select v-model="dataReturn.kategori" :options="ListKategoriProject" :reduce="ListKategoriProject => ListKategoriProject.id" label="name" placeholder="Silahkan Pilih Kategori"  />
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

export default {
  components: {
    "v-select": vSelect,
     datepicker: Datepicker,
    // "date-range-picker" : DateRangePicker
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
      ],
      ListKategoriProject : [],
      dataReturn : {
         name:'',
         status : "-1",
         kategori : "",
         minimum :0,
         maximum :0,
         dateAwal : "",
         dateAkhir :"",
         dateRange : []
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
      this.dataReturn = {
         name:'',
         status : "-1",
        minimum : 0,
        maximum : 0,
         kategori : "",
         dateAwal : "",
         dateAkhir :"",
         dateRange : []
      }
    },
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
  }
};
</script>


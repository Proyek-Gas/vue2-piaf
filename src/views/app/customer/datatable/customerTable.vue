<template>
  <div>
    <datatable-heading
      :title="$t('menu.customerTable')"
      :changePageSize="changePageSize"
      :searchChange="searchChange"
      :from="from"
      :to="to"
      :total="total"
      :perPage="perPage"
    ></datatable-heading>

    <b-row class="mb-3">
      <b-colxx xxs="6">
        <b-button class="mb-1"  v-b-modal.modalright variant="success " >Filter</b-button>
              <filter-cust v-on:answers="onUpdateAnswer"></filter-cust>
         <b-button class="mb-1" variant="primary " @click="movePageAdd()">Add Customer</b-button>
      </b-colxx>
      <b-colxx xxs="6" style="text-align:left">
          <h5 v-if="tag.length >0">Filter By</h5>
          <b-badge style="margin :2px" variant="primary" v-for="tg in tag" :key="tg"  v-b-modal.modalright>{{tg}} </b-badge>
      </b-colxx>
    </b-row>

    <b-row>
      <b-colxx xxs="12">
        <b-card>
          <div class="loader" >LOADING</div><!--Your Loading Message -->
          <vuetable
            ref="vuetable"
            style="display:block; overflow-x:auto;width:auto"
            :api-mode="false"
            :fields="fields"
            :per-page="perPage"
            :data-manager="dataManager"
           :detail-row-component="detailRow"
            detail-row-transition="expand"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
             @vuetable:cell-clicked="onCellClicked"
          >
            <template slot="avatar" slot-scope="props">
                <div
                  src="/assets/img/profiles/l-1.jpg"
                  alt="Card image cap"
                  class="align-self-center list-thumbnail-letters rounded-circle small"
                >{{showAvatar(props.rowData.name)}}</div>
            </template>
            <template slot="name" slot-scope="props">
                <h4>{{props.rowData.name}}</h4>
                <i>{{props.rowData.email}}</i>
            </template>
            <template slot="mobilePhone" slot-scope="props">
               <i>{{props.rowData.mobilePhone}}</i>
               <br>
                <i>{{props.rowData.workPhone}}</i>
            </template>
            <template slot="category.name" slot-scope="props">
               <b-badge :variant="props.rowData.category.name === 'CUSTOMER' ?  'primary' : 'success'" >{{props.rowData.category.name}}</b-badge>
            </template>
            <template slot="id" slot-scope="props">
              <i  class="simple-icon-arrow-down" @click="cellClicked($event, props.rowData)"></i>
            </template>
            <template slot="action" slot-scope="props">
                <b-dropdown text="Actions" variant="outline-secondary">
                  <b-dropdown-item @click="movePageDetail(props.rowData.id)">Detail</b-dropdown-item>
                  <b-dropdown-item @click="movePageEdit(props.rowData.id)">Edit</b-dropdown-item>
              </b-dropdown>
            </template>
          </vuetable>
        </b-card>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx>
    </b-row>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="onContextMenuAction('copy')">
        <i class="simple-icon-docs" />
        <span>Copy</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('move-to-archive')">
        <i class="simple-icon-drawer" />
        <span>Move to archive</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('delete')">
        <i class="simple-icon-trash" />
        <span>Delete</span>
      </v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";
import _ from "lodash";
import MyDetailRow from "./MyDetailRow";
import filterCust from "./filterCustomer"


export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    "filter-cust" : filterCust,
  // mydetailrow : MyDetailRow //->ini ga error namun ga ada datanya
  },
  data() {
    return {
      isLoad: false,
      detailRow : MyDetailRow,
      dataClone : [],
      loadCek : true,
      tag : [],
      fields: [
        {
          name: "__slot:avatar",
          titleClass: "",
          width: "5%"
        },
        {
          name: "__slot:name",
          sortField: "name",
          title: "Name",
          titleClass: "",
          dataClass: "text-muted",
          width:"25%"

        },
        {
          name: "customerNo",
          sortField: "customerNo",
          title: "Customer No",
          titleClass: "",
          dataClass: "text-muted",
          togglable : true,
          width:"15%"
        },
        {
          name: "__slot:mobilePhone",
          sortField: "mobilePhone",
          title: "Telepon",
          titleClass: "",
          dataClass: "text-muted",
          width:"10%"
        },
        {
          name: "npwpNo",
          sortField: "npwpNo",
          title: "NPWP",
          titleClass: "",
          dataClass: "text-muted",
         width:"10%"
        },
        {
          name: "__slot:category.name",
          sortField: "category.name",
          title: "Kategori",
          titleClass: "",
          dataClass: "text-muted",
          width:"15%"
        },
        {
          name: "__slot:id",
          title :"",
          width: "5%",
          titleClass: "center aligned",
          dataClass: "center aligned",
        },
        {
          name: "__slot:action",
          title :"",
          width: "15%",
          titleClass: "center aligned",
          dataClass: "center aligned",
        },

      ],
      sort: "",
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      data: [],
      selectedItems: [],

    };
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    },
  },
  mounted() {
    fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
               query{customers  {
          count
          customers{
            id
  			name
        email
  			customerNo
  			npwpNo
        priceCategory{
          id
          name
        }
  			mobilePhone
  			workPhone
        street
  		  customerLimitAmountValue
            isInAccurate
  		    city
          province
        category{
          name
          id
        }
          }

    }
}
      `
      }),
    }).then(function(response) {
        return response.json()
    }).then(function(text) {
        return text.data.customers.customers;
    })
    .then(resp => {
        this.data = resp;
        this.dataClone = resp;
        this.loadCek = false
      });

  },
  methods: {
    movePageAdd(){
			window.location = window.location.href+"/add";
		},
    movePageDetail(val){
			window.location = window.location.href+"/cDetail?id="+val;
		},
    movePageEdit(val){
			window.location = window.location.origin+"/app/datatable/customerTable/cDetail/edit?id="+val;
		},
    onPaginationData(paginationData) {
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      console.log(paginationData);
      this.$refs.pagination.setPaginationData(paginationData);
    },
     onCellClicked (data, field, event) {
        console.log('cellClicked: ', field.name)
        console.log(data.id)
        this.$refs.vuetable.toggleDetailRow(data.id)
      },
    cellClicked ($event, data) {
      // console.log('cellClicked: ', $event)
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;
      console.log(this.search);
      local = local.filter(row => {
        return row.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ;
      });
      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      console.log("pagination:", pagination);
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to),
      };
    },
    changePageSize(perPage) {
      this.perPage = perPage;
      console.log(this.perPage);
      this.$refs.vuetable.refresh();
    },
     showAvatar(row){
      const tmp = row.split(' ');
      if(tmp.length  == 1){
        return tmp[0].substring(0,2).toUpperCase();
      }else{
         return tmp[0].substring(0,1).toUpperCase()+tmp[1].substring(0,1).toUpperCase();
      }
    },

    searchChange(val) {
      this.search = val;
      this.$refs.vuetable.refresh();
    },

    onUpdateAnswer: function(newAnswer){
        this.tag = [];
        let cek = true;
        if(newAnswer){
          if(newAnswer.name != ""){
              this.search = newAnswer.name;
              cek = false;
              this.tag.push("Nama")
          }

          if(newAnswer.customerNo !=""){
              cek = false
              this.data = this.data.filter(row => {
                return row.customerNo.toLowerCase().indexOf(newAnswer.customerNo.toLowerCase()) !== -1 ;
              });
              this.tag.push("CustomerNo")
          }

          if(newAnswer.mobilePhone !=""){
            cek = false;
            this.data = this.data .filter(row=>
            {
              if(row.mobilePhone){
                 return row.mobilePhone.toLowerCase().indexOf(newAnswer.mobilePhone.toLowerCase()) != -1;
              }
            })
            this.tag.push("Mobile Phone")
          }

           if(newAnswer.workPhone !=""){
            cek = false;
            this.data = this.data .filter(row=>
            {
              if(row.workPhone){
                return row.workPhone.toLowerCase().indexOf(newAnswer.workPhone.toLowerCase()) != -1;
              }
            })
            this.tag.push("Work Phone")
           }


           if(newAnswer.address !=""){
              cek = false;
              this.data = this.data.filter(row=>
              {
                if(row.street){
                  return row.street.toLowerCase().indexOf(newAnswer.address.toLowerCase()) != -1;
                }
              })
              this.tag.push("Alamat")
           }

           if(newAnswer.npwp !=""){
             cek = false;
             this.data = this.data.filter(row=>{
                if(row.npwpNo){
                  return row.npwpNo.toLowerCase().indexOf(newAnswer.npwp.toLowerCase()) !== -1
                }
             })
             this.tag.push("NPWP")
           }

           if(newAnswer.email !=""){
             cek = false;
             this.data = this.data.filter(row=>{
                if(row.email){
                  return row.email.toLowerCase().indexOf(newAnswer.email.toLowerCase()) !== -1
                }
             })
             this.tag.push("Email")
           }

           if(newAnswer.priceCategory != ""){
             cek = false;
              let newdata = []
              for(let i=0; i< newAnswer.priceCategory.length; i++){
                for(let j=0; j< this.data.length; j++){
                  if(this.data[j].priceCategory){
                      if(newAnswer.priceCategory [i] == this.data[j].priceCategory.id){
                          newdata.push(this.data[j])
                        }
                  }
                }
              }
             this.data = newdata
             this.tag.push("Kategori harga")
           }
          if(newAnswer.customerCategory != ""){
             cek = false
             let newdata = []
              for(let i=0; i< newAnswer.customerCategory.length; i++){
                for(let j=0; j< this.data.length; j++){
                  if(this.data[j].category){
                       if(newAnswer.customerCategory [i] == this.data[j].category.id){
                          newdata.push(this.data[j])
                        }
                  }
                }
              }
             this.data = newdata


            //  this.data = this.data.filter(row=>{
            //     if(row.category &&  row.$index != -1){
            //       return row.category.id == newAnswer.customerCategory
            //     }
            //  })
             this.tag.push("Kategori Kustomer")
           }

           if(newAnswer.minimum != 0 && newAnswer.maximum == 0 ){
            cek = false;
            const val1 = newAnswer.minimum;
            this.data = this.data.filter(row => {
              return row.customerLimitAmountValue>= val1;
            });
            this.tag.push("Limit Amount > min")
          }
          if(newAnswer.maximum != 0 && newAnswer.minimum == 0){
            cek = false;
            const val1 = newAnswer.maximum;
            this.data = this.data.filter(row => {
              return row.customerLimitAmountValue<= val1;
            });
            this.tag.push("Limit Amount < max")
          }
          if(newAnswer.maximum != 0 && newAnswer.minimum != 0){
            cek = false;
            const val1 = newAnswer.minimum;
            const val2 = newAnswer.maximum
            if(val1< val2){
                   this.data = this.data.filter(row => {
                    return row.customerLimitAmountValue>= val1 && row.customerLimitAmountValue<= val2;
                  });
              this.tag.push("Limit Amount")
            }
          }



        }
        console.log(cek)
        if(cek){
          this.search = ""
          this.data = this.dataClone
        }
        this.$refs.vuetable.refresh()
    }
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    }
  },
   events: {
    	/** Start the loader ----------------------------------
    	 * Dispatched up the parent chain before vuetable
    	 * starts to request the data from the server
    	 */
        'vuetable:loading': function() {
            // display your loading notification
            // console.log ("load started");
        },

       	/** Disable the loader ---------------------------------
    	 * dispatched when vuetable receives response from server.
    	 * Response from server passed as the event argument
    	 */
        'vuetable:load-success': function(response) {
            // hide loading notification
            // console.log ("load completed");
        },
    },
};
</script>
<style>
.vuetable-wrapper {
    position: relative;
    opacity: 1;
}
.loader {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s linear;
    background: url('../../../../../src/assets/logos/gif_loading.gif') no-repeat bottom center;
    width: 200px;
    height: 30px;
    font-size: 1em;
    text-align: center;
    margin-left: -100px;
    letter-spacing: 4px;
    color: #3E97F6;
    position: absolute;
    top: 160px;
    left: 50%;
}
.loading .loader {
    visibility: visible;
    opacity: 1;
    z-index: 100;
}
.loading .vuetable{
    opacity:0.3;
    filter: alpha(opacity=30); /* IE8 and earlier */
}
</style>

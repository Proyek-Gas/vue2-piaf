<template>
  <div>
    <datatable-heading
      :title="$t('menu.salesOrderTable')"
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
            <filter-sales v-on:answers="onUpdateAnswer"></filter-sales>
        <!-- <b-button class="mb-1" variant="primary" v-b-modal.modalrightAdd>Add User</b-button>
        <mAddUser></mAddUser> -->
      </b-colxx>
      <b-colxx xxs="6" style="text-align:left">
          <h5 v-if="tag.length >0">Filter By</h5>
          <b-badge style="margin :2px" variant="primary" v-for="tg in tag" :key="tg"  v-b-modal.modalright>{{tg}} </b-badge>
      </b-colxx>
    </b-row>

    <b-row>
      <template v-if="isLoad">
        <b-colxx xxs="12">
          <b-card>
            <vuetable
              ref="vuetable"
              style="display:block; overflow-x:auto;width:auto"
              :api-mode="false"
              :fields="fields"
              :per-page="perPage"
              :data-manager="dataManager"
              detail-row-transition="expand"
              :detail-row-component="detailRow"
              pagination-path="pagination"
              class="order-with-arrow"
              @vuetable:pagination-data="onPaginationData"
               @vuetable:cell-clicked="onCellClicked"
            >
            <template slot="date" slot-scope="props">
                <p>Transaction date : {{props.rowData.transDate}}</p>
                <p>Shipment date : {{props.rowData.shipDate}}</p>
            </template>
            <template slot="totalAmount" slot-scope="props">
                <div  :id="'tool-nt'+props.rowData.id"> {{shortNumber(props.rowData.totalAmount)}}</div>
               <b-tooltip :target="'tool-nt'+props.rowData.id"
                                placement="right"

                                  >
                        {{props.rowData.totalAmount | currency}}
                </b-tooltip>
            </template>
            <template slot="status" slot-scope="props">
                <b-badge v-if="props.rowData.status == 1" variant="primary">Aktif</b-badge>
                <b-badge v-else variant="danger">Non Aktif</b-badge>
            </template>
            <template slot="id" slot-scope="props">
              <i  class="simple-icon-arrow-down" @click="cellClicked($event, props.rowData)"></i>
            </template>
            <template slot="action" slot-scope="props">
                <b-dropdown text="Actions" variant="outline-secondary">
                  <b-dropdown-item :to="movePageDetail(props.rowData.id)">Detail</b-dropdown-item>
                  <b-dropdown-item @click="select(props.rowData)" v-b-modal="'modalrightEdit-' + props.rowData.id">Edit</b-dropdown-item>
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
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
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
  <mEditUser ref="editUser"></mEditUser>
  </div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";
import _ from "lodash";
import MyDetailRow from "./MyDetailRow";
//import mAddUser from "../form/modalAddUser.vue";
//import mEditUser from "../form/modalEditUser.vue";
import filterSales from "./filterSalesOrder"

import { mapGetters } from "vuex";

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    "filter-sales" : filterSales,
   // "mAddUser": mAddUser,
   // "mEditUser": mEditUser
   //"my-detail-row" : MyDetailRow //->ini ga error namun ga ada datanya
  },
  data() {
    return {
      isLoad: false,
      detailRow : MyDetailRow,
      dataClone : [],
      loadCek : true,
      fields: [
        {
          name:"id",
          title:"ID",
          titleClass: "",
          dataClass:"text-muted"
          , width :"5%"
        },
        {
          name: "__slot:date",
          title: "Date ",
          titleClass: "",
          dataClass: "text-muted",
          width:"15%"

        },
        {
          name:"toAddress",
          sortField: "toAddress",
          title : "Alamat",
          titleClass : "",
          dataClass : "",
          width: "10%"
        },
        {
          name:"__slot:totalAmount",
          sortField:"totalAmount",
          title: "Jumlah Total",
          titleClass: "",
          dataClass : "",
          width : "10%"
        },
        {
          name: "customer.name",
          sortField: "customer.name",
          title: "Customer",
          titleClass: "",
          dataClass: "text-muted",
          togglable : true,
          width:"10%"
        },


        {
          name: "__slot:status",
          title :"Status",
          sortField : "status",
          width: "5%",
          titleClass: "center aligned",
          dataClass: "center aligned",
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
      perPage: 5,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      data: [],
      selectedItems: [],
      tag: []
    };
  },
  // watch: {
  //   data(newVal, oldVal) {
  //     this.$refs.vuetable.refresh();
  //   },
  // },
  mounted() {
    this.getData(null,1)

  },
  methods: {
    select(a){
      console.log('modalrightEdit-' + a.id);
      this.$refs.editUser.loadField(a);
    },
    getData (filter,arr){
        let querys = `
                query{
                  salesOrder(filter :${filter} ){
                    count
                    sales_order
                    {
                      id
                      transDate
                      shipDate
                      tax1Amount
                      customer{
                        id
                        name
                      }
                      status
                      subTotal
                      cashDiscount
                      toAddress
                      totalAmount
                      poNumber
                      paymentTerm{
                        id
                        name
                      }
                    }
                  }
                }
                        `
          console.log(querys)
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + this.currentUser.jwt
        },
        body: JSON.stringify({
          query: querys
                }),
              }).then(function(response) {
                  return response.json()
              }).then(function(text) {
                console.log(text)
                  return text.data.salesOrder.sales_order;
              })
              .then(resp => {
                  this.data = resp;
                  console.log(this.data)
                  if(arr != null){
                    this.dataClone = resp;
                     this.isLoad = true
                  }
                  else{
                    this.$refs.vuetable.refresh()
                  }
                });

    },
    movePageAdd(){
       return "userTable/add";
		},
    movePageDetail(val){
      // console.log(val);
			// window.location = window.location.href+"/iDetail?id="+val;
      return "salesorderTable/soDetail?id=" + val;
		},
    movePageEdit(val){
			return "userTable/uDetail/edit?id="+val;
		},
    onPaginationData(paginationData) {
      this.from = paginationData.from;
      this.to = paginationData.to;
      this.total = paginationData.total;
      console.log(paginationData);
      this.$refs.pagination.setPaginationData(paginationData);
    },

    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    shortNumber(n) {
        if (n < 1e3) return n;
        else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
        else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
        else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
        else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    },
    dataManager(sortOrder, pagination) {
     // if (this.data.length < 1) return;

      let local = this.data;
      console.log(this.search);
      local = local.filter(row => {
        return row.customer.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ;
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

    formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2)
              month = '0' + month;
          if (day.length < 2)
              day = '0' + day;

          return [year, month, day].join('-');
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

    onCellClicked (data, field, event) {
        this.$refs.vuetable.toggleDetailRow(data.id)
      },
    cellClicked ($event, data) {

      this.$refs.vuetable.toggleDetailRow(data.id)
    },

    onUpdateAnswer: function(newAnswer){
      console.log(newAnswer)
        let cek = true;
        this.tag =[];
        let status = null;
        let customer =null;
        let formDate = null;

        if(newAnswer){
          console.log(newAnswer);
          if(newAnswer.status != -1){
            status = newAnswer.status
            this.tag.push("status")
          }


          if(newAnswer.customer != null){
              customer = parseInt(newAnswer.customer)
              this.tag.push("customer")
          }

          let ckdt1 = true;
          let ckdt2 = true;
          formDate = `{`;
          if(newAnswer.dateAwal != null){
           formDate = formDate +`date_min:"${ this.formatDate(newAnswer.dateAwal)}"`
            this.tag.push("Tanggal transaksi dateMin")
          }else{
            formDate = formDate+ `date_min:null`
            ckdt1 = false
          }


           if(newAnswer.dateAkhir != null){
            formDate = formDate+ ` date_max:"${this.formatDate(newAnswer.dateAkhir)}"`+`}`
              this.tag.push("Tanggal transaksi dateMax")
            }else{
              formDate =  formDate +` date_max:null`+`}`
              ckdt2 = false
            }

            if(!ckdt1 && !ckdt2 ){
              formDate = null
            }
          cek = false
        }
        console.log(cek)
        console.log(this.dataClone)
        if(cek){
            this.search = ""
            this.data = this.dataClone
            console.log(this.dataClone)
            this.$refs.vuetable.refresh();
        }else{
            let filter = `{
              trans_date : ${formDate}
              status : ${status}
              customer_id : ${customer}
            }`
            this.getData(filter,null)
        }


    },
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
    },
     ...mapGetters({
      currentUser: "currentUser",
    })
  },
};
</script>

<template>
  <div>
    <datatable-heading
      :title="$t('menu.schemeTable')"
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
            <filter-scheme v-on:answers="onUpdateAnswer"></filter-scheme>
         <b-button class="mb-1" variant="primary " :to="movePageAdd()">Add scheme</b-button>
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
            :detail-row-component="detailRow"
            detail-row-transition="expand"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
             @vuetable:cell-clicked="onCellClicked"
          >
            <template slot="name" slot-scope="props">
                <router-link tag="a" :to="movePageDetail(props.rowData.id)"><h5>{{props.rowData.name}}</h5></router-link>
            </template>
            <template slot="color" slot-scope="props">
                <div class="btn btn-sm" v-bind:style="returnColor(props.rowData.color.hex_code)">{{props.rowData.color.eng_name}}</div>
            </template>
            <template slot="coat" slot-scope="props">
                <i>Min : {{props.rowData.min_coat}} </i><br>
                <i>Max : {{props.rowData.max_coat}}</i>
            </template>
            <template slot="Dft" slot-scope="props">
                <i>Min : {{props.rowData.min_dft}} </i><br>
                <i>Max : {{props.rowData.max_dft}}</i>
            </template>
               <template slot="loss" slot-scope="props">
                <i>Min : {{props.rowData.min_loss}} </i><br>
                <i>Max : {{props.rowData.max_loss}}</i>
            </template>
            <template slot="id" slot-scope="props">
              <i  class="simple-icon-arrow-down" @click="cellClicked($event, props.rowData)"></i>
            </template>
            <template slot="action" slot-scope="props">
                <b-dropdown  text="Actions" variant="outline-secondary">
                  <b-dropdown-item :to="movePageDetail(props.rowData.id)">Detail</b-dropdown-item>
                  <b-dropdown-item :to="movePageEdit(props.rowData.id)">Edit</b-dropdown-item>
                  <b-dropdown-item @click="showModal(props.rowData.name,'modalbasic')">Delete</b-dropdown-item>
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
    <b-modal id="modalbasic" ref="modalbasic" title="Konfirmasi">
        Anda yakin ingin menghapus scheme {{ schName }} ?
        <template slot="modal-footer">
            <b-button variant="primary" @click="deletePro(proId,'modalbasic')" class="mr-1">OK</b-button>
            <b-button variant="danger" @click="hideModal('modalbasic')">Cancel</b-button>
        </template>
    </b-modal>
  </div>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../../containers/datatable/DatatableHeading";
import _ from "lodash";
import MyDetailRow from "./MyDetailRow";
import filterScheme from "./filterScheme"
import { mapGetters } from "vuex";

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    "filter-scheme" : filterScheme,
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
          name: "__slot:name",
          sortField: "name",
          title: "Name",
          titleClass: "",
          dataClass: "text-muted",
          width:"25%"

        },
        {
          name: "__slot:color",
          sortField: "color.eng_name",
          title: "Warna",
          titleClass: "",
          dataClass: "text-muted",
          togglable : true,
          width:"15%"
        },
        {
          name: "jum_item",
          sortField: "jum_item",
          title: "jumlah",
          titleClass: "",
          dataClass: "text-muted",
          width:"5%"
        },
        {
          name: "__slot:coat",
          title: "Coat(%)",
          titleClass: "",
          dataClass: "text-muted",
          width:"10%"
        },
         {
          name: "__slot:Dft",
          title: "Dft(μ)",
          titleClass: "",
          dataClass: "text-muted",
          width:"10%"
        },
         {
          name: "__slot:loss",
          title: "loss",
          titleClass: "",
          dataClass: "text-muted",
          width:"10%"
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
      schName: "",
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
    fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization' :'Bearer '+this.currentUser.jwt
        },
        body: JSON.stringify({
          query: `
            query{
          scheme{
          count
            schemes{
              id
            color{
              id_ral
              eng_name
              hex_code
              ind_name
            }
            name
            notes
            status
            jum_item
            min_coat
            max_coat
            min_dft
            max_dft
            min_loss
            max_loss
            }
          }
        }
              `
      }),
    }).then(function(response) {
        return response.json()
    }).then(function(text) {
      console.log(text)
        return text.data.scheme.schemes;
    })
    .then(resp => {
      console.log(resp)
        this.data = resp;
        this.dataClone = resp;
        this.isLoad = true
      });

  },
  methods: {
    movePageAdd(){
			//window.location = window.location.href+"/add";
      return "schemeTable/add";
		},
    movePageDetail(val){
      // console.log(val);
			// window.location = window.location.href+"/sDetail?id="+val;
      return "schemeTable/sDetail?id="+val;
		},
    movePageEdit(val){
			//window.location = window.location.origin+"/app/datatable/schemeTable/sDetail/edit?id="+val;
      return "schemeTable/sDetail/edit?id="+val;
		},
    deletePro(val, refname){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        deleteScheme(scheme_id:${val}){
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
            return text.data.deleteScheme;
        })
        .then(resp => {
            console.log(resp.message);
            if(resp.status.toLowerCase() == "success"){
              this.$toast(resp.message, {
                  type: "success",
                  hideProgressBar: true,
                  timeout: 2000
              });
              this.$refs[refname].hide();
              this.$refs.vuetable.refresh();
            }else{
                this.$toast(resp.message, {
                    type: "error",
                    hideProgressBar: true,
                    timeout: 2000
                });
            }
        });
    },
    hideModal(refname){
        this.$refs[refname].hide()
    },
    showModal(val,refname){
        this.schName = val;
        this.$refs[refname].show()
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
    returnColor(a){
      const style = {
          "background-color": "#"+a,
          "color" : "white"

      }
      return style
  },
    onUpdateAnswer: function(newAnswer){
        let cek = true
        this.tag =[]
        if(newAnswer){
          let cekFetch = false;
          let status = -1;
          if(newAnswer.name != ""){
            this.data = this.data.filter(row => {
                return row.name.toLowerCase().indexOf(newAnswer.name.toLowerCase())  !== -1 ;
            });
              cek = false;
              this.tag.push("Nama")
          }
          if(newAnswer.status != "-1"){
            cekFetch = true
            status = parseInt(newAnswer.status)
            cek = false;
            this.tag.push("Status")
          }

          if(newAnswer.warna != ""){
              cek = false;
              this.data = this.data.filter(row=>{
                return row.color.id_ral == newAnswer.warna.id_ral
              })
            this.tag.push("Warna")
          }
          if(cekFetch){
            this.fetchAgain(status)
          }
        }
        if(cek){
          this.search = ""
          this.data = this.dataClone
        }

         this.$refs.vuetable.refresh()
    },
    fetchAgain(status){

      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :'Bearer '+this.currentUser.jwt
        },
        body: JSON.stringify({
          query: `
            query{
          scheme(filter:{status : ${status}}){
          count
            schemes{
              id
            color{
              id_ral
              eng_name
              hex_code
              ind_name
            }
            name
            notes
            status
            jum_item
            min_coat
            max_coat
            min_dft
            max_dft
            min_loss
            max_loss
            }
          }
        }
              `
      }),
    }).then(function(response) {
        return response.json()
    }).then(function(text) {
        return text.data.scheme.schemes;
    })
    .then(resp => {
        this.data = resp;
        this.$refs.vuetable.refresh()
      });

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
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
    }
  },

};
</script>

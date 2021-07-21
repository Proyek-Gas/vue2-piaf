<template>
  <div>
    <datatable-heading
      :title="$t('menu.projectTable')"
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
            <filter-pro v-on:answers="onUpdateAnswer"></filter-pro>
         <b-button class="mb-1" variant="primary" @click="movePageAdd()">Add Project</b-button>
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
            <template slot="name" slot-scope="props">
                <a href=""><h5>{{props.rowData.name}}</h5></a>
            </template>
            <template slot="category" slot-scope="props">
               <b-badge :variant="props.rowData.status=== 1 ?  'primary' : 'danger'" >{{props.rowData.category.name}}</b-badge>
            </template>
            <template slot="lastQuote" slot-scope="props">
                  <a href=""><h5>{{props.rowData.lastQuote.userCreate.name}}</h5></a>
                  <b-badge v-if="props.rowData.lastQuote.userCreate.role" variant="primary">{{props.rowData.userCreate.role.name}}</b-badge>
            </template>
            <template slot="lastQuote.total" slot-scope="props">
                  <a href="">{{shortNumber(props.rowData.lastQuote.total)}}</a>
            </template>
            <template slot="id" slot-scope="props">
              <i  class="simple-icon-arrow-down" @click="cellClicked($event, props.rowData)"></i>
            </template>
            <template slot="action" slot-scope="props">
                <b-dropdown text="Actions" variant="outline-secondary">
                  <b-dropdown-item @click="movePageDetail(props.rowData.id)">Detail</b-dropdown-item>
                  <b-dropdown-item @click="movePageEdit(props.rowData.id)">Edit</b-dropdown-item>
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
        Anda yakin ingin menghapus project {{ proName }} ?
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
import filterPro from "./filterProject"


export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
    "filter-pro" : filterPro,
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
          name: "__slot:category",
          sortField: "category.name",
          title: "Kategori",
          titleClass: "",
          dataClass: "text-muted",
          togglable : true,
          width:"5%"
        },
        {
          name: "__slot:lastQuote",
          sortField: "lastQuote.userCreate.name",
          title: "lastQuote",
          titleClass: "",
          dataClass: "text-muted",
          width:"30%"
        },
        {
          name: "__slot:lastQuote.total",
          sortField: "lastQuote.total",
          title: "Total",
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
      proName: "",
      data: [],
      selectedItems: [],
      tag: []
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
            query {projects {
            count
  					projects{
              name
                id
                status
                category {
                    id
                    name
                }
              	status
                lastQuote{
                    total
                    id
                    status{
                      id
                      name
                    }
                    userCreate{
                    id
                    name
                    photo
                    role{
                        id
                        name
                    }
                    }

                }
  tgl_reminder
            }
                }}
      `
      }),
    }).then(function(response) {
        return response.json()
    }).then(function(text) {
        return text.data.projects.projects;
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
			window.location = window.location.href+"/pDetail?id="+val;
		},
    movePageEdit(val){
			window.location = window.location.origin+"/app/datatable/projectTable/pDetail/edit?id="+val;
		},
    deletePro(val, refname){
        fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        deleteProject(project_id:${val}){
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
            return text.data.deleteProject;
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
        this.proName = val;
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
    //  if (this.data.length < 1) return;

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
        let cek = true;
        this.tag =[]
        if(newAnswer){
          let status = null
          let kategori = null
          let cekFetch = true;
          if(newAnswer.status != "-1"){
              status = parseInt(newAnswer.status)
              this.tag.push("Status");
              cek = false
          }
          if(newAnswer.name != ""){
              this.search = newAnswer.name;
              cek = false;
              this.tag.push("Nama")
          }
          if(newAnswer.kategori !=""){
             kategori = parseInt(newAnswer.kategori)
             cek = false
             this.tag.push("Kategori")
          }

           if(newAnswer.minimum != 0 && newAnswer.maximum == 0 ){
            cek = false;
            const val1 = newAnswer.minimum;
            this.data = this.data.filter(row => {
              return row.lastQuote.total>= val1;
            });
            cekFetch = false
            this.tag.push("Total > Min")
          }
          if(newAnswer.maximum != 0 && newAnswer.minimum == 0){
            cek = false;
            const val1 = newAnswer.maximum;
            this.data = this.data.filter(row => {
              return row.lastQuote.total<= val1;
            });
            cekFetch = false
            this.tag.push("Total < Max")
          }
          if(newAnswer.maximum != 0 && newAnswer.minimum != 0){
            cek = false;
            const val1 = newAnswer.minimum;
            const val2 = newAnswer.maximum
            if(val1< val2){
                   this.data = this.data.filter(row => {
                    return row.lastQuote.total>= val1 && row.lastQuote.total<= val2;
                  });
            cekFetch = false
              this.tag.push("Total")
            }

          if( newAnswer.dateAkhir!= "" && newAnswer.dateAwal != ""){
            cek = false;
            const dt1 = new Date(newAnswer.dateAkhir);
            const dt2 = new Date(newAnswer.dateAwal);
            if(dt1.getTime()> dt2.getTime()){
                 this.data = this.data.filter(row =>{
                  return new Date(row.tgl_reminder).getTime()>= dt2.getTime() && new Date(row.tgl_reminder).getTime()<=dt1.getTime();
                })
              this.tag.push("Tanggal Reminder")
              cekFetch = false
            }
          }

          if( newAnswer.dateAkhir!= "" && newAnswer.dateAwal == ""){
            cek = false;
            const dt1 = new Date(newAnswer.dateAkhir);
            this.data = this.data.filter(row =>{
                return new Date(row.tgl_reminder).getTime()<=dt1.getTime();
              })
            this.tag.push("tanggal reminder")
            cekFetch = false
          }

          if( newAnswer.dateAkhir== "" && newAnswer.dateAwal != ""){
            cek = false;
            const dt2 = new Date(newAnswer.dateAwal);
              this.data = this.data.filter(row =>{
                return new Date(row.tgl_reminder).getTime()>= dt2.getTime();
              })
            this.tag.push("tanggal reminder")
            cekFetch = false

          }



          if(cekFetch){
             this.fetchAgain(kategori,status)
          }
        }
        if(cek){
          this.search = ""
          this.data = this.dataClone
        }
         this.$refs.vuetable.refresh()
      }
    },
     fetchAgain(kategori, status){

            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                query {projects(filter : {category : ${kategori} status: ${status}}) {
                count
                projects{
                  name
                    id
                    status
                    category {
                        id
                        name
                    }
                    status
                    lastQuote{
                        total
                        id
                        status{
                          name
                          id
                        }
                        userCreate{
                        id
                        name
                        photo
                        role{
                            id
                            name
                        }
                        }

                    }
      tgl_reminder
                }
                    }}
          `
          }),
        }).then(function(response) {
          console.log(response)
            return response.json()
        }).then(function(text) {
          console.log(text)
            return text.data.projects.projects;
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

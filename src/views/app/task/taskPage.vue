<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="$t('menu.task')"
        :selectAll="selectAll"
        :isSelectedAll="isSelectedAll"
        :isAnyItemSelected="isAnyItemSelected"
        :keymap="keymap"
        :displayMode="displayMode"
        :dataClone="itemSClone"
        :changeOrderBy="changeOrderBy"
        :changePageSize="changePageSize"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="total"
        :perPage="perPage"
      >
      </list-page-heading>
      <b-row>
        <b-colxx xs="12" class="mb-3">
            <b-button v-b-modal.modalright2>Filter</b-button>
            <filter-task v-if="renderComponent" :dataComponent="itemsClone2" v-on:answers="onUpdateAnswer"></filter-task>
        </b-colxx>
      </b-row>
      <b-row>
          <b-colxx xs="12">
              <template v-if="isLoad">
              <list-page-listing
                :displayMode="displayMode"
                :items="items"
                :selectedItems="selectedItems"
                :toggleItem="toggleItem"
                :lastPage="lastPage"
                :perPage="perPage"
                :page="page"
                :changePage="changePage"

              ></list-page-listing>
            </template>
            <template v-else>
              <div class="loading"></div>
            </template>
          </b-colxx>
      </b-row>

    </b-colxx>
  </b-row>
</template>

<script>
import ListPageHeading from "../../../containers/list/ListPageHeading.vue";
import ListPageListing from "../../../containers/list/ListPageListing";
import FilterTask from "./modalFilterTask.vue";
import { mapGetters } from 'vuex';
import _ from "lodash";

export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    "filter-task" : FilterTask
  },
  data() {
    return {
      isLoad: false,

      displayMode: "list",
      sort: {
        column: "title",
        label: "Product Name"
      },
      page: 1,
      perPage: 5,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      itemSClone : [],
      selectedItems: [],
      itemsClone2 : [],
      renderComponent: true,
    };
  },
  methods: {
    loadItems(a) {
      
      this.isLoad = false;
      let bearer;
      if(a != ""){
        bearer = 'Bearer '+a;

      }else{
        bearer = 'Bearer '+this.currentUser.jwt;
      }
          fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : bearer
              },
              body: JSON.stringify({
                query: `
                    query{
                        tasks{
                          id
                          status
                          description
                          due_date
                          recurring
                          tags{
                            id
                            name
                          }
                          project{
                            id
                            name
                          }
                        }
                      }
            `
            }),
          }).then(function(response) {
              return response.json()
          }).then(function(text) {
              return text.data.tasks;
          })
          .then(resp => {
            this.perPage = 5;
            this.to = this.perPage;
            this.from = 1;
            //this.total = resp.length;
            this.selectedItems = [];
            for(let i=0; i<resp.length; i++){
              if(resp[i].status != 0){
                console.log(resp[i].id+""+resp[i].status)
                this.selectedItems.push(resp[i].id)
              }
            }
            
            this.itemSClone = resp;
            this.itemsClone2 = resp;
            // this.items =  _.slice(this.itemSClone, this.from-1, this.to);

            // let ctr = this.total/ this.perPage
            //  this.lastPage = ctr+1;

            // console.log(this.lastPage)
            this.changePageSize(this.perPage,this.itemSClone)

            this.isLoad = true
          });

    },

    changePageSize(perPage,arr) {
      console.log(arr)
      this.page = 1;
      this.total = arr.length
      this.perPage = perPage;
      this.to = this.perPage;
      if(this.to>this.total) this.to = this.total
      this.from = 1;
      this.items =  _.slice(arr, this.from-1, this.to);
      let ctr = this.total/ this.perPage
      this.lastPage = ctr+1;
      console.log(this.lastPage)
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      console.log(val)
      this.search = val;
      this.page = 1;
      this.items = this.itemsClone2.filter(row => {
        return row.description.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ;
      });

      console.log(this.items)
      this.itemSClone = this.items
      this.changePageSize(this.perPage,this.itemSClone)
      // this.to = this.perPage;
      // if(this.to>this.items.length) this.to = this.items.length
      // this.from = 1;
      // this.items =  _.slice(this.items, this.from-1, this.to);
      // let ctr = this.items.length/ this.perPage
      // this.lastPage = ctr+1;

    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.itemSClone.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.itemSClone.map(x => x.id);
      }
      console.log(this.selectedItems)
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    fetchUpdateStatus(id){
         fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
              },
              body: JSON.stringify({
                query: `
                   mutation{
                    doneUndoneTask(task_id : ${id}){
                      status
                      message
                    }
                  }
            `
            }),
          }).then(function(response) {
              console.log(response)
              return response.json()
          }).then(function(text) {
              console.log(text)
              return text.data.tasks;
          })
          .then(resp => {

          });

    },

    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.itemSClone;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
      this.fetchUpdateStatus(itemId)

    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    },
    changePage(pageNum) {
      console.log(pageNum)
      this.to = pageNum *this.perPage
      this.from = this.to- (this.perPage -1)
      if(this.to> this.itemSClone.length) this.to = this.itemSClone.length;
    //  this.from =pageNum*(Math.round(this.total/this.perPage));
     // this.from = pageNum * this.from

      this.page = pageNum;
      this.items =  _.slice(this.itemSClone,this.from-1, this.to)
    },
    onUpdateAnswer: function(newAnswer){
      let cek = false;

      if(newAnswer != null){
        cek = true;
        let status = null;
        let orderBy = newAnswer.sortBy;
        let order = newAnswer.sort.value;
        let arrTags =[];
        for(let i=0; i< newAnswer.selectedTags.length; i++){
          arrTags.push(newAnswer.selectedTags[i].id)
        }
        console.log(arrTags)
        console.log(order)
        console.log(newAnswer)
        if(newAnswer.checkedCheckboxes != -1) status = newAnswer.checkedCheckboxes;


        this.fetchWithFilter(order,orderBy, status, arrTags)
      }

      if(!cek){
        this.items = this.itemsClone2;
        this.itemSClone = this.itemsClone2;
        this.changePageSize(this.perPage,this.itemSClone)
      }

    },
    fetchWithFilter(order,orderBy,status, tags){

        let tg =  ` tags : [${tags}],`
        if(tags.length ==0){
          tg = ` tags :null ,`
        }
        let filter = `{
          status: ${status},
          ${tg}
          sort : "${orderBy}",
          sortType : "${order}"
        }`

        let querys =  `
                    query{
                        tasks(filter : ${filter}){
                          id
                          status
                          description
                          due_date
                          recurring
                          tags{
                            id
                            name
                          }
                          project{
                            id
                            name
                          }
                        }
                      }
            `
            console.log(querys)

         fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
              },
              body: JSON.stringify({
                query: querys
            }),
          }).then(function(response) {
              return response.json()
          }).then(function(text) {
              return text.data.tasks;
          })
          .then(resp => {
            this.perPage = 5;
            this.to = this.perPage;
            this.from = 1;
            //this.total = resp.length;
            this.selectedItems = [];
            for(let i=0; i<resp.length; i++){
              if(resp[i].status != 0){
                console.log(resp[i].id+""+resp[i].status)
                this.selectedItems.push(resp[i].id)
              }
            }
            this.itemSClone = resp;
          //  this.itemsClone2 = resp;
            // console.log(resp)
            // this.items =  _.slice(this.itemSClone, this.from-1, this.to);

            // let ctr = this.total/ this.perPage
            //  this.lastPage = ctr+1;

            // console.log(this.lastPage)
            this.changePageSize(this.perPage,this.itemSClone)
            this.isLoad = true
          });


    }
  },
  computed: {
    ...mapGetters({
        currentUser : "currentUser"
    }),
    isSelectedAll() {
      return this.selectedItems.length >= this.itemSClone.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.itemSClone.length
      );
    },

  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems("");
    }
  },
  mounted() {
    this.loadItems("");
  }
};
</script>

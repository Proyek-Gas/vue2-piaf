<template>
<div v-if="isLoad">
    <b-row>
        <b-colxx xxs="12">
            <h1>Scheme Detail</h1>
            <piaf-breadcrumb />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx md="12" sm="12" lg="12" xxs="12">
        <b-card class="mb-4 d-flex flex-row p-3" no-body>
            <div
                class="btn mb-1"
                style="width:20%; text-align :center"
                :style="returnColor(hex)">
                <label class="mt-2">{{ ind }}</label><br>
                <label class="mt-2">{{ eng }}</label>
            </div>
            <div class="d-flex flex-grow-1 min-width-zero ml-3">
              <div
                class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
              >
                <div class="min-width-zero">
                    <h6>
                        <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'" >In Progress</b-badge>
                    </h6>
                    <h6 class="mb-1 card-subtitle truncate">{{ detail.name }}</h6>
                  <p v-if="detail.notes != ''" class="text-muted text-small mb-2">{{ detail.notes }}</p>
                  <p v-else class="text-muted text-small mb-2" style="font-style: italic;">(Notes)</p>
                </div>
              </div>
            </div>
            <div class="top-right-button-container">
                <b-button
                    class="glyph-icon simple-icon-pencil"
                    v-b-modal.modalright
                    variant="warning"
                    size="sm"
                    @click="movePageEdit(schId)">
                </b-button>
                <b-button
                    class="glyph-icon simple-icon-trash ml-2"
                    v-b-modal.modalright
                    variant="danger"
                    size="sm"
                    v-b-modal.modalbasic>
                </b-button>
                <b-modal id="modalbasic" ref="modalbasic" title="Konfirmasi">
                    Anda yakin ingin menghapus scheme dengan judul {{ detail.name }} ?
                    <template slot="modal-footer">
                        <b-button variant="primary" @click="deleteSch(proId,'modalbasic')" class="mr-1">OK</b-button>
                        <b-button variant="danger" @click="hideModal('modalbasic')">Cancel</b-button>
                    </template>
                </b-modal>
            </div>
          </b-card>
        </b-colxx>
    </b-row>
    <b-row style="margin-bottom:2vh">
        <b-colxx xxs="12"  style="display:inline-block">
           <!-- <span class="mr-3 d-inline-block float-md-left">
            <a
              :class="{'mr-2 view-icon':true,'active':mode==='list'}"
              @click="changemode"
            >
              <data-list-icon />
            </a>

            <a
              :class="{'mr-2 view-icon':true,'active': mode==='card'}"
              @click="changemode"
            >
              <image-list-icon />
            </a>
          </span> -->
            <b-button @click="changemode" :class="{'btn' : true,'active' : mode=='card'}" variant="outline-primary">
              Card
            </b-button>
            <b-button @click="changemode" :class="{'btn' : true,'active' : mode=='list'}" variant="outline-primary">
              List
            </b-button>
        </b-colxx>
    </b-row>

    <detail-thumb v-if="mode == 'card'" :dataComponent='dataAll' :detail='detail' ></detail-thumb>
    <detail-list v-if="mode == 'list'" :dataComponent='dataAll' :detail='detail' ></detail-list>

</div>
</template>

<script>
import IconCard from '../../../../components/Cards/IconCard';
import vTableProject from '../../project/datatable/projectTable'
import vTableQuote from '../../quote/datatable/quoteTable'
import { mapGetters } from "vuex";
import Detail_thumb from './detail_thumb';
import Detail_list from './detail_list.vue';
import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon
} from "../../../../components/Svg"

export default {
    components: {
        'icon-card': IconCard,
        'table-project' : vTableProject,
        'table-quote' : vTableQuote,
        'detail-thumb' : Detail_thumb,
        "data-list-icon": DataListIcon,
        "thumb-list-icon": ThumbListIcon,
       "image-list-icon": ImageListIcon,
        'detail-list' : Detail_list
    },
    data() {
        return {
            isLoad: true,
            hex: "",
            ind:"",
            eng:"",
    	      detail: [],
            arrItem: [],
            mode : 'card',
            ctrLoad : 0,
            ctrLoadCompare:0,
            displaymode : 'thumb',
            dataAll : {
               dataUt: [],
              dataAg: [],
              dataTh: [],

            },
        }
    },
    methods: {
        movePageEdit(val){
            window.location = window.location.origin+"/app/datatable/schemeTable/sDetail/edit?id="+val;
        },
        deletePro(val,refname){
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
                        setTimeout(() => {
                            window.location = window.location.origin+"/app/datatable/schemeTable";
                        }, 1000);
                    }else{
                        this.$toast(resp.message, {
                            type: "error",
                            hideProgressBar: true,
                            timeout: 2000
                        });
                    }
            });
            this.hideModal(refname);
        },
        hideModal(refname){
            this.$refs[refname].hide()
        },
        returnColor(a){
            const style = {
                background: "#"+a
            }
            return style
        },
        changemode(){
            if(this.mode == 'card'){
              this.mode = 'list';
            }else{
              this.mode = 'card';
            }
        },
        dividedItems(arr){
            for (let i = 0; i < arr.length; i++) {
                fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+this.currentUser.jwt
                    },
                    body: JSON.stringify({
                        query: `
                            query{
                            itemDetail(item_id: ${arr[i].item_id}){
                                name
                                  detailSellingPrice{
                                    priceCategory{
                                      id
                                      name
                                    }
                                    price
                                  }
                                type{
                                id
                                name
                                }
                            }
                            }

                        `,
                    })
                    })
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(text) {
                        console.log(text.data);
                        return text.data.itemDetail;
                    })
                    .then(resp => {
                        arr[i].name = resp.name;
                        arr[i].detailSellingPrice = resp.detailSellingPrice;
                        if(resp.type.id == 1){
                            this.dataAll.dataUt.push(arr[i]);
                        }else if(resp.type.id == 2){
                            this.dataAll.dataAg.push(arr[i]);
                        }else{
                            this.dataAll.dataTh.push(arr[i]);
                        }
                        this.ctrLoad ++;
                    })
            }

        }
    },
    async mounted() {
        this.schId = this.$route.query.id;
        if(this.schId){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
            },
            body: JSON.stringify({
                query: `
                    query{
                        schemeDetail(scheme_id:${this.schId}){
                            id
                            name
                            notes
                            status
                            color{
                                id_ral
                                eng_name
                                hex_code
                                ind_name
                            }
                            items{
                            item_id
                            color{
                                id_ral
                                hex_code
                                ind_name
                                eng_name
                            }
                            coat
                            dry_film_thickness
                            loss
                            vs_volume_solid
                            }
                        }
                    }

                `,
            })
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                console.log(text.data);
                return text.data.schemeDetail;
            })
            .then(resp => {
                this.detail = resp
                if(this.detail == null){
                    console.log("masuk");
                    setTimeout(() => {
                        window.location = window.location.origin +"/error?id=404&name=scheme";
                    }, 50)
                }else{
                    this.isLoad = true;
                    this.hex = this.detail.color.hex_code;
                    this.ind = this.detail.color.ind_name;
                    this.eng = this.detail.color.eng_name;
                    this.arrItem = this.detail.items;
                    this.ctrLoadCompare = this.arrItem.length
                    this.dividedItems(this.arrItem);
                    if(!this.detail.notes){
                        this.detail.notes = '';
                    }
                    this.load = true
                }
            })
        }else{
            window.location = window.location.origin +"/error?id=404&name=scheme";
        }
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
    }
}
</script>

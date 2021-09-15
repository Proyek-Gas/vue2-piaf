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
    <b-row>
    <b-colxx class="text-center" xxs="12" lg="4">
        <h5 class="mb-2 card-title">Utama</h5>
        <div class="separator mb-5"></div>
        <div v-for="item in dataUt" :key="item.item_id">
            <b-card class="mb-4" no-body>
                <b-row>
                    <b-colxx class="text-center" xxs="6" lg="6">
                        <b-card-body class="text-left">
                        <p class="card-text text-muted text-small mb-4 font-weight-light">{{ item.item_id }}</p>
                            <h6 class="mb-5 card-subtitle">Harga item</h6>
                        </b-card-body>
                    </b-colxx>
                    <b-colxx class="text-center" xxs="6" lg="6">
                        <b-card-body class="text-left">
                            <p class="card-text text-muted text-small mb-4 font-weight-light">XXX/XXX</p>
                            <div
                                style="width:100%; text-align :center; color: black;"
                                :style="returnColor(item.color.hex_code)"
                                >
                                <label class="mt-2">{{ item.color.ind_name }}</label><br>
                            </div>
                        </b-card-body>
                    </b-colxx>
                </b-row>
                <b-card-title style="margin-top: -20px;">Nama item</b-card-title>
                <b-colxx xxs="12" lg="12">
                    <b-row>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Coat: {{ item.coat }}</b-badge>
                            </h6>
                        </b-colxx>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Dft: {{ item.dry_film_thickness }}</b-badge>
                            </h6>
                        </b-colxx>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Loss: {{ item.loss }}</b-badge>
                            </h6>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-card>
        </div>
    </b-colxx>
    <b-colxx class="text-center" xxs="12" lg="4">
        <h5 class="mb-2 card-title">Agent</h5>
        <div class="separator mb-5"></div>
            <div v-if="dataAg.length == 0" style="font-style: italic;">No Item</div>
            <div v-else v-for="item in dataAg" :key="item.item_id">
            <b-card class="mb-4" no-body>
                <b-row>
                    <b-colxx class="text-center" xxs="6" lg="6">
                        <b-card-body class="text-left">
                        <p class="card-text text-muted text-small mb-4 font-weight-light">{{ item.item_id }}</p>
                            <h6 class="mb-5 card-subtitle">Harga item</h6>
                        </b-card-body>
                    </b-colxx>
                    <b-colxx class="text-center" xxs="6" lg="6">
                        <b-card-body class="text-left">
                            <p class="card-text text-muted text-small mb-4 font-weight-light">XXX/XXX</p>
                            <div
                                style="width:100%; text-align :center; color: black;"
                                :style="returnColor(item.color.hex_code)"
                                >
                                <label class="mt-2">{{ item.color.ind_name }}</label><br>
                            </div>
                        </b-card-body>
                    </b-colxx>
                </b-row>
                <b-card-title style="margin-top: -20px;">Nama item</b-card-title>
                <b-colxx xxs="12" lg="12">
                    <b-row>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Coat: {{ item.coat }}</b-badge>
                            </h6>
                        </b-colxx>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Dft: {{ item.dry_film_thickness }}</b-badge>
                            </h6>
                        </b-colxx>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Loss: {{ item.loss }}</b-badge>
                            </h6>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-card>
        </div>
    </b-colxx>
    <b-colxx class="text-center" xxs="12" lg="4">
        <h5 class="mb-2 card-title">Thinner</h5>
        <div class="separator mb-5"></div>
            <div v-if="dataTh.length == 0" style="font-style: italic;">No Item</div>
            <div v-else v-for="item in dataTh" :key="item.item_id">
            <b-card class="mb-4" no-body>
                <b-row>
                    <b-colxx class="text-center" xxs="6" lg="6">
                        <b-card-body class="text-left">
                        <p class="card-text text-muted text-small mb-4 font-weight-light">{{ item.item_id }}</p>
                            <h6 class="mb-5 card-subtitle">Harga item</h6>
                        </b-card-body>
                    </b-colxx>
                    <b-colxx class="text-center" xxs="6" lg="6">
                        <b-card-body class="text-left">
                            <p class="card-text text-muted text-small mb-4 font-weight-light">XXX/XXX</p>
                            <div
                                style="width:100%; text-align :center; color: black;"
                                :style="returnColor(item.color.hex_code)"
                                >
                                <label class="mt-2">{{ item.color.ind_name }}</label><br>
                            </div>
                        </b-card-body>
                    </b-colxx>
                </b-row>
                <b-card-title style="margin-top: -20px;">Nama item</b-card-title>
                <b-colxx xxs="12" lg="12">
                    <b-row>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Coat: {{ item.coat }}</b-badge>
                            </h6>
                        </b-colxx>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Dft: {{ item.dry_film_thickness }}</b-badge>
                            </h6>
                        </b-colxx>
                        <b-colxx class="text-center" xxs="4" lg="4">
                            <h6>
                                <b-badge class="mb-2" pill :variant="detail.status === 1 ?  'success' : 'danger'">Loss: {{ item.loss }}</b-badge>
                            </h6>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-card>
        </div>
    </b-colxx>
    </b-row>
</div>
</template>

<script>
import IconCard from '../../../../components/Cards/IconCard';
import vTableProject from '../../project/datatable/projectTable'
import vTableQuote from '../../quote/datatable/quoteTable'
import { mapGetters } from "vuex";

export default {
    components: {
        'icon-card': IconCard,
        'table-project' : vTableProject,
        'table-quote' : vTableQuote
    },
    data() {
        return {
            isLoad: true,
            hex: "",
            ind:"",
            eng:"",
    	    detail: [],
            arrItem: [],
            dataUt: [],
            dataAg: [],
            dataTh: [],
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
                        if(resp.type.id == 1){
                            this.dataUt.push(arr[i]);
                        }else if(resp.type.id == 2){
                            this.dataAg.push(arr[i]);
                        }else{
                            this.dataTh.push(arr[i]);
                        }
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
                    this.dividedItems(this.arrItem);
                    if(!this.detail.notes){
                        this.detail.notes = '';
                    }
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

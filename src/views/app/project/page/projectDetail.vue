<template>
<div v-if="isLoad">
    <b-row>
        <b-colxx xxs="12">
            <h1>Project Detail</h1>
            <piaf-breadcrumb />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx xxs="12" xl="8" class="col-left">
            <b-row>
                <b-colxx md="6" sm="12" lg="6" xxs="12">
                <b-card class="mb-4 text-center" style="height: 265px;">
                        <img
                            src="/assets/img/profiles/l-1.jpg"
                            alt="Card image cap"
                            class="img-thumbnail list-thumbnail rounded-circle border-0 mb-4"
                        />
                        <h6 class="mb-1 card-subtitle">{{ namaCust }}</h6>
                        <p v-if="tlpCust != ''" class="text-muted text-small mb-2">{{ tlpCust }}</p>
                        <p v-else class="text-muted text-small mb-2" style="font-style: italic;">(Workphone)</p>
                        <p v-if="hpCust != ''" class="text-muted text-small mb-2">{{ hpCust }}</p>
                        <p v-else class="text-muted text-small mb-3" style="font-style: italic;">(Handphone)</p>
                    <h6>
                        <b-badge class="mb-4" pill variant="warning">{{ katCust.name }}</b-badge>
                        <b-badge class="mb-4" pill variant="secondary">{{ katHargaCust.name }}</b-badge>
                    </h6>
                </b-card>
                </b-colxx>
                <b-colxx xxs="12" sm="12" md="6" lg="6" class="mb-3">
                    <b-card class="mb-4" no-body>
                    <div class="m-3">
                    <b-nav pills class="justify-content-center">
                        <b-nav-item :active="period == 'M'" @click="handleClick('M')">Month</b-nav-item>
                        <b-nav-item :active="period == 'S'" @click="handleClick('S')">Semester</b-nav-item>
                        <b-nav-item :active="period == 'Y'" @click="handleClick('Y')">Year</b-nav-item>
                    </b-nav>
                    </div>
                    </b-card>
                    <b-row class="icon-cards-row mb-0">
                        <b-colxx xxs="6" sm="6" md="6" lg="6">
                        <b-card class="mb-0 text-center" style="height: 185px;">
                            <div v-if="performance.length == 0">
                                <b-row class="p-1">
                                    <b-colxx xxs="4" lg="4">
                                        <p class="text text-medium mb-2 mt-1 ml-1">-</p>
                                    </b-colxx>
                                    <b-colxx xxs="2" lg="2">

                                    </b-colxx>
                                    <b-colxx xxs="6" lg="6">
                                        <h6>
                                            <b-badge variant="primary" style="width: 90%;">Approved</b-badge>
                                        </h6>
                                    </b-colxx>
                                </b-row>
                                <b-row class="p-1">
                                    <b-colxx xxs="4" lg="4">
                                        <p class="text text-medium mb-2 mt-1 ml-1">-</p>
                                    </b-colxx>
                                    <b-colxx xxs="2" lg="2">

                                    </b-colxx>
                                    <b-colxx xxs="6" lg="6">
                                        <h6>
                                            <b-badge variant="success" style="width: 90%;">S O</b-badge>
                                        </h6>
                                    </b-colxx>
                                </b-row>
                            </div>
                            <div v-else>
                                <b-row class="p-1">
                                    <b-colxx xxs="4" lg="4">
                                        <p class="text text-medium mb-2 mt-1 ml-1">{{shortNumber(angkaRec[0])}}</p>
                                    </b-colxx>
                                    <b-colxx xxs="2" lg="2">
                                    <div v-if="arrow[0] == 2">
                                        <div class="simple-line mt-2">
                                            <div class="glyph">
                                                <div :class="'glyph-icon simple-icon-arrow-up'" style="color: green;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="arrow[0] == 1">
                                        <div class="simple-line mt-2">
                                            <div class="glyph">
                                                <div :class="'glyph-icon simple-icon-arrow-down'" style="color: red;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else></div>
                                    </b-colxx>
                                    <b-colxx xxs="6" lg="6">
                                        <h6>
                                            <b-badge variant="primary" style="width: 90%;">Approved</b-badge>
                                        </h6>
                                    </b-colxx>
                                </b-row>
                                <b-row class="p-1">
                                    <b-colxx xxs="4" lg="4">
                                        <p class="text text-medium mb-2 mt-1 ml-1">{{shortNumber(angkaRec[2])}}</p>
                                    </b-colxx>
                                    <b-colxx xxs="2" lg="2">
                                        <div v-if="arrow[2] == 2">
                                            <div class="simple-line mt-2">
                                                <div class="glyph">
                                                    <div :class="'glyph-icon simple-icon-arrow-up'" style="color: green;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="arrow[2] == 1">
                                            <div class="simple-line mt-2">
                                                <div class="glyph">
                                                    <div :class="'glyph-icon simple-icon-arrow-down'" style="color: red;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else></div>
                                    </b-colxx>
                                    <b-colxx xxs="6" lg="6">
                                        <h6>
                                            <b-badge variant="success" style="width: 90%;">S O</b-badge>
                                        </h6>
                                    </b-colxx>
                                </b-row>
                            </div>
                            <p class="text-center text-medium mb-2 mt-1">Values</p>
                        </b-card>
                        </b-colxx>
                        <b-colxx xxs="6" sm="6" md="6" lg="6">
                            <b-card class="mb-0 text-center" style="height: 185px;">
                                <div v-if="performance.length == 0">
                                    <b-row class="p-1">
                                        <b-colxx xxs="4" lg="4">
                                            <p class="text text-medium mb-2 mt-1 ml-1">-</p>
                                        </b-colxx>
                                        <b-colxx xxs="2" lg="2">

                                        </b-colxx>
                                        <b-colxx xxs="6" lg="6">
                                            <h6>
                                                <b-badge variant="primary" style="width: 90%;">Approved</b-badge>
                                            </h6>
                                        </b-colxx>
                                    </b-row>
                                    <b-row class="p-1">
                                        <b-colxx xxs="4" lg="4">
                                            <p class="text text-medium mb-2 mt-1 ml-1">-</p>
                                        </b-colxx>
                                        <b-colxx xxs="2" lg="2">

                                        </b-colxx>
                                        <b-colxx xxs="6" lg="6">
                                            <h6>
                                                <b-badge variant="success" style="width: 90%;">S O</b-badge>
                                            </h6>
                                        </b-colxx>
                                    </b-row>
                                </div>
                                <div v-else>
                                    <b-row class="p-1">
                                        <b-colxx xxs="4" lg="4">
                                            <p class="text text-medium mb-2 mt-1 ml-1">{{shortNumber(angkaRec[1])}}</p>
                                        </b-colxx>
                                        <b-colxx xxs="2" lg="2">
                                            <div v-if="arrow[1] == 2">
                                                <div class="simple-line mt-2">
                                                    <div class="glyph">
                                                        <div :class="'glyph-icon simple-icon-arrow-up'" style="color: green;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else-if="arrow[1] == 1">
                                                <div class="simple-line mt-2">
                                                    <div class="glyph">
                                                        <div :class="'glyph-icon simple-icon-arrow-down'" style="color: red;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else></div>
                                        </b-colxx>
                                        <b-colxx xxs="6" lg="6">
                                            <h6>
                                                <b-badge variant="primary" style="width: 90%;">Approved</b-badge>
                                            </h6>
                                        </b-colxx>
                                    </b-row>
                                    <b-row class="p-1">
                                        <b-colxx xxs="4" lg="4">
                                            <p class="text text-medium mb-2 mt-1 ml-1">{{shortNumber(angkaRec[3])}}</p>
                                        </b-colxx>
                                        <b-colxx xxs="2" lg="2">
                                            <div v-if="arrow[3] == 2">
                                                <div class="simple-line mt-2">
                                                    <div class="glyph">
                                                        <div :class="'glyph-icon simple-icon-arrow-up'" style="color: green;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else-if="arrow[3] == 1">
                                                <div class="simple-line mt-2">
                                                    <div class="glyph">
                                                        <div :class="'glyph-icon simple-icon-arrow-down'" style="color: red;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else></div>
                                        </b-colxx>
                                        <b-colxx xxs="6" lg="6">
                                            <h6>
                                                <b-badge variant="success" style="width: 90%;">S O</b-badge>
                                            </h6>
                                        </b-colxx>
                                    </b-row>
                                </div>
                                <p class="text-center text-medium mb-2 mt-1">Quotes</p>
                            </b-card>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-row>
            <b-card class="mb-4" no-body>
                <b-tabs card no-fade>
                    <b-tab :title="$t('menu.quoteTable')" active>
                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                    <table-quote></table-quote>
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                    <b-tab :title="`${$t('pages.comments-title')} (19)`">

                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                    <b-tab :title="`${$t('pages.questions-title')} (6)`">
                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-colxx>
        <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4">
                <b-card-title class="mb-5">Details
                <div class="top-right-button-container">
                    <b-button
                        class="glyph-icon simple-icon-pencil"
                        variant="warning"
                        size="sm"
                        @click="movePageEdit(proId)">
                    </b-button>
                    <b-button
                        class="glyph-icon simple-icon-trash"
                        variant="danger"
                        size="sm"
                        v-b-modal.modalbasic>
                    </b-button>
                    <b-modal id="modalbasic" ref="modalbasic" title="Konfirmasi">
                        Anda yakin ingin menghapus project dengan judul {{ detail.name }} ?
                        <template slot="modal-footer">
                            <b-button variant="primary" @click="deletePro(proId,'modalbasic')" class="mr-1">OK</b-button>
                            <b-button variant="danger" @click="hideModal('modalbasic')">Cancel</b-button>
                        </template>
                    </b-modal>
                </div>
                </b-card-title>
                <b-card-title>{{ detail.name }}</b-card-title>
                <h6>
                    <b-badge class="mb-4" pill variant="success">{{ katPro }}</b-badge>
                </h6>
                <p class="text text-medium mb-4" v-if="detail.tgl_reminder != ''">{{ detail.tgl_reminder }}</p>
                <p class="text text-medium mb-4" style="font-style:italic;" v-else>No date selected</p>
                <b-card-title class="mb-3">Kategori Area</b-card-title>
                <b-row>
                    <b-colxx xxs="12" xl="12">
                        <div v-if="katArea.length > 0">
                            <div v-for="area in katArea" :key="area.id">
                                <h6>
                                    <b-badge class="mb-0" pill variant="secondary" style="width: 50%;">{{ area.name }}</b-badge>
                                </h6>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text text-medium mb-4" style="font-style:italic;">No data of area categories</p>
                        </div>
                    </b-colxx>
                </b-row>
            </b-card>
        </b-colxx>
    </b-row>
</div>
</template>

<script>
import IconCard from '../../../../components/Cards/IconCard';
import {mapGetters} from 'vuex'
import vTableQuote from '../../quote/datatable/quoteTable'

export default {
    components: {
        'icon-card': IconCard,
        'table-quote' : vTableQuote
    },
    computed :{
      ...mapGetters({
        currentUser: "currentUser",
      })
    },
    data() {
        return {
            isLoad: false,
            custId: 0,
            proId: 0,
			period: '',
			detail: [],
            katArea: [],
            katCust: "",
            katHargaCust: "",
            namaCust: '',
            tlpCust: '',
            hpCust: '',
            katPro: '',
			performance: [],
			recent:[],
			previous:[],
			angkaRec:[],
			angkaPre:[],
			arrow:[]
        }
    },
    methods: {
        movePageEdit(val){
            window.location = window.location.origin+"/app/datatable/projectTable/pDetail/edit?id="+val;
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
                        setTimeout(() => {
                            window.location = window.location.origin+"/app/datatable/projectTable";
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
        handleClick(n){
            this.period = n;
            this.recent = [];
			this.previous = [];
			this.angkaRec = [];
			this.angkaPre = [];
			this.arrow = [];
            this.fetching();
        },
        shortNumber(n) {
			if (n < 1e3) return n;
			else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
			else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
			else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
			else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
    	},
        fetching(){
			fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
            'Authorization' :'Bearer '+this.currentUser.jwt
			},
			body: JSON.stringify({
				query: `
					query{ performanceQuotesProject(project_id:${this.$route.query.id} period:"${this.period}") {
						value
						quote
						period
						type
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
				if(text.data.performanceQuotesProject == null){
					return null;
				}
				return text.data.performanceQuotesProject;
			})
			.then(resp => {
				this.performance = resp
                if(resp == null){
                    this.performance = [];
                }else{
				if(this.performance.length > 0){
					this.performance.forEach(element => {
						if(element.period == "Recent"){
							this.recent.push(element);
						}else{
							this.previous.push(element);
						}
					});
				}
				console.log("Recent: "+this.recent.length);
				console.log("Previous: "+this.previous.length);
				if(this.recent.length > 0){
					for (let i = 0; i < this.recent.length; i++) {
						if(this.recent.length == 1){
							if(this.recent[0].type == 3){
								//Recent approve
								this.angkaRec.push(this.recent[i].value);
								this.angkaRec.push(this.recent[i].quote);
								this.angkaRec.push(0);
								this.angkaRec.push(0);
							}else{
								//Recent so
								this.angkaRec.push(0);
								this.angkaRec.push(0);
								this.angkaRec.push(this.recent[i].value);
								this.angkaRec.push(this.recent[i].quote);
							}
						}else{
							if(this.recent[i].type == 3){
								//Recent approve
								this.angkaRec.push(this.recent[i].value);
								this.angkaRec.push(this.recent[i].quote);
							}else{
								//Recent So
								this.angkaRec.push(this.recent[i].value);
								this.angkaRec.push(this.recent[i].quote);
							}
						}
					}

					if(this.previous.length == 0){
                        if(this.recent[0].type == 7){
                            for (let i = 0; i < 2; i++) {
                                this.arrow.push(0);
                                this.angkaPre.push(0);
                            }
                            for (let i = 0; i < this.recent.length; i++) {
                                console.log(this.recent[i].value);
                                console.log(this.recent[i].quote);
                                if(this.recent[i].value > 0 || this.recent[i].quote > 0){
                                    this.arrow.push(2);
                                }else{
                                    this.arrow.push(0);
                                }
                                if(this.recent[i].quote > 0){
                                    this.arrow.push(2);
                                }else{
                                    this.arrow.push(0);
                                }
                            }
                        }else{
                            let ctr = 0;
                            for (let i = 0; i < this.recent.length; i++) {
                                console.log(this.recent[i].value);
                                console.log(this.recent[i].quote);
                                if(this.recent[i].value > 0 ){
                                    this.arrow.push(2);
                                    ctr++;
                                }else{
                                    this.arrow.push(0);
                                }
                                if(this.recent[i].quote > 0){
                                    this.arrow.push(2);
                                    ctr++;
                                }else{
                                    this.arrow.push(0);
                                }
                            }
                            for (let i = 0; i < 4-ctr; i++) {
                                this.arrow.push(0);
                                this.angkaPre.push(0);
                            }
                        }
					}else{
						for (let j = 0; j < this.previous.length; j++) {
                            if(this.previous.length == 1){
                                if(this.previous[0].type == 3){
                                    //Recent approve
                                    this.angkaPre.push(this.previous[j].value);
                                    this.angkaPre.push(this.previous[j].quote);
                                    this.angkaPre.push(0);
                                    this.angkaPre.push(0);
                                }else{
                                    //Recent so
                                    this.angkaPre.push(0);
                                    this.angkaPre.push(0);
                                    this.angkaPre.push(this.previous[j].value);
                                    this.angkaPre.push(this.previous[j].quote);
                                }
                            }else{
                                if(this.previous[j].type == 3){
                                    //Recent approve
                                    this.angkaPre.push(this.previous[j].value);
                                    this.angkaPre.push(this.previous[j].quote);
                                }else{
                                    //Recent So
                                    this.angkaPre.push(this.previous[j].value);
                                    this.angkaPre.push(this.previous[j].quote);
                                }
                            }
						}
						this.perbandingan(this.angkaRec, this.angkaPre);
					}
				}else if(this.recent.length == 0){
					if(this.previous[0].type == 7){
                        for (let i = 0; i < 2; i++) {
                            this.arrow.push(0);
                            this.angkaRec.push(0);
                        }
                        for (let i = 0; i < this.previous.length; i++) {
                            if(this.previous[i].value > 0){
                                this.arrow.push(2);
                            }else{
                                this.arrow.push(0);
                            }
                            if(this.previous[i].quote > 0){
                                this.arrow.push(2);
                            }else{
                                this.arrow.push(0);
                            }
                        }
                    }else{
                        let ctr = 0;
                        for (let i = 0; i < this.previous.length; i++) {
                            if(this.previous[i].value > 0 ){
                                this.arrow.push(2);
                                ctr++;
                            }else{
                                this.arrow.push(0);
                            }
                            if(this.previous[i].quote > 0){
                                this.arrow.push(2);
                                ctr++;
                            }else{
                                this.arrow.push(0);
                            }
                        }
                        for (let i = 0; i < 4-ctr; i++) {
                            this.arrow.push(0);
                            this.angkaRec.push(0);
                        }
                    }
				}
                }
			})
		},
		perbandingan(arr1, arr2){
            console.log("perbandingan");
			for (let i = 0; i < 4; i++) {
				if(arr1[i] > arr2[i]){
					this.arrow.push(2);
				}else if(arr1[i] < arr2[i]){
					this.arrow.push(1);
				}else{
					this.arrow.push(0);
				}
			}
            console.log(arr1);
            console.log(arr2);
		}
    },
    async mounted() {
        this.proId = this.$route.query.id;
        if(this.proId){
        this.period = 'M';
		fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
        'Authorization' :'Bearer '+this.currentUser.jwt
		},
		body: JSON.stringify({
			query: `
				query{
					projectDetail(project_id:${this.proId}){
						name
						customer{
                            id
                            name
                            workPhone
                            category{
                                name
                            }
                            priceCategory{
                                name
                            }
						}
						category{
                            id
                            name
						}
						areaCategories{
						    name
						}
						tgl_reminder
					}
				}
			`,
		})
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(text) {
            return text.data.projectDetail;
		})
		.then(resp => {
            this.detail = resp;
            console.log(this.detail);
			if(this.detail == null){
				window.location = window.location.origin +"/error?id=404&name=project";
			}else{
                this.isLoad = true;
				this.custId = this.detail.customer.id;
				this.namaCust = this.detail.customer.name;
                this.katPro = this.detail.category.name;
                this.katArea = this.detail.areaCategories;
                if(!this.detail.tgl_reminder || !this.detail.customer.workPhone || !this.detail.customer.mobilePhone){
                    this.detail.tgl_reminder = '';
                    this.detail.workPhone = '';
                    this.detail.mobilePhone = '';
                }else{
                    this.tlpCust = this.detail.customer.workPhone;
                    this.hpCust = this.detail.customer.mobilePhone;
                }
                if(!this.detail.customer.category){
                    this.katCust = '';
                }else{
                    this.katCust = this.detail.customer.category;
                }
                this.katHargaCust = this.detail.customer.priceCategory;
                console.log(this.detail);
                this.fetching();
			}
		})
        }else{
            window.location = window.location.origin +"/error?id=404&name=project";
        }

    }
}
</script>

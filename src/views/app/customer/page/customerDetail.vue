<template>
<div v-if="isLoad">
    <b-row>
        <b-colxx xxs="12">
            <h1>Customer Detail</h1>
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
                    <h6 class="mb-1 card-subtitle">{{ detail.name }}</h6>
                        <p v-if="detail.workPhone != ''" class="text-muted text-small mb-2">{{ detail.workPhone }}</p>
                        <p v-else class="text-muted text-small mb-2" style="font-style: italic;">(Workphone)</p>
                        <p v-if="detail.mobilePhone != ''" class="text-muted text-small mb-2">{{ detail.mobilePhone }}</p>
                        <p v-else class="text-muted text-small mb-3" style="font-style: italic;">(Handphone)</p>
                    <h6>
                        <b-badge class="mb-4" pill variant="warning">{{ katCust }}</b-badge>
                        <b-badge class="mb-4" pill variant="secondary">{{ katHargaCust }}</b-badge>
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
                    <b-tab :title="$t('menu.projectTable')" active>
                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                    <table-project></table-project>
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                    <b-tab :title="$t('menu.quoteTable')">

                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
                                    <table-quote></table-quote>
                                </b-card-text>
                            </b-colxx>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-colxx>
        <b-colxx xxs="12" xl="4" class="col-right">
            <b-card class="mb-4">
                <b-card-title>Details
                <div class="top-right-button-container">
                    <b-button
                        class="glyph-icon simple-icon-pencil"
                        v-b-modal.modalright
                        variant="warning"
                        size="sm"
                        @click="movePageEdit(custId)">
                    </b-button>
                </div>
                </b-card-title>
                <p class="text text-medium mb-2">ID Pelanggan</p>
                <p class="mb-3">{{ custId }}</p>
                <p class="text text-medium mb-2">Email</p>
                <p v-if="detail.email != ''" class="mb-3">{{ detail.email }}</p>
                <p v-else class="text-muted mb-3" style="font-style: italic;">No data</p>
                <p class="text text-medium mb-2">Alamat</p>
                <p class="mb-3">{{ detail.billStreet }}</p>
                <p class="text text-medium mb-2">Limit</p>
                <p class="mb-3">{{ shortNumber(detail.customerLimitAmountValue) }}</p>
                <p class="text text-medium mb-2">NPWP</p>
                <p class="mb-3">{{ detail.npwpNo }}</p>
            </b-card>
        </b-colxx>
    </b-row>
</div>
</template>

<script>
import IconCard from '../../../../components/Cards/IconCard';
import vTableProject from '../../project/datatable/projectTable'
import vTableQuote from '../../quote/datatable/quoteTable'
import {mapGetters} from 'vuex'

export default {
    components: {
        'icon-card': IconCard,
        'table-project' : vTableProject,
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
			period: '',
			detail: [],
			katCust: "",
			katHargaCust: "",
            period: '',
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
            window.location = window.location.origin+"/app/datatable/customerTable/cDetail/edit?id="+val;
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
					query{ performanceQuotesCustomer(project_id:"${this.$route.query.id}" period:"${this.period}") {
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
				if(text.data.performanceQuotesCustomer == null){
					return null;
				}
				return text.data.performanceQuotesCustomer;
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
        shortNumber(n) {
            if (n < 1e3) return n;
            else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
            else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
            else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
            else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
        },
		perbandingan(arr1, arr2){
			for (let i = 0; i < 4; i++) {
				if(arr1[i] > arr2[i]){
					this.arrow.push(2);
				}else if(arr1[i] < arr2[i]){
					this.arrow.push(1);
				}else{
					this.arrow.push(0);
				}
			}
		}
    },
    async mounted() {
        this.custId = this.$route.query.id;
		this.period = 'M';
		fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
        'Authorization' :'Bearer '+this.currentUser.jwt
		},
		body: JSON.stringify({
			query: `
				query{ customerDetail(customer_id:"${this.custId}") {
				name
				email
				npwpNo
				billStreet
                workPhone
                mobilePhone
				category{
					name
				}
				priceCategory{
					name
				}
				customerLimitAmountValue
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
			return text.data.customerDetail;
		})
		.then(resp => {
			this.detail = resp
			if(this.detail == null){
                console.log("masuk");
                setTimeout(() => {
                    window.location = window.location.origin +"/error?id=404&name=customer";
                }, 50)
			}else{
                this.isLoad = true;
				console.log(this.detail.name);
				this.nama = this.detail.name;
				this.katCust = this.detail.category.name;
				this.katHargaCust = this.detail.priceCategory.name;
                if(!this.detail.email || !this.detail.workPhone || !this.detail.mobilePhone){
                    this.detail.email = '';
                    this.detail.workPhone = '';
                    this.detail.mobilePhone = '';
                }
                this.fetching();
			}
		})
    }
}
</script>

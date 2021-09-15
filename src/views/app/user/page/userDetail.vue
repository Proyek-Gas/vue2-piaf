<template>
<div v-if="isLoad">
    <b-row>
        <b-colxx xxs="12">
            <h1>User Detail</h1>
            <piaf-breadcrumb />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx xxs="12" xl="8" class="col-left">
            <b-row>
                <b-colxx md="6" sm="12" lg="4" xxs="12">
                <b-card class="mb-4 text-center" style="height: 265px;">
                    <img
                        src="/assets/img/profiles/l-1.jpg"
                        alt="Card image cap"
                        class="img-thumbnail list-thumbnail rounded-circle border-0 mb-4"
                    />
                    <h6 class="mb-1 card-subtitle">Nama User</h6>
                    
                </b-card>
                </b-colxx>
                <b-colxx xxs="12" sm="12" md="6" lg="8" class="mb-3">
                    <b-card class="mb-4" no-body>
                    <div class="m-3">
                    <b-nav pills class="justify-content-center">
                        <b-nav-item active>Liter</b-nav-item>
                        <b-nav-item>Rupiah</b-nav-item>
                    </b-nav>
                    </div>
                    </b-card>
                    <b-row class="icon-cards-row mb-0">
                        <b-colxx xxs="12" sm="12" md="12" lg="12">
                        <b-card class="mb-0 text-center" style="height: 185px;">
                            
                        </b-card>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-row>
            <b-card class="mb-4" no-body>
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
                        >
                    </b-button>
                </div>
                </b-card-title>
                <p class="text text-medium mb-2">ID Pelanggan</p>
                <p class="mb-3">ID Pelanggan</p>        
                <b-form-input type="text" disabled/>
            </b-card>
        </b-colxx>
    </b-row>
</div>
</template>

<script>
import IconCard from '../../../../components/Cards/IconCard';
import {mapGetters} from 'vuex'

export default {
    components: {
        'icon-card': IconCard,
    },
    computed :{
      ...mapGetters({
        currentUser: "currentUser",
      })
    },
    data() {
        return {
            isLoad: false,
            userId: ""
        }
    },
    methods: {
        
    },
    async mounted() {
        this.userId = this.$route.query.id;
        console.log(this.userId);
        // fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
		// 	method: 'POST',
		// 	headers: {
		// 	'Content-Type': 'application/json',
        //     'Authorization' :'Bearer '+this.currentUser.jwt
		// 	},
		// 	body: JSON.stringify({
		// 		query: `
		// 			query{
        //                 users(filter:{
        //                     id: ${this.userId}
        //                 }){
        //                     count
        //                     users{
        //                     id
        //                     name
        //                     email
        //                     }
        //                 }
        //             }
		// 		`,
		// 	}),
		// })
		// .then(function(response) {
		// 	return response.json()
		// })
		// .then(function(text) {
		// 	return text.data.users.users;
		// })
		// .then(resp => {
        //     this.detail = resp
        //     console.log(this.detail);
        //     this.nama = this.detail[0].name;
        //     this.isLoad = true;
		// })
        this.isLoad = true;
    }
}
</script>

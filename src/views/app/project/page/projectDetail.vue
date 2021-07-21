<template>
<div v-if="isLoad">
    <b-row>
        <b-colxx xxs="12">
            <h1>Project Detail</h1>
            <div class="top-right-button-container">
                <b-dropdown id="ddown5" :text="$t('pages.actions')" size="lg" variant="outline-primary" class="top-right-button top-right-button-single" no-fade="true">
                    <b-dropdown-header>{{ $t('pages.header') }}</b-dropdown-header>
                    <b-dropdown-item>{{ $t('pages.delete') }}</b-dropdown-item>
                    <b-dropdown-item>{{ $t('pages.another-action') }}</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>{{ $t('pages.another-action') }}</b-dropdown-item>
                </b-dropdown>
            </div>
            <piaf-breadcrumb />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx xxs="12" xl="8" class="col-left">
            <b-row>
                <b-colxx md="6" sm="12" lg="6" xxs="12">
                <b-card class="mb-4 text-center">
                    <router-link to="?">
                        <img
                            src="/assets/img/profiles/l-1.jpg"
                            alt="Card image cap"
                            class="img-thumbnail list-thumbnail rounded-circle border-0 mb-4"
                        />
                        <h6 class="mb-1 card-subtitle">{{ namaCust }}</h6>
                        <p class="text-muted text-small mb-4">{{ tlpCust }}</p>
                    </router-link>
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
                            <table style="width: 100%;">
                                <div v-if="performance.length == 0" class="mb-2">
                                    <center>
                                    <tr>
                                        <td><span class="w-25px" style="font-style: italic;">-</span></td>
                                        <td>
                                            <span class="svg-icon svg-icon-3 svg-icon-success">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                </svg>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="primary">Approved</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span class="w-25px" style="font-style: italic;">-</span></td>
                                        <td> 
                                            <span class="svg-icon svg-icon-3 svg-icon-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                </svg>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="success" style="width: 100%">S O</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    </center>
                                </div>
                                <div v-else class="mb-2">
                                    <center>
                                    <tr>
                                        <td><span class="w-25px">{{shortNumber(angkaRec[0])}}</span></td>
                                        <td>
                                            <span>
                                                <span v-if="arrow[0] == 1" class="svg-icon svg-icon-3 svg-icon-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L11.2928932,11.2928932 C11.6714722,10.9143143 12.2810586,10.9010687 12.6757246,11.2628459 L18.6757246,16.7628459 C19.0828436,17.1360383 19.1103465,17.7686056 18.7371541,18.1757246 C18.3639617,18.5828436 17.7313944,18.6103465 17.3242754,18.2371541 L12.0300757,13.3841378 L6.70710678,18.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 14.999999) scale(1, -1) translate(-12.000003, -14.999999) "></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                                <span v-if="arrow[0] == 2" class="svg-icon svg-icon-3 svg-icon-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero"></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="primary">Approved</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span class="w-25px">{{angkaRec[2]}}</span></td>
                                        <td> 
                                            <span>
                                                <span v-if="arrow[2] == 1" class="svg-icon svg-icon-3 svg-icon-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L11.2928932,11.2928932 C11.6714722,10.9143143 12.2810586,10.9010687 12.6757246,11.2628459 L18.6757246,16.7628459 C19.0828436,17.1360383 19.1103465,17.7686056 18.7371541,18.1757246 C18.3639617,18.5828436 17.7313944,18.6103465 17.3242754,18.2371541 L12.0300757,13.3841378 L6.70710678,18.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 14.999999) scale(1, -1) translate(-12.000003, -14.999999) "></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                                <span v-if="arrow[2] == 2" class="svg-icon svg-icon-3 svg-icon-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero"></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="success" style="width: 100%">S O</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    </center>
                                </div>
                                <tr>
                                    <td colspan="3" class="font-weight-bold" >
                                    <center>Value</center>
                                    </td>      
                                </tr>												
                            </table> 
                        </b-card>
                        
                        </b-colxx>

                        <b-colxx xxs="6" sm="6" md="6" lg="6">
                        <b-card class="mb-0 text-center" style="height: 185px;">
                            <table style="width: 100%;">    
                                <div v-if="performance.length == 0" class="mb-2">
                                    <center>
                                    <tr>
                                        <td><span class="w-25px" style="font-style: italic;">-</span></td>
                                        <td>
                                            <span class="svg-icon svg-icon-3 svg-icon-success">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                </svg>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="primary">Approved</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span class="w-25px" style="font-style: italic;">-</span></td>
                                        <td> 
                                            <span class="svg-icon svg-icon-3 svg-icon-danger">
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                </svg>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="success" style="width: 100%">S O</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    </center>
                                </div>    
                                <div v-else class="mb-2">
                                    <center>
                                    <tr>
                                        <td><span class="w-25px">{{shortNumber(angkaRec[1])}}</span></td>
                                        <td>
                                            <span>
                                                <span v-if="arrow[1] == 1" class="svg-icon svg-icon-3 svg-icon-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L11.2928932,11.2928932 C11.6714722,10.9143143 12.2810586,10.9010687 12.6757246,11.2628459 L18.6757246,16.7628459 C19.0828436,17.1360383 19.1103465,17.7686056 18.7371541,18.1757246 C18.3639617,18.5828436 17.7313944,18.6103465 17.3242754,18.2371541 L12.0300757,13.3841378 L6.70710678,18.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 14.999999) scale(1, -1) translate(-12.000003, -14.999999) "></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                                <span v-if="arrow[1] == 2" class="svg-icon svg-icon-3 svg-icon-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero"></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="primary">Approved</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span class="w-25px">{{angkaRec[3]}}</span></td>
                                        <td> 
                                            <span>
                                                <span v-if="arrow[3] == 1" class="svg-icon svg-icon-3 svg-icon-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-down" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L11.2928932,11.2928932 C11.6714722,10.9143143 12.2810586,10.9010687 12.6757246,11.2628459 L18.6757246,16.7628459 C19.0828436,17.1360383 19.1103465,17.7686056 18.7371541,18.1757246 C18.3639617,18.5828436 17.7313944,18.6103465 17.3242754,18.2371541 L12.0300757,13.3841378 L6.70710678,18.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 14.999999) scale(1, -1) translate(-12.000003, -14.999999) "></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                                <span v-if="arrow[3] == 2" class="svg-icon svg-icon-3 svg-icon-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g id="Stockholm-icons-/-Navigation-/-Arrow-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                                            <rect id="Rectangle" fill="#000000" opacity="0.5" x="11" y="5" width="2" height="14" rx="1"></rect>
                                                            <path d="M6.70710678,12.7071068 C6.31658249,13.0976311 5.68341751,13.0976311 5.29289322,12.7071068 C4.90236893,12.3165825 4.90236893,11.6834175 5.29289322,11.2928932 L11.2928932,5.29289322 C11.6714722,4.91431428 12.2810586,4.90106866 12.6757246,5.26284586 L18.6757246,10.7628459 C19.0828436,11.1360383 19.1103465,11.7686056 18.7371541,12.1757246 C18.3639617,12.5828436 17.7313944,12.6103465 17.3242754,12.2371541 L12.0300757,7.38413782 L6.70710678,12.7071068 Z" id="Path-94" fill="#000000" fill-rule="nonzero"></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <h6>
                                                <b-badge variant="success" style="width: 100%">S O</b-badge>
                                            </h6>
                                        </td>
                                    </tr>
                                    </center>
                                </div>                              
                                <tr>
                                    <td colspan="3" class="font-weight-bold">
                                    <center>Quotes</center>
                                    </td>      
                                </tr>
                            </table>
                        </b-card>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-row>
            <b-card class="mb-4" no-body>
                <b-tabs card no-fade>
                    <b-tab :title="$t('pages.details-title')" active>
                        <b-row>
                            <b-colxx sm="12">
                                <b-card-text>
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
                        v-b-modal.modalright
                        variant="warning"
                        size="sm"
                        @click="movePageEdit(proId)">
                    </b-button>
                    <b-button
                        class="glyph-icon simple-icon-trash"
                        v-b-modal.modalright
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
                            <div v-for="area in katArea" :key="area">
                                <h6>
                                    <b-badge class="mb-0" pill variant="secondary">{{ area }}</b-badge> 
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

export default {
    components: {
        'icon-card': IconCard
    },
    data() {
        return {
            isLoad: false,
            custId: 0,
            proId: 0,
			period: '',
			detail: [],
            katArea: [],
            namaCust: '',
            tlpCust: '',
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
			},
			body: JSON.stringify({
				query: `
					query{ performanceQuotesCustomer(customer_id:"${this.$route.query.id}" period:"${this.period}") {
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
				console.log("fetch"+this.performance.length);
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
					console.log("masuk");
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
						let ctr = 0;
						for (let i = 0; i < this.recent.length; i++) {
							if(this.recent[i].value > 0 ){
								this.arrow.push(2);
								ctr++;
							}
							if(this.recent[i].quote > 0){
								this.arrow.push(2);
								ctr++;
							}
						}
						for (let i = 0; i < 4-ctr; i++) {
							this.arrow.push(0);
							this.angkaPre.push(0);
						}	
					}else{
						for (let j = 0; j < this.previous.length; j++) {
							if(this.previous[j].type == 3){
								//Previous approve
								this.angkaPre.push(this.previous[j].value);
								this.angkaPre.push(this.previous[j].quote);
							}else{
								//Previous So
								this.angkaPre.push(this.previous[j].value);
								this.angkaPre.push(this.previous[j].quote);
							}
						}
						this.perbandingan(this.angkaRec, this.angkaPre);
					}
				}else if(this.recent.length == 0){
					console.log("masuk2");
					let ctr = 0;
					for (let i = 0; i < this.previous.length; i++) {
						if(this.previous[i].value > 0 ){
							this.arrow.push(1);
							this.angkaRec.push(0);
							ctr++;
						}
						if(this.previous[i].quote > 0){
							this.arrow.push(1);
							this.angkaRec.push(0);
							ctr++;
						}
					}
					for (let i = 0; i < 4-ctr; i++) {
						this.arrow.push(0);
						this.angkaRec.push(0);
					}	
				}
			})
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
        this.proId = this.$route.query.id;
        console.log(this.proId);
        if(this.proId){
        this.period = 'M';
		fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
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
            console.log(resp);
			if(this.detail == null){
				window.location = window.location.origin +"/error?id=404&name=project";
			}else{
                this.isLoad = true;
				this.katCust = this.detail.customer.category.name;
				this.katHargaCust = this.detail.customer.priceCategory.name;
				this.custId = this.detail.customer.id;
				this.namaCust = this.detail.customer.name;
                this.tlpCust = this.detail.customer.workPhone;
                this.katPro = this.detail.category.name;
                this.katArea = this.detail.areaCategories;
                if(!this.detail.tgl_reminder){
                    this.detail.tgl_reminder = '';
                }
                this.fetching();
			}
		})
        }else{
            window.location = window.location.origin +"/error?id=404&name=project";
        }

    }
}
</script>

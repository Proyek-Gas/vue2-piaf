<template>
<div v-if="isLoad">
    <div>
        <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="false"
            :preview-modal="true"
            :paginate-elements-by-height="1400"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            pdf-orientation="landscape"
            pdf-content-width="100%"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="html2Pdf"
        >
            <section slot="pdf-content">
                <b-row>
                    <b-colxx xxs="12">
                        <h1>Detail Quote</h1>
                        <piaf-breadcrumb />
                        <div class="separator mb-5"></div>
                    </b-colxx>
                    <b-colxx xxs="12" xl="8">
                        <b-row>
                            <b-colxx xxs="6" xl="6">
                                <h1>Logo dan <br> profil perusahaan</h1>
                            </b-colxx>
                            <b-colxx xxs="6" xl="6" class="mb-3">
                                <b-row>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                    <p class="text text-medium mt-1">
                                        Quote
                                    </p>
                                    </b-colxx>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                    <p class="text text-medium mt-1">
                                        {{ quote }}
                                    </p>
                                    </b-colxx>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                    <p class="text text-medium mt-1">
                                        Tanggal
                                    </p>
                                    </b-colxx>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                    <p class="text text-medium mt-1">
                                        {{ dateFormat(tglQuote) }}
                                    </p>
                                    </b-colxx>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                    <p class="text text-medium mt-1">
                                        Berlaku sampai
                                    </p>
                                    </b-colxx>
                                    <b-colxx xxs="6" xl="6" class="text-left">
                                    <p class="text text-medium mt-1">
                                        {{ dateFormat(tglUntil) }}
                                    </p>
                                    </b-colxx>
                                </b-row>
                            </b-colxx>
                        </b-row>
                        <div class="separator mb-5"></div>
                        <b-row>
                            <b-colxx xxs="12" xl="6">
                            <b-form class="av-tooltip tooltip-label-right">
                                <b-card class="mb-4" title="Customer">
                                    <b-card class="mb-0" title="Data Customer">
                                        <h6 class="text-muted text-medium mb-1">
                                            {{ custNama }}
                                        </h6>
                                        <p class="text-muted text-small mb-2">
                                            {{ custEmail }}
                                        </p>
                                        <p class="text-muted text-small mb-2">
                                            {{ custCate }}
                                        </p>
                                        <div class="text-right" v-if="custId != ''">
                                            <b-button class="mb-1" variant="primary " :to="movePageDetail(custId)">Detail</b-button>
                                        </div>
                                    </b-card>
                                </b-card>
                            </b-form>
                            </b-colxx>
                            <b-colxx xxs="12" xl="6">
                                <b-form class="av-tooltip tooltip-label-right">
                                <b-card class="mb-4" title="Project">
                                    <b-card class="mb-0" title="Data Project">
                                        <h6 class="text-muted text-medium mb-1">
                                            {{ proNama }}
                                        </h6>
                                        <p class="text-muted text-small mb-2">
                                            {{ proKat }}
                                        </p>
                                    </b-card>
                                </b-card>
                            </b-form>
                            </b-colxx>
                        </b-row>
                        <div class="separator mb-2"></div>
                        <b-card class="mb-4" v-for="area in arrKumpulanArea" :key="area.category.name" >
                                <b-row style="margin-bottom: 2vh">
                                    <b-colxx xxs="6" xl="6"><h2>{{area.category.name}}</h2></b-colxx>
                                </b-row>
                                <b-row>
                                    <b-colxx xxs="12" xl="6">
                                        <b-row>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1">
                                                Section Area :
                                            </p>
                                            </b-colxx>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                                <div v-if="area.surface_preparation != null" >
                                                    <div v-for="item in splitSurface(area.surface_preparation)" :key="item">
                                                        <h6>
                                                            <b-badge class="mb-0" pill variant="secondary" style="width: 100%;">{{ item }}</b-badge>
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <p class="text-muted text-medium mt-1" style="font-style: italic;">No surface selected</p>
                                                </div>
                                            </b-colxx>
                                        </b-row>
                                    </b-colxx>
                                    <b-colxx xxs="12" xl="6">
                                        <b-row>
                                            <b-colxx xxs="6" xl="6" class="text-right">
                                                <p class="text text-medium mt-1">
                                                    Luas Area :
                                                </p>
                                            </b-colxx>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1">
                                                {{ area.surface_area }}
                                            </p>
                                            </b-colxx>
                                        </b-row>
                                    </b-colxx>
                                </b-row>
                                <b-row>

                                    <b-colxx xxs="12" xl="12" class="text-left">
                                        <p class="mb-2">
                                                HPP/Total
                                                <span class="float-right text-muted">  {{area.total_hpp |currency}}/  {{area.total | currency}}</span>
                                            </p>
                                            <b-progress :value="(area.total_hpp / area.total) * 100"></b-progress>
                                </b-colxx>
                                </b-row>
                                <b-row>
                                <b-colxx xxs="12" xl="12">
                                    <p class="text text-medium mt-3">
                                        Item
                                    </p>
                                    <table-item :dataComponent="area.items"></table-item>
                                </b-colxx>
                                </b-row>
                        </b-card>
                        <h4>Other Version</h4>
                        <div v-if="arrVersi == ''">
                            <b-card class="mb-4 text-center">
                                <p class="text-muted text-medium mt-1" style="font-style: italic;">
                                    This is the latest version
                                </p>
                            </b-card>
                        </div>
                        <div v-else>
                            <b-row class="mb-3">
                                <b-colxx xxs="6" class="text-center">
                                    <b-button @click="previous" variant="primary" style="width: 50%">Previous</b-button>
                                </b-colxx>
                                <b-colxx xxs="6" class="text-center">
                                <b-button @click="next" variant="danger" style="width: 50%">Next</b-button>
                                </b-colxx>
                            </b-row>
                            <h4>Version {{ versi }}</h4>
                            <div class="separator mb-5"></div>
                            <b-colxx xxs="12" xl="12">
                                <b-row>
                                    <b-colxx xxs="6" xl="6">
                                        <h1>Logo dan <br> profil perusahaan</h1>
                                    </b-colxx>
                                    <b-colxx xxs="6" xl="6" class="mb-3">
                                        <b-row>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1">
                                                Quote
                                            </p>
                                            </b-colxx>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1">
                                                {{ quote }}
                                            </p>
                                            </b-colxx>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1">
                                                Tanggal
                                            </p>
                                            </b-colxx>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1">
                                                {{ dateFormat(new Date(arrVersi.created_at)) }}
                                            </p>
                                            </b-colxx>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1" :style="returnColor(new Date(tglUntil),new Date(new Date(arrVersi.created_at).getTime()+(31*24*60*60*1000)))">
                                                Berlaku sampai
                                            </p>
                                            </b-colxx>
                                            <b-colxx xxs="6" xl="6" class="text-left">
                                            <p class="text text-medium mt-1">
                                                {{ dateFormat(new Date(new Date(arrVersi.created_at).getTime()+(31*24*60*60*1000))) }}
                                            </p>
                                            </b-colxx>
                                        </b-row>
                                    </b-colxx>
                                </b-row>
                                <div class="separator mb-5"></div>
                                <b-row>
                                    <b-colxx xxs="12" xl="6">
                                    <b-form class="av-tooltip tooltip-label-right">
                                        <b-card class="mb-4" title="Customer">
                                            <b-card class="mb-0" title="Data Customer" :style="returnColor(custNama, arrVersi.project.customer.name)">
                                                <h6 class="text-muted text-medium mb-1">
                                                    {{ arrVersi.project.customer.name }}
                                                </h6>
                                                <p class="text-muted text-small mb-2">
                                                    {{ arrVersi.project.customer.email }}
                                                </p>
                                                <p class="text-muted text-small mb-2">
                                                    {{ arrVersi.project.customer.category.name + " - " + arrVersi.project.customer.priceCategory.name }}
                                                </p>
                                            </b-card>
                                        </b-card>
                                    </b-form>
                                    </b-colxx>
                                    <b-colxx xxs="12" xl="6">
                                        <b-form class="av-tooltip tooltip-label-right">
                                        <b-card class="mb-4" title="Project">
                                            <b-card class="mb-0" title="Data Project">
                                                <h6 class="text-muted text-medium mb-1" :style="returnColor(proNama, arrVersi.project.name)">
                                                    {{ arrVersi.project.name }}
                                                </h6>
                                                <p class="text-muted text-small mb-2">
                                                    {{ arrVersi.project.category.name }}
                                                </p>
                                            </b-card>
                                        </b-card>
                                    </b-form>
                                    </b-colxx>
                                </b-row>
                                <div class="separator mb-2"></div>
                                <b-card class="mb-4" v-for="area in arrVersi.areaItems" :key="area.category.id" >
                                        <b-row style="margin-bottom: 2vh">
                                            <b-colxx xxs="6" xl="6"><h2>{{area.category.name}}</h2></b-colxx>
                                        </b-row>
                                        <b-row>
                                            <b-colxx xxs="12" xl="6">
                                                <b-row>
                                                    <b-colxx xxs="6" xl="6" class="text-left">
                                                    <p class="text text-medium mt-1" :style="returnColor(arrKumpulanArea.surface_preparation,area.surface_preparation)">
                                                        Section Area :
                                                    </p>
                                                    </b-colxx>
                                                    <b-colxx xxs="6" xl="6" class="text-left">
                                                        <div v-if="area.surface_preparation != null" >
                                                            <div v-for="item in splitSurface(area.surface_preparation)" :key="item">
                                                                <h6>
                                                                    <b-badge class="mb-0" pill variant="secondary" style="width: 100%;">{{ item }}</b-badge>
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <div v-else>
                                                            <p class="text-muted text-medium mt-1" style="font-style: italic;">No surface selected</p>
                                                        </div>
                                                    </b-colxx>
                                                </b-row>
                                            </b-colxx>
                                            <b-colxx xxs="12" xl="6">
                                                <b-row>
                                                    <b-colxx xxs="6" xl="6" class="text-right">
                                                    <p class="text text-medium mt-1" :style="returnColor(arrKumpulanArea.surface_area,area.surface_area)">
                                                        Luas Area :
                                                    </p>
                                                    </b-colxx>
                                                    <b-colxx xxs="6" xl="6" class="text-left">
                                                    <p class="text text-medium mt-1">
                                                        {{ area.surface_area }}
                                                    </p>
                                                    </b-colxx>
                                                </b-row>

                                            </b-colxx>
                                        </b-row>
                                        <b-row>

                                        <b-colxx xxs="12" xl="12" class="text-left">
                                            <p class="mb-2">
                                                HPP/Total
                                                <span class="float-right text-muted">  {{area.total_hpp |currency}}/  {{area.total | currency}}</span>
                                            </p>
                                                <b-progress :value="(area.total_hpp / area.total) * 100"></b-progress>
                                        </b-colxx>
                                        </b-row>
                                        <b-row>
                                        <b-colxx xxs="12" xl="12">
                                            <p class="text text-medium mt-3" :style="returnColor(arrKumpulanArea.length,area.items.length)">
                                                Item
                                            </p>
                                            <table-item :dataComponent="area.items"></table-item>
                                        </b-colxx>
                                        </b-row>
                                </b-card>
                            </b-colxx>
                        </div>
                        <!-- <glide-component :settings="glideSingleOption">
                            <div class="glide__slide" v-for="i in 2" :key="i">
                                <h6>
                                    <b-badge class="mb-0" pill variant="secondary" style="width: 50%;">{{ arrVersi.created_at  }}</b-badge>
                                </h6>
                            </div>
                        </glide-component> -->

                    </b-colxx>
                    <b-colxx xxs="12" xl="4" class="col-right">
                        <div class="mb-4" style="position: sticky; top: 20vh">
                            <b-card class="mb-4" no-body>
                                <b-tabs card no-fade>
                                <b-tab title="Action" active title-item-class="w-50 text-center">
                                    <div v-if="status != 6 && btn1 != '' && btn2 != '' && btn3 != ''">
                                        <div v-if="btn1 != '' && btn2 != ''" >
                                        <b-row>
                                            <b-colxx xxs="6" class="text-center">
                                                <b-button @click="requestSubmit(btn1)" variant="primary" style="width: 100%">{{ btn1 }}</b-button>
                                            </b-colxx>
                                            <b-colxx xxs="6" class="text-center">
                                                <b-button @click="requestSubmit(btn2)" type="submit" variant="danger" style="width: 100%">{{ btn2 }}</b-button>
                                            </b-colxx>
                                        </b-row>
                                        </div>
                                        <div v-if="btn3 != ''" >
                                            <b-row class="mt-2">
                                                <b-colxx xxs="12" class="text-center">
                                                <b-form class="av-tooltip">
                                                    <b-button @click="requestSubmit(btn3)" variant="primary" style="width: 100%">{{ btn3 }}</b-button>
                                                </b-form>
                                                </b-colxx>
                                            </b-row>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <p class="text-muted text-medium mt-1" style="font-style: italic;">No action needed</p>
                                    </div>
                                    <b-button variant="primary" style="width: 100%" @click="downloadWithCSS">Preview PDF</b-button>
                                </b-tab>
                                <b-tab title="Logs" title-item-class="w-50 text-center">
                                    <vue-perfect-scrollbar
                                    class="dashboard-logs scroll"
                                    :settings="{ suppressScrollX: true, wheelPropagation: false }"
                                    >
                                    <log-list :logs="arrLog" />
                                    </vue-perfect-scrollbar>
                                </b-tab>
                                </b-tabs>
                        </b-card>
                        </div>
                    </b-colxx>
                </b-row>
            </section>
        </vue-html2pdf>
    </div>
    <b-row>
        <b-colxx xxs="12">
            <h1>Detail Quote</h1>
            <piaf-breadcrumb />
            <div class="separator mb-5"></div>
        </b-colxx>
        <b-colxx xxs="12" xl="8">
            <b-row>
                <b-colxx xxs="6" xl="6">
                    <h1>Logo dan <br> profil perusahaan</h1>
                </b-colxx>
                <b-colxx xxs="6" xl="6" class="mb-3">
                    <b-row>
                        <b-colxx xxs="6" xl="6" class="text-left">
                        <p class="text text-medium mt-1">
                            Quote
                        </p>
                        </b-colxx>
                        <b-colxx xxs="6" xl="6" class="text-left">
                        <p class="text text-medium mt-1">
                            {{ quote }}
                        </p>
                        </b-colxx>
                        <b-colxx xxs="6" xl="6" class="text-left">
                        <p class="text text-medium mt-1">
                            Tanggal
                        </p>
                        </b-colxx>
                        <b-colxx xxs="6" xl="6" class="text-left">
                        <p class="text text-medium mt-1">
                            {{ dateFormat(tglQuote) }}
                        </p>
                        </b-colxx>
                        <b-colxx xxs="6" xl="6" class="text-left">
                        <p class="text text-medium mt-1">
                            Berlaku sampai
                        </p>
                        </b-colxx>
                        <b-colxx xxs="6" xl="6" class="text-left">
                        <p class="text text-medium mt-1">
                            {{ dateFormat(tglUntil) }}
                        </p>
                        </b-colxx>
                    </b-row>
                </b-colxx>
            </b-row>
            <div class="separator mb-5"></div>
            <b-row>
                <b-colxx xxs="12" xl="6">
                <b-form class="av-tooltip tooltip-label-right">
                    <b-card class="mb-4" title="Customer">
                        <b-card class="mb-0" title="Data Customer">
                            <h6 class="text-muted text-medium mb-1">
                                {{ custNama }}
                            </h6>
                            <p class="text-muted text-small mb-2">
                                {{ custEmail }}
                            </p>
                            <p class="text-muted text-small mb-2">
                                {{ custCate }}
                            </p>
                            <div class="text-right" v-if="custId != ''">
                                <b-button class="mb-1" variant="primary " :to="movePageDetail(custId)">Detail</b-button>
                            </div>
                        </b-card>
                    </b-card>
                </b-form>
                </b-colxx>
                <b-colxx xxs="12" xl="6">
                    <b-form class="av-tooltip tooltip-label-right">
                    <b-card class="mb-4" title="Project">
                        <b-card class="mb-0" title="Data Project">
                            <h6 class="text-muted text-medium mb-1">
                                {{ proNama }}
                            </h6>
                            <p class="text-muted text-small mb-2">
                                {{ proKat }}
                            </p>
                        </b-card>
                    </b-card>
                </b-form>
                </b-colxx>
            </b-row>
            <div class="separator mb-2"></div>
            <b-card class="mb-4" v-for="area in arrKumpulanArea" :key="area.category.name" >
                    <b-row style="margin-bottom: 2vh">
                        <b-colxx xxs="6" xl="6"><h2>{{area.category.name}}</h2></b-colxx>
                    </b-row>
                    <b-row>
                        <b-colxx xxs="12" xl="6">
                            <b-row>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1">
                                    Section Area :
                                </p>
                                </b-colxx>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                    <div v-if="area.surface_preparation != null" >
                                        <div v-for="item in splitSurface(area.surface_preparation)" :key="item">
                                            <h6>
                                                <b-badge class="mb-0" pill variant="secondary" style="width: 100%;">{{ item }}</b-badge>
                                            </h6>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <p class="text-muted text-medium mt-1" style="font-style: italic;">No surface selected</p>
                                    </div>
                                </b-colxx>
                            </b-row>
                        </b-colxx>
                        <b-colxx xxs="12" xl="6">
                            <b-row>
                                <b-colxx xxs="6" xl="6" class="text-right">
                                    <p class="text text-medium mt-1">
                                        Luas Area :
                                    </p>
                                </b-colxx>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1">
                                    {{ area.surface_area }}
                                </p>
                                </b-colxx>
                            </b-row>
                        </b-colxx>
                    </b-row>
                    <b-row>

                        <b-colxx xxs="12" xl="12" class="text-left">
                            <p class="mb-2">
                                    HPP/Total
                                    <span class="float-right text-muted">  {{area.total_hpp |currency}}/  {{area.total | currency}}</span>
                                </p>
                                <b-progress :value="(area.total_hpp / area.total) * 100"></b-progress>
                    </b-colxx>
                    </b-row>
                    <b-row>
                    <b-colxx xxs="12" xl="12">
                        <p class="text text-medium mt-3">
                            Item
                        </p>
                        <table-item :dataComponent="area.items"></table-item>
                    </b-colxx>
                    </b-row>
            </b-card>
            <h4>Other Version</h4>
            <div v-if="arrVersi == ''">
                <b-card class="mb-4 text-center">
                    <p class="text-muted text-medium mt-1" style="font-style: italic;">
                        This is the latest version
                    </p>
                </b-card>
            </div>
            <div v-else>
                <b-row class="mb-3">
                    <b-colxx xxs="6" class="text-center">
                        <b-button @click="previous" variant="primary" style="width: 50%">Previous</b-button>
                    </b-colxx>
                    <b-colxx xxs="6" class="text-center">
                    <b-button @click="next" variant="danger" style="width: 50%">Next</b-button>
                    </b-colxx>
                </b-row>
                <h4>Version {{ versi }}</h4>
                <div class="separator mb-5"></div>
                <b-colxx xxs="12" xl="12">
                    <b-row>
                        <b-colxx xxs="6" xl="6">
                            <h1>Logo dan <br> profil perusahaan</h1>
                        </b-colxx>
                        <b-colxx xxs="6" xl="6" class="mb-3">
                            <b-row>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1">
                                    Quote
                                </p>
                                </b-colxx>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1">
                                    {{ quote }}
                                </p>
                                </b-colxx>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1">
                                    Tanggal
                                </p>
                                </b-colxx>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1">
                                    {{ dateFormat(new Date(arrVersi.created_at)) }}
                                </p>
                                </b-colxx>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1" :style="returnColor(new Date(tglUntil),new Date(new Date(arrVersi.created_at).getTime()+(31*24*60*60*1000)))">
                                    Berlaku sampai
                                </p>
                                </b-colxx>
                                <b-colxx xxs="6" xl="6" class="text-left">
                                <p class="text text-medium mt-1">
                                    {{ dateFormat(new Date(new Date(arrVersi.created_at).getTime()+(31*24*60*60*1000))) }}
                                </p>
                                </b-colxx>
                            </b-row>
                        </b-colxx>
                    </b-row>
                    <div class="separator mb-5"></div>
                    <b-row>
                        <b-colxx xxs="12" xl="6">
                        <b-form class="av-tooltip tooltip-label-right">
                            <b-card class="mb-4" title="Customer">
                                <b-card class="mb-0" title="Data Customer" :style="returnColor(custNama, arrVersi.project.customer.name)">
                                    <h6 class="text-muted text-medium mb-1">
                                        {{ arrVersi.project.customer.name }}
                                    </h6>
                                    <p class="text-muted text-small mb-2">
                                        {{ arrVersi.project.customer.email }}
                                    </p>
                                    <p class="text-muted text-small mb-2">
                                        {{ arrVersi.project.customer.category.name + " - " + arrVersi.project.customer.priceCategory.name }}
                                    </p>
                                </b-card>
                            </b-card>
                        </b-form>
                        </b-colxx>
                        <b-colxx xxs="12" xl="6">
                            <b-form class="av-tooltip tooltip-label-right">
                            <b-card class="mb-4" title="Project">
                                <b-card class="mb-0" title="Data Project">
                                    <h6 class="text-muted text-medium mb-1" :style="returnColor(proNama, arrVersi.project.name)">
                                        {{ arrVersi.project.name }}
                                    </h6>
                                    <p class="text-muted text-small mb-2">
                                        {{ arrVersi.project.category.name }}
                                    </p>
                                </b-card>
                            </b-card>
                        </b-form>
                        </b-colxx>
                    </b-row>
                    <div class="separator mb-2"></div>
                    <b-card class="mb-4" v-for="area in arrVersi.areaItems" :key="area.category.id" >
                            <b-row style="margin-bottom: 2vh">
                                <b-colxx xxs="6" xl="6"><h2>{{area.category.name}}</h2></b-colxx>
                            </b-row>
                            <b-row>
                                <b-colxx xxs="12" xl="6">
                                    <b-row>
                                        <b-colxx xxs="6" xl="6" class="text-left">
                                        <p class="text text-medium mt-1" :style="returnColor(arrKumpulanArea.surface_preparation,area.surface_preparation)">
                                            Section Area :
                                        </p>
                                        </b-colxx>
                                        <b-colxx xxs="6" xl="6" class="text-left">
                                            <div v-if="area.surface_preparation != null" >
                                                <div v-for="item in splitSurface(area.surface_preparation)" :key="item">
                                                    <h6>
                                                        <b-badge class="mb-0" pill variant="secondary" style="width: 100%;">{{ item }}</b-badge>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <p class="text-muted text-medium mt-1" style="font-style: italic;">No surface selected</p>
                                            </div>
                                        </b-colxx>
                                    </b-row>
                                </b-colxx>
                                <b-colxx xxs="12" xl="6">
                                    <b-row>
                                        <b-colxx xxs="6" xl="6" class="text-right">
                                        <p class="text text-medium mt-1" :style="returnColor(arrKumpulanArea.surface_area,area.surface_area)">
                                            Luas Area :
                                        </p>
                                        </b-colxx>
                                        <b-colxx xxs="6" xl="6" class="text-left">
                                        <p class="text text-medium mt-1">
                                            {{ area.surface_area }}
                                        </p>
                                        </b-colxx>
                                    </b-row>

                                </b-colxx>
                            </b-row>
                            <b-row>

                            <b-colxx xxs="12" xl="12" class="text-left">
                                <p class="mb-2">
                                    HPP/Total
                                    <span class="float-right text-muted">  {{area.total_hpp |currency}}/  {{area.total | currency}}</span>
                                </p>
                                    <b-progress :value="(area.total_hpp / area.total) * 100"></b-progress>
                            </b-colxx>
                            </b-row>
                            <b-row>
                            <b-colxx xxs="12" xl="12">
                                <p class="text text-medium mt-3" :style="returnColor(arrKumpulanArea.length,area.items.length)">
                                    Item
                                </p>
                                <table-item :dataComponent="area.items"></table-item>
                            </b-colxx>
                            </b-row>
                    </b-card>
                </b-colxx>
            </div>
            <!-- <glide-component :settings="glideSingleOption">
                <div class="glide__slide" v-for="i in 2" :key="i">
                    <h6>
                        <b-badge class="mb-0" pill variant="secondary" style="width: 50%;">{{ arrVersi.created_at  }}</b-badge>
                    </h6>
                </div>
            </glide-component> -->

        </b-colxx>
        <b-colxx xxs="12" xl="4" class="col-right">
            <div class="mb-4" style="position: sticky; top: 20vh">
                <b-card class="mb-4" no-body>
                    <b-tabs card no-fade>
                    <b-tab title="Action" active title-item-class="w-50 text-center">
                        <div v-if="btn1 == '' && btn2 == '' && btn3 == ''">
                            <p class="text-muted text-medium mt-1" style="font-style: italic;">No action needed</p>
                        </div>
                        <div v-else>
                        <div v-if="status != 6">
                            <b-row class="mb-2">
                                <b-colxx xxs="6" class="text-center">
                                    <b-button v-if="btn1 != ''" @click="requestSubmit(btn1,'modalbasic')" variant="primary" style="width: 100%">{{ btn1 }}</b-button>
                                </b-colxx>
                                <b-colxx xxs="6" class="text-center">
                                    <b-button v-if="btn2 != ''" @click="requestSubmit(btn2,'modalbasic')" type="submit" variant="danger" style="width: 100%">{{ btn2 }}</b-button>
                                </b-colxx>
                            </b-row>
                            <b-row class="mb-2">
                                <b-colxx xxs="6" class="text-center">
                                <b-form class="av-tooltip">
                                    <b-button v-if="btn3 != '' && btn3 == 'Edit'" :to="movePageEdit(qId, qVer)" variant="primary" style="width: 100%">{{ btn3 }}</b-button>
                                    <b-button v-if="btn3 != '' && btn3 != 'Edit'" @click="requestSubmit(btn3,'modalbasic')" variant="primary" style="width: 100%">{{ btn3 }}</b-button>
                                </b-form>
                                </b-colxx>
                                <b-colxx xxs="6" class="text-center">
                                <b-form class="av-tooltip">
                                    <b-button v-if="btn4 != ''" @click="requestSubmit(btn4)" variant="primary" style="width: 100%">{{ btn4 }}</b-button>
                                </b-form>
                                </b-colxx>
                            </b-row>
                        </div>
                        <div v-else>
                            <p class="text-muted text-medium mt-1" style="font-style: italic;">No action needed</p>
                        </div>                        
                        </div>
                        <b-button variant="primary" style="width: 100%" @click="downloadWithCSS">Preview PDF</b-button>
                    </b-tab>
                    <b-tab title="Logs" title-item-class="w-50 text-center">
                        <div v-if="arrLog.length == 0">
                            <p class="text-muted text-medium mt-1" style="font-style: italic;">No logs</p>
                        </div>
                        <div v-else>
                            <vue-perfect-scrollbar
                            class="dashboard-logs scroll"
                            :settings="{ suppressScrollX: true, wheelPropagation: false }"
                            >
                            <log-list :logs="arrLog" />
                            </vue-perfect-scrollbar>
                        </div>
                    </b-tab>
                    </b-tabs>
            </b-card>
            </div>
        </b-colxx>
    </b-row>
    <b-modal id="modalbasic" ref="modalbasic" title="Konfirmasi">
        Anda yakin ingin mengubah status quote ini dari {{ status.name }} menjadi {{ konfirm }} ?
        <template slot="modal-footer">
            <b-button variant="primary" @click="submitModal(konfirm,'modalbasic')" class="mr-1">OK</b-button>
            <b-button variant="danger" @click="hideModal('modalbasic')">Cancel</b-button>
        </template>
    </b-modal>
</div>
<div v-else>
    <div class="loading"></div>
</div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { getDirection, setThemeRadius } from "../../../../utils";
import selectCategory from "../../../../components/selectCategory.vue";
import Datepicker from "vuejs-datepicker";
import Switches from "vue-switches";
import TableItem from "./tableItemQuote.vue"
import { mapGetters } from "vuex";
import GlideComponent from '../../../../components/Carousel/GlideComponent'
import LogList from "../../../../components/Listing/LogList";
import logs from "../../../../data/logs";
import VueHtml2pdf from 'vue-html2pdf'

import {
    validationMixin
} from "vuelidate";
import Pie from '../../../../components/Charts/Pie.vue';
const {
    required,
    maxLength,
    minLength,
    alpha,
    email,
    numeric,
    maxValue,
    minValue,
    helpers,
} = require("vuelidate/lib/validators");

const upperCase = helpers.regex('upperCase', /^[A-Z]*$/)
const phone = helpers.regex('numeric', /^(09)[0-9]{9}/);

export default {
    components: {
        "v-select": vSelect,
        "vue-autosuggest": VueAutosuggest,
        "selectCategory": selectCategory,
        datepicker: Datepicker,
        'glide-component': GlideComponent,
        "table-item" : TableItem,
        "log-list": LogList,
        VueHtml2pdf
    },
    data() {
        return {
            logs,
            arrLog: [],
            isLoad: false,
            quote: "# 5037",
            status: "",
            custEmail: "",
            custId: "",
            custNama: "",
            custCate: "",
            proNama: "",
            proKat: "",
            tglQuote: "",
            tglUntil: "",
            detail: [],
            arrDetailProject : [],
            arrKumpulanArea : [],
            arrTmp: [],
            arrVersi: "",
            versi: 1,
          //  schItem: "",
            primarySmall: false,
            btn1: "",
            btn2: "",
            btn3: "",
            btn4: "",

            konfirm: "",
        };
    },
    mixins: [validationMixin],
    validations: {
        proNama:{
            required
        },
    },
    methods: {
        movePageEdit(q, v){
            return "../quoteTable/qDetail/edit?id="+q+"&ver="+v;
        },
        downloadWithCSS() {
            this.$refs.html2Pdf.generatePdf()
        },
        hideModal(refname){
            this.$refs[refname].hide()
        },
        submitModal(a, refname){
            let queryString = "";
            if(a.toLowerCase() === "close"){
                queryString = `query{
                    closeQuote(quote_id:${this.qId}){
                        status
                        message
                    }
                }`
            }else if(a.toLowerCase() === "submit"){
                queryString = `mutation{
                    submitQuote(quote_id:${this.qId}){
                        status
                        message
                    }
                }`
            }
            else if(a.toLowerCase() === "revise"){
                queryString = `mutation{
                    addNewVersionQuote(
                        quote_id:${this.qId}
                        is_draft:
                        params:{
                            valid_until: ""
                            notes: ""
                            discount: 0
                            total_volume: 0
                            total: 0
                            total_hpp: 0
                            areas:{
                                area_category: Int!
                                surface_area: Int
                                total_volume: Float
                                total: Float!
                                total_hpp: Float
                                surface_preparation: String!
                                items:{
                                    item_id: Int!
                                    item_name: String!
                                    item_code: String!
                                    liter: Float!
                                    thinner_code: String
                                    price: Float!
                                    hpp: Float
                                    subtotal: Float!
                                    subtotal_hpp: Float
                                    coat: Int
                                    dry_film_thickness: Int
                                    theoritical: Float
                                    practical: Float
                                    loss: Int
                                }
                            }
                        }
                    ){
                        status
                        message
                    }
                }`
            }
            else if(a.toLowerCase() === "approve"){
                queryString = `mutation{
                    acceptRejectQuote(
                        quote_id:${this.qId}
                        status:${this.status.id}
                        notes:""
                    ){
                        status
                        message
                    }
                }`
            }
            else if(a.toLowerCase() === "rejected by customer"){
                queryString = `mutation{
                    rejectQuoteByCustomer(
                    quote_id:${this.qId}
                    notes: ""
                    ){
                        status
                        message
                    }
                }`
            }else if (a.toLowerCase() === "forward to so")
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: queryString
                    ,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                console.log(a);
                if(a.toLowerCase() === "submit"){
                    return text.data.submitQuote;
                }else if(a.toLowerCase() === "close"){
                    return text.data.closeQuote;
                }else if(a.toLowerCase() === "rejected by customer"){
                    return text.data.rejectQuoteByCustomer;
                }else if(a.toLowerCase() === "approve"){
                    return text.data.acceptRejectQuote;
                }
            })
            .then(resp => {
                if(resp.status.toLowerCase() == "success"){
                    this.$toast(resp.message, {
                        type: "success",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                    this.$refs[refname].hide()
                    setTimeout(() => {
                        window.location = window.location.origin+"/app/datatable/quoteTable";
                    }, 1000);
                }else{
                    this.$toast(resp.message, {
                        type: "error",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }
            })
        },
        requestSubmit(a, refname){
            this.$refs[refname].show()
            this.konfirm = a;
        },
        returnColor(a,b){
            if(a != b){
                const style = {
                    color: "yellow",
                }
                return style
            }
        },
        previous(){
            if(this.versi > 1){
                if(this.versi == this.qVer){
                    this.versi = this.versi - 1;
                }
                this.fetchVersion(this.versi);
            }
        },
        next(){
            if(this.versi < this.qVer){
                if(this.versi == this.qVer){
                    this.versi = this.versi + 1;
                }
                this.fetchVersion(this.versi);
            }
        },
        movePageDetail(val){
            return "/app/datatable/customerTable/cDetail?id="+val
		},
        newArea(){
          let cek = true
            for(let i=0; i<this.arrKumpulanArea.length; i++){
              if(this.arrKumpulanArea[i].id == this.area.id){
                cek = false
              }
            }
          if(cek){
            this.arrKumpulanArea.push(this.area)
          }
        },
        splitSurface(arr){
            let adaKoma = false;
            let tmp = [];
            if(arr != null){
            for (let i = 0; i < arr.length; i++) {
                if(arr.charAt(i) == ','){
                    adaKoma = true;
                }
            }
            if(adaKoma){
                let arrTmp = arr.split(',');
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < this.surfaceOptions.length; j++) {
                        if(arrTmp[i] == this.surfaceOptions[j].id){
                            tmp.push(this.surfaceOptions[j].name);
                        }
                    }
                }
                return tmp;
            }else{
                return arr;
            }
            }
        },
        dateFormat(date){
            if(date != ''){
            let d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            return da + " "+ mo + " " +ye;
            }
        },
        clear(){
            this.tglQuote = "";
        },
        fetchArea(val) {
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                            areaCategory(project_category:${val}) {
                                id
                                name
                            }
                        }
                    `,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.areaCategory;
            })
            .then(resp => {
                this.areaOptions = resp;
                for(let i=0; i< this.areaOptions.length; i++){
                  this.areaOptions[i].selectedItem = []
                }
            })
        },
        fetchSurface(){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                            surfacePreparations{
                                id
                                name
                            }
                        }
                    `,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.surfacePreparations;
            })
            .then(resp => {
                this.surfaceOptions = resp;
            })
        },
        onValitadeFormSubmit() {
            this.$v.$touch();
            if(!this.$v.$invalid){
                if(new Date(this.tglUntil) < new Date(this.tglQuote)){
                    this.$toast("Tanggal berlaku tidak valid", {
                        type: "warning",
                        hideProgressBar: true,
                        timeout: 2000
                    });
                }else{
                    console.log("valid");
                }
            }else{
                console.log("error");
            }
        },
        fetchVersion(ver){
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                        quoteDetail(quote_id:${this.qId} version:${ver}){
                            id
                            project{
                            id
                            name
                            category{
                                name
                            }
                            customer{
                                name
                                email
                                category{
                                    name
                                }
                                priceCategory{
                                    name
                                }
                            }
                            }
                            status{
                                id
                                name
                            }
                            total
                            last_version
                            notes
                            created_at
                            userCreate{
                            name
                            role{
                                name
                            }
                            }
                            areaItems{
                                category{
                                name
                                }
                                surface_area
                                total
                                total_hpp
                                surface_preparation
                                items{
                                    item_name
                                    price
                                    subtotal
                                    item_id
                                    liter
                                    coat
                                    dry_film_thickness
                                    theoritical
                                    practical
                                    loss
                                }
                            }
                        }
                        }
                    `,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.quoteDetail;
            })
            .then(resp => {
                this.arrTmp = resp
                var parsedyourElement = JSON.parse(JSON.stringify(this.arrTmp));
                this.arrVersi = parsedyourElement;
                console.log(this.arrVersi);
            });
        }
    },
    mounted(){
        this.qId = this.$route.query.id;
        this.qVer = this.$route.query.ver;
        if(this.qId && this.qVer){
        this.fetchSurface();
        setTimeout(() => {
            
            fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization' :'Bearer '+this.currentUser.jwt
                },
                body: JSON.stringify({
                    query: `
                        query{
                        quoteDetail(quote_id:${this.qId} version:${this.qVer}){
                            id
                            project{
                            id
                            name
                            category{
                                name
                            }
                            customer{
                                name
                                email
                                category{
                                    name
                                }
                                priceCategory{
                                    name
                                }
                            }
                            }
                            status{
                                id
                                name
                            }
                            quoteLogs{
                                created_at
                                status{
                                    id
                                    name
                                }
                                notes
                            }
                            total
                            last_version
                            notes
                            created_at
                            userCreate{
                            name
                            role{
                                name
                            }
                            }
                            areaItems{
                                category{
                                name
                                }
                                surface_area
                                total
                                total_hpp
                                surface_preparation
                                items{
                                    item_name
                                    price
                                    subtotal
                                    item_id
                                    liter
                                    coat
                                    dry_film_thickness
                                    theoritical
                                    practical
                                    loss
                                }
                            }
                        }
                        }
                    `,
                }),
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(text) {
                return text.data.quoteDetail;
            })
            .then(resp => {
                this.detail = resp;
                this.tglQuote = new Date(this.detail.created_at);
                this.tglUntil = new Date(new Date(this.detail.created_at).getTime()+(31*24*60*60*1000));
                this.custNama = this.detail.project.customer.name;
                this.custEmail = this.detail.project.customer.email;
                this.custCate = this.detail.project.customer.category.name + " - "+ this.detail.project.customer.priceCategory.name;
                this.proNama = this.detail.project.name;
                this.proKat = this.detail.project.category.name;
                this.arrKumpulanArea = this.detail.areaItems;
                this.arrLog = this.detail.quoteLogs;
                this.user = this.detail.userCreate;
                this.status = this.detail.status;
                if(this.status.id == 1){
                    if(this.user.name == this.currentUser.title || this.user.role.name.toLowerCase() == "manager"){
                        this.btn1 = "Submit";
                        this.btn2 = "Close";
                        this.btn3 = "Edit";
                    }
                }
                else if(this.status.id == 2){
                    if(this.currentUser.role == 2){
                        this.btn1 = "Approve";
                        this.btn2 = "Reject";
                    }
                    if(this.user.name == this.currentUser.title){
                        this.btn3 = "Close";
                    }
                }else if (this.status.id == 3){
                    if(this.user.name == this.currentUser.title || this.currentUser.role == 2){
                        this.btn1 = "Rejected by Customer";
                        this.btn2 = "Forward";
                    }
                }else if (this.status.id == 4){
                    if(this.user.name == this.currentUser.title || this.currentUser.role == 2){
                        this.btn1 = "Close";
                        this.btn2 = "Submit";
                        this.btn3 = "Edit";
                    }
                }else if (this.status.id == 5){
                    if(this.user.name == this.currentUser.title || this.currentUser.role == 2){
                        this.btn1 = "Close";
                        this.btn2 = "Revise";
                    }
                }
                else if (this.status.id == 7){
                    if(this.currentUser.role == 2){
                        this.btn1 = "Forward to SO";
                        this.btn2 = "Cancel";
                        this.btn3 = "";
                    }
                }
    
                this.isLoad = true;
                if(this.qVer > 1){
                    this.fetchVersion(this.versi);
                }
            })
        }, 100);
        }else{
            window.location = window.location.origin +"/error?id=404&name=quote";
        }
    },
    computed:{
        ...mapGetters({
        currentUser: "currentUser",
    })
    }
};
</script>

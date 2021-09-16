<template>
    <b-row>

          <b-colxx class="text-center" xxs="12" lg="4">
          <h5 class="mb-2 card-title">Utama</h5>
          <div class="separator mb-5"></div>
          <div v-for="item in dataComponent.dataUt" :key="item.item_id">
              <b-card class="mb-4" no-body>
                  <b-row>
                      <b-colxx class="text-center" xxs="6" lg="6">
                          <b-card-body class="text-left">
                          <p class="card-text text-muted text-small mb-4 font-weight-light">{{ item.item_id }}</p>
                              <h6 class="mb-5 card-subtitle">{{item.detailSellingPrice.price | currency}}</h6>
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
                  <b-card-title style="margin-top: -20px;margin: 5%">{{item.name}}</b-card-title>
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
              <div v-if="dataComponent.dataAg.length == 0" style="font-style: italic;">No Item</div>
              <div v-else v-for="item in dataComponent.dataAg" :key="item.item_id">
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
              <div v-if="dataComponent.dataTh.length == 0" style="font-style: italic;">No Item</div>
              <div v-else v-for="item in dataComponent.dataTh" :key="item.item_id">
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
</template>
<script>
  export default{
    props : ['dataComponent','detail'],
    methods : {
      returnColor(a){
            const style = {
                background: "#"+a
            }
            return style
        },
    },
    mounted(){

    }
  }
</script>


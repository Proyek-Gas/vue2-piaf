<template>
    <b-row>
          <b-colxx class="text-center mb-4" xxs="12" lg="12">
          <h5 class="mb-2 card-title">Utama</h5>
          <div class="separator mb-5"></div>
          <div v-for="item in dataComponent.dataUt" :key="item.item_id">
             <b-card no-body style="margin:2%">
              <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                      <b-colxx xxs="4">{{item.name}}</b-colxx>

                      <p class="mb-0 text-muted text-small w-15 w-sm-100">{{item.detailSellingPrice.price | currency }}</p>
                      <p class="mb-0 text-muted text-small w-15 w-sm-100">ID : {{item.item_id}}</p>

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
                  </div>
                <b-card no-body :id="'tool-nt'+item.item_id"
                    style="width:10%; text-align :center; color: black;padding-top:3%"
                    :style="returnColor(item.color.hex_code)"
                    >
                    <!-- <label class="mt-2">{{ item.color.ind_name }}</label><br> -->
                </b-card>
                 <b-tooltip :target="'tool-nt'+item.item_id"
                                placement="top"
                                  >
                        {{ item.color.ind_name }}
                </b-tooltip>
              </div>
          </b-card>
         </div>

      </b-colxx>
      <b-colxx class="text-center mb-4" xxs="12" lg="12">
          <h5 class="mb-2 card-title">Agent</h5>
          <div class="separator mb-5"></div>
              <div v-if="dataComponent.dataAg.length == 0" style="font-style: italic;">No Item</div>
              <div v-else v-for="item in dataComponent.dataAg" :key="item.item_id">
              <b-card no-body style="margin:2%">
              <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                      <b-colxx xxs="4">{{item.name}}</b-colxx>

                      <p class="mb-0 text-muted text-small w-15 w-sm-100">{{shortNumber(item.detailSellingPrice.price ) }}</p>
                      <p class="mb-0 text-muted text-small w-15 w-sm-100">ID : {{item.item_id}}</p>

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
                  </div>
                <b-card no-body :id="'tool-nt'+item.item_id"
                    style="width:10%; text-align :center; color: black;padding-top:3%"
                    :style="returnColor(item.color.hex_code)"
                    >
                    <!-- <label class="mt-2">{{ item.color.ind_name }}</label><br> -->
                </b-card>
                 <b-tooltip :target="'tool-nt'+item.item_id"
                                placement="top"
                                  >
                        {{ item.color.ind_name }}
                </b-tooltip>
              </div>
          </b-card>
          </div>
      </b-colxx>
      <b-colxx class="text-center mb-4" xxs="12" lg="12">
          <h5 class="mb-2 card-title">Thinner</h5>
          <div class="separator mb-5"></div>
              <div v-if="dataComponent.dataTh.length == 0" style="font-style: italic;">No Item</div>
              <div v-else v-for="item in dataComponent.dataTh" :key="item.item_id">
              <b-card no-body style="margin:2%">
              <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                      <b-colxx xxs="4">{{item.name}}</b-colxx>

                      <p class="mb-0 text-muted text-small w-15 w-sm-100">{{shortNumber(item.detailSellingPrice.price ) }}</p>
                      <p class="mb-0 text-muted text-small w-15 w-sm-100">ID : {{item.item_id}}</p>

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
                  </div>
                <b-card no-body :id="'tool-nt'+item.item_id"
                    style="width:10%; text-align :center; color: black;padding-top:3%"
                    :style="returnColor(item.color.hex_code)"
                    >
                    <!-- <label class="mt-2">{{ item.color.ind_name }}</label><br> -->
                </b-card>
                 <b-tooltip :target="'tool-nt'+item.item_id"
                                placement="top"
                                  >
                        {{ item.color.ind_name }}
                </b-tooltip>
              </div>
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
       shortNumber(n) {
            if (n == null || n == 0) return "0"
            if (n < 1e3) return n;
            else if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + " rb";
            else if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + " jt";
            else if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + " M";
            else if (n >= 1e12) return +(n / 1e12).toFixed(1) + " T";
        },
    },
    mounted(){

    }
  }
</script>


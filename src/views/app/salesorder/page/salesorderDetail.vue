<template>
<div v-if="isLoad">
    <b-row>
        <b-colxx xxs="12">
            <h1>Sales Order Detail</h1>
            <piaf-breadcrumb />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx md="12" sm="12" lg="12" xxs="12" class="mb-4">
            <b-card>
                <b-row>
                  <b-colxx md="12" lg="6" xxs="12">
                      <b-row class="mb-2">
                          <b-colxx xxs="6" md="6" lg="6" style="text-align:right">
                              <h5>ID :</h5>
                          </b-colxx>
                          <b-colxx xxs="6" md="6" lg="6">
                              <h5>{{this.detail.id}}</h5>
                          </b-colxx>
                      </b-row>
                      <b-row class="mb-2">
                          <b-colxx xxs="6" md="6" lg="6" style="text-align:right">
                              <h5>Shipment Date :</h5>
                          </b-colxx>
                          <b-colxx xxs="6" md="6" lg="6">
                              <h5>{{this.detail.shipDate}}</h5>
                          </b-colxx>
                      </b-row>
                      <b-row class="mb-2">
                          <b-colxx xxs="6" md="6" lg="6" style="text-align:right">
                              <h5>Transaction Date :</h5>
                          </b-colxx>
                          <b-colxx xxs="6" md="6" lg="6">
                              <h5>{{this.detail.transDate}}</h5>
                          </b-colxx>
                      </b-row>
                      <b-row class="mb-2">
                           <b-colxx xxs="6" md="6" lg="6" style="text-align:right">
                              <h5>Term:</h5>
                          </b-colxx>
                          <b-colxx xxs="6" md="6" lg="6">
                              <h5>{{this.detail.paymentTerm.name}}</h5>
                          </b-colxx>
                      </b-row>
                      <b-row class="mb-2">
                          <b-colxx xxs="6" md="6" lg="6" style="text-align:right">
                              <h4>Nomor PO :</h4>
                          </b-colxx>
                          <b-colxx xxs="6" md="6" lg="6">
                              <h5>{{this.detail.poNumber}}</h5>
                          </b-colxx>
                      </b-row>
                  </b-colxx>
                  <b-colxx md="12" lg="6" xxs="12">
                        <b-card class="text-center">
                            <h2>Customer</h2>
                            <b-row>
                              <b-colxx xs="12" class="text-center">
                                   <h4><b>{{this.detail.customer.name}}</b></h4>
                              </b-colxx>
                            </b-row>
                            <b-row>
                              <i>{{this.detail.toAddress}}</i>
                            </b-row>
                        </b-card>
                  </b-colxx>
                </b-row>
            </b-card>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx xs="12">
            <b-card>
              <b-row>
                <b-colxx xs="12">
                  <h2>Item</h2>
                  <div class="separator mb-5"></div>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx xs="12">
                    <item-table :dataComponent="detail.items"></item-table>

                </b-colxx>
              </b-row>
              <b-row class="mb-2">
                <b-colxx xs="8" class="text-right"><b>Subtotal</b></b-colxx>
                <b-colxx xs="4" class="text-left">{{this.detail.subTotal | currency}}</b-colxx>
                <b-colxx xs="8" class="text-right"><b>Discount</b></b-colxx>
                <b-colxx xs="4" class="text-left">{{this.detail.cashDiscount | currency}}</b-colxx>
                <b-colxx xs="8" class="text-right"><b>Tax</b></b-colxx>
                <b-colxx xs="4" class="text-left">{{this.detail.tax1Amount | currency}}</b-colxx>
              </b-row>
              <b-row class="mb-2">
                 <b-colxx sx="12"><div class="separator mb-5"></div></b-colxx>
              </b-row>
              <b-row>
                <b-colxx xs="8" class="text-right"><b>Total</b></b-colxx>
                <b-colxx xs="4" class="text-left">{{this.detail.totalAmount | currency}}</b-colxx>
              </b-row>
            </b-card>
        </b-colxx>
    </b-row>
</div>
</template>

<script>
import IconCard from '../../../../components/Cards/IconCard';
import TableItem from "./tableItem.vue"
import {mapGetters} from 'vuex'

export default {
    components: {
        'icon-card': IconCard,
        'item-table' : TableItem
    },
    computed :{
      ...mapGetters({
        currentUser: "currentUser",
      })
    },
    data() {
        return {
            isLoad: false,
            salesorderId: 0,
            detail : null,
        }
    },
    methods: {

    },
    async mounted() {
        this.salesorderId = this.$route.query.id;

		fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
        'Authorization' :'Bearer '+this.currentUser.jwt
		},
		body: JSON.stringify({
			query: `
			query{
          salesOrderDetail(sales_order_id:${this.salesorderId}){
            id
            transDate
            shipDate
            cashDiscount
            tax1Amount
            poNumber
            subTotal
            paymentTerm{
              name
              id
            }
            masterSalesmanId
            items{
              name
              id
              liter
              detailSellingPrice{
                priceCategory{
                  id
                  name
                }
                price
              }
              hpp
              data_sheet
              itemCategory{
                id
                name
              }
            availableToSell
              balance
              ratio2
              ratio3
              ratio_agent
              ratio_agent_2
              ratio_recommended_thinner_id
              color{
                ind_name
                eng_name
                hex_code
                id_ral
              }
            }
            subTotal
            toAddress
            totalAmount
            customer
            {
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
      console.log(text)
			return text.data.salesOrderDetail;
		})
		.then(resp => {
			this.detail = resp
      console.log(this.detail)
			if(this.detail == null){
                setTimeout(() => {
                    window.location = window.location.origin +"/error?id=404&name=salesOrder";
                }, 50)
			}else{
                this.isLoad = true;
                //this.fetching();
			}
		})
    }
}
</script>

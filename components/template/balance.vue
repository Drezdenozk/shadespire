<template>
    <div v-if="userId !== null">
        <div class="right hidden-md-down margin-left-20">
            <div class="my-balance" style="margin-top:-12px;">
                <div style="display: inline-block; vertical-align: top; line-height:63px;" class="title">Баланс: &nbsp; &nbsp;</div>
                <div style="display: inline-block; vertical-align: top">
                    <span class="count">{{userBalance.approved.RUB.toFixed(2)}} / <span style="color:blue">{{userBalance.holded.RUB.toFixed(2)}}</span> &#8381;</span><br/>
                    <span class="count">{{userBalance.approved.USD.toFixed(2)}} / <span style="color:blue">{{userBalance.holded.USD.toFixed(2)}}</span> $</span><br/>
                    <span class="count">{{userBalance.approved.EUR.toFixed(2)}} / <span style="color:blue">{{userBalance.holded.EUR.toFixed(2)}}</span> &euro;</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters(['userBalance', 'userId'])
  }
</script>
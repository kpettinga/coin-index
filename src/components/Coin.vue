<template>

  <div :id="'Coin-' + info.id" class="Coin">
    
    <el-button @click="detailVisible = true">
      <div class="flex align-center" style="width:100%">
        <div>
          <strong>{{info.name}}</strong>&nbsp;
          <small class="faded">{{info.symbol}}</small>&nbsp;
          <small class="snippet">
            <span v-if="previewData === 'rank' || previewData === 'id'">{{ info[previewData] }}</span>
            <span v-if="previewData === 'volume_24h'">{{ info.quotes[currency].volume_24h | currency(currency, 'isShort') }}</span>
            <Change v-if="previewData === 'percent_change_24h'" :data="info.quotes[currency].percent_change_24h" />
          </small>
        </div>
        <img :src="'https://s2.coinmarketcap.com/static/img/coins/32x32/'+info.id+'.png'" width="24" height="24" alt="icon" class="justify-end"/>
      </div>
    </el-button>
      
    <el-dialog
      :visible.sync="detailVisible"
      :show-close="false"
      custom-class="coin-dialog"
      center>
      
      <h1 slot="title" class="mt-0 flex align-center justify-center">
        <img :src="'https://s2.coinmarketcap.com/static/img/coins/32x32/'+info.id+'.png'" width="32" height="32" alt="icon" />&nbsp;
        <strong>{{info.name}}</strong>&nbsp;
        <small class="faded">({{info.symbol}})</small>
      </h1>

      <el-table :data="[info.quotes[currency]]" style="width: 100%">
        <el-table-column label="Price" width="170">
          <template slot-scope="scope"><h2 class="mt-0">{{ scope.row.price | currency(currency) }}</h2></template>
        </el-table-column>
        <el-table-column label="1 hour">
          <template slot-scope="scope"><h4 class="mt-0"><Change :data="scope.row.percent_change_1h" /></h4></template>
        </el-table-column>
        <el-table-column label="1 day">
          <template slot-scope="scope"><h4 class="mt-0"><Change :data="scope.row.percent_change_24h" /></h4></template>
        </el-table-column>
        <el-table-column label="1 week">
          <template slot-scope="scope"><h4 class="mt-0"><Change :data="scope.row.percent_change_7d" /></h4></template>
        </el-table-column>
      </el-table>

      <el-table :data="[info.quotes[currency]]" style="width: 100%">
        <el-table-column label="Volume (24h)">
          <template slot-scope="scope"><h4 class="mt-0">{{ scope.row.volume_24h | currency(currency) }}</h4></template>
        </el-table-column>
        <el-table-column label="Market Cap">
          <template slot-scope="scope"><h4 class="mt-0">{{ scope.row.market_cap | currency(currency) }}</h4></template>
        </el-table-column>
      </el-table>
      
      <el-table :data="[{ circulating: info.circulating_supply, max: info.max_supply }]" style="width: 100%">
        <el-table-column label="Circulating Supply">
          <template slot-scope="scope"><h4 class="mt-0">{{ scope.row.circulating | currency(info.symbol) }}</h4></template>
        </el-table-column>
        <el-table-column label="Max. Supply">
          <template slot-scope="scope"><h4 class="mt-0">{{ scope.row.max | currency(info.symbol) }}</h4></template>
        </el-table-column>
      </el-table>

      <p><small><strong>As of:</strong> {{ new Date( info.last_updated * 1000 ).toGMTString() }}</small></p>

    </el-dialog>

  </div>

</template>

<script>
import Change from './Change';

export default {
  name: "Coin",
  components: {
    Change
  },
  props: {
    info: Object,
    currency: String,
    previewData: String
  },
  data() {
    return {
      detailVisible: false
    }
  },
  filters: {
    currency(value, symbol, isShort) {

      if ( ! value ) {
        return '—';
      }

      symbol = symbol ? symbol : '';

      let factor = value < 1 ? 1000000 : 100,
          rounded = Math.round(value * factor)/factor,
          dollars = rounded.toString().split('.')[0],
          cents = rounded.toString().split('.')[1];

      dollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if ( cents === undefined ) {
        cents = '00';
      } 
      if ( cents.length < 2 ) {
        cents = cents + '0';
      }

      let currency = dollars + '.' + cents + ' ' + symbol;

      if ( isShort ) {
        let dollarsArray = dollars.split(','),
            abbr = ['','K','M','B','T'];

        if ( dollarsArray.length > 1 ) {
          currency = Math.round(parseFloat(dollarsArray[0]+'.'+dollarsArray[1]) * 10)/10;
          currency = currency + abbr[dollarsArray.length - 1] + ' ' + symbol;
        }
      }

      return currency;

    },
  }
}
</script>

<style>

.Coin {
  margin-bottom: 24px;
  cursor: pointer;
}

.Coin .el-button {
  width: 100%;
  padding-top: 18px; 
  padding-bottom: 18px; 
}

.coin-dialog {
  min-width: 400px;
  max-width: 600px; 
}

.Coin h3 {
   white-space: nowrap;
}

</style>

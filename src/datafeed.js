import SelfWebSocket from './ws';
import axios from 'axios';

const getTimeRange = (resolution, to) => {
  let minutes = resolution;

  if (resolution.includes('D')) {
    if (resolution.length < 2) resolution = '1' + resolution;
    minutes = parseInt(resolution) * 24 * 60;
  } else if (resolution.includes('W')) {
    if (resolution.length < 2) resolution = '1' + resolution;
    minutes = parseInt(resolution) * 24* 60 * 7;
  } else if (resolution.includes('M')) {
    if (resolution.length < 2) resolution = '1' + resolution;
    minutes = parseInt(resolution) * 24 * 60 * 30;
  }

  let from = null;
  if (to) {
    from = to - 200 * minutes * 60;
    if (resolution.includes('M') || resolution.includes('W')) { // 周线月线控制条数
      from = to - 50 * minutes * 60;
    }
  }

  return {
    minutes,
    from,
    to,
  };
};

const resolutionFormat = resolution => {
  if (resolution.includes('D')) {
    if (resolution.length < 2) resolution = '1' + resolution;
    return parseInt(resolution) + 'd';
  } else if (resolution.includes('W')) {
    if (resolution.length < 2) resolution = '1' + resolution;
    return parseInt(resolution) + 'w';
  } else if (resolution.includes('M')) {
    if (resolution.length < 2) resolution = '1' + resolution;
    return parseInt(resolution) + 'M';
  } else {
    if (resolution/60 < 1) {
      return resolution + 'm';
    } else if (resolution/60 >= 1) { // todo
      return parseInt(resolution/60) + 'h';
    }
  }
  return '';
};

// 其它方法已删除 想要获取详细信息请查看官方文档
class DataFeeds {
  constructor() {
    this.realTimeWs = null;
    this.to = null;
  }

  onReady(callback) {
    const defaultConfiguration = {
      symbols_type: [],
      supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1M'],
      supports_marks: true,
      supports_timescale_marks: false,
      supports_time: false
    };
  
    callback(defaultConfiguration);
  }

  getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback, firstDataRequest) {
    const obj = getTimeRange(resolution, firstDataRequest ? rangeEndDate : this.to);
    this.to = obj.from;
    
    axios({
      url: 'https://api.urbn1w.cn/api/v1/klines',
      params: {
        symbol: symbolInfo.name,
        interval: resolutionFormat(resolution),
        startTime: obj.from * 1000,
        endTime: obj.to * 1000,
      },
      method: 'GET',
    }).then(res => {
      let data = [];
      if (res.status === 200) {
        for ( let i of res.data ) {
          data.push({
            time: Number(i[0]),
            open: i[1],
            close: i[4],
            high: i[2],
            low: i[3],
            volume: i[5],
          });
        }
        onDataCallback(data, { noData: !data.length });
      }
    });
  }

  subscribeBars (symbolInfo, resolution, onRealTimeCallback, listenerGUID, onResetCacheNeededCallback) {
    this.realTimeWs = new SelfWebSocket(symbolInfo.name, resolutionFormat(resolution));
    this.realTimeWs.onMessage((e) => {
      const data = JSON.parse(e.data);
      const bar = data.data.k;

      onRealTimeCallback({
        time: Number(bar.t),
        open: bar.o,
        close: bar.c,
        high: bar.h,
        low: bar.l,
        volume: bar.v,
      });
    });
  }

  unsubscribeBars() {
    this.realTimeWs.detory();
  }

  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    const newSymbol = Object.assign({}, {
      timezone: 'Asia/Shanghai',
      minmov: 1,
      minmov2: 0,
      pointvalue: 1,
      session: '24x7',
      has_seconds: false,
      has_daily: true,
      has_weekly_and_monthly: true,
      has_no_volume: false,
      has_empty_bars: true,
      description: '',
      has_intraday: true,
      supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '1D'],
      pricescale: 100000000, //价格精度
      volume_precision: 3, //数量精度
    }, {
      symbol: symbolName,
      ticker: symbolName,
      name: symbolName,
      pricescale: Math.pow(10, 4) || 8, //todo
      volume_precision: 3 || 3
    });
  
    onSymbolResolvedCallback(newSymbol);
  }
}

export default DataFeeds;

class SelfWebSocket {
  constructor(symbol, interval) {
    this.ws = new WebSocket(`wss://stream.urbn1w.cn/stream?streams=${symbol.toLowerCase()}@kline_${interval}`)
  }

  onMessage(callback) {
    this.ws.onmessage = e => {
      callback(e);
    };
  }

  detory() {
    this.ws.close();
  }
}

export default SelfWebSocket;
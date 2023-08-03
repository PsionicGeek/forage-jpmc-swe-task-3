import { ServerRespond } from './DataStreamer';

export interface Row {
    price_abc: number, // new field
    price_def: number, // new field

    ratio: number, // new field
  timestamp: Date,

    upper_bound: number, // new field
    lower_bound: number, // new field
    trigger_alert: number | undefined, // new field

}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    // new code
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;
    return {

        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
            serverResponds[0].timestamp : serverResponds[1].timestamp,
       upper_bound: upper_bound,
      lower_bound:  lower_bound,
        trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
    };
    // old code
    // return serverResponds.map((el: any) => {
    //   return {
    //     stock: el.stock,
    //     top_ask_price: el.top_ask && el.top_ask.price || 0,
    //     timestamp: el.timestamp,
    //   };
    // })
  }
}

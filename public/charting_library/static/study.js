// https://github.com/tradingview/charting_library/issues/4298 区域图

__customIndicators = [
  {
    name: "Bg_colorer",
    metainfo: {
      _metainfoVersion: 42,
      isTVScript: false,
      isTVScriptStub: false,
      is_hidden_study: false,
      isCustomIndicator: true,
      defaults: {
        styles: {},
        precision: 4,
        palettes: {
          palette_0: {
            colors: {
              "0": { color: "#34dddd", width: 1, style: 0 },
              "1": { color: "#006400", width: 1, style: 0 }
            }
          }
        },
        inputs: {}
      },
      plots: [{ id: "plot_0", palette: "palette_0", type: "bg_colorer" }],
      styles: {
        plot_0: { isHidden: false, title: "Background Color" }
      },
      description: "Bg_colorer",
      shortDescription: "Bg_colorer",
      is_price_study: true,
      palettes: {
        palette_0: {
          colors: {
            "0": { name: "Color 0" },
            "1": { name: "Color 1" }
          },
          valToIndex: { "0": 0, "1": 1 }
        }
      },
      inputs: [],
      id: "Bg_colorer@tv-basicstudies-1",
      scriptIdPart: "",
      name: "Bg_colorer"
    },
    constructor: function() {
      this.main = function(ctx, inputCallback) {
        var time = PineJS.Std.time(ctx);
        // somehow choose color index
        var colorIndex = new Date(time).getUTCMonth() % 2 === 0 ? 0 : 1;
        return [colorIndex];
      };
    }
  },
  {
    name: "Bar Colorer Demo",
    metainfo: {
      _metainfoVersion: 42,

      id: "BarColoring@tv-basicstudies-1",

      name: "BarColoring",
      description: "Bar Colorer Demo",
      shortDescription: "BarColoring",
      scriptIdPart: "",
      is_price_study: true,
      is_hidden_study: false,
      isCustomIndicator: true,

      isTVScript: false,
      isTVScriptStub: false,
      defaults: {
        precision: 4,
        palettes: {
          palette_0: {
            // palette colors
            // change it to the default colors that you prefer,
            // but note that the user can change them in the Style tab
            // of indicator properties
            colors: [{ color: "#FFFF00" }, { color: "#0000FF" }]
          }
        }
      },
      inputs: [],
      plots: [
        {
          id: "plot_0",

          // plot type should be set to 'bar_colorer'
          type: "bar_colorer",

          // this is the name of the palette that is defined
          // in 'palettes' and 'defaults.palettes' sections
          palette: "palette_0"
        }
      ],
      palettes: {
        palette_0: {
          colors: [{ name: "Color 0" }, { name: "Color 1" }],

          // the mapping between the values that
          // are returned by the script and palette colors
          valToIndex: {
            100: 0,
            200: 1
          }
        }
      }
    },
    constructor: function() {
      this.main = function(context, input) {
        this._context = context;
        this._input = input;

        var valueForColor0 = 100;
        var valueForColor1 = 200;

        // perform your calculations here and return one of the constants
        // that is specified as a key in 'valToIndex' mapping
        var result =
          (Math.random() * 100) % 2 > 1 // we randomly select one of the color values
            ? valueForColor0
            : valueForColor1;

        return [result];
      };
    }
  },
  {
    name: "custom-line",
    metainfo: {
      _metainfoVersion: 42,
      id: "custom-line@tv-basicstudies-2",
      scriptIdPart: "",
      name: "custom-line",
      description: "a custom line",
      shortDescription: "custom line",
      is_hidden_study: false,
      is_price_study: false,
      isCustomIndicator: true,
      plots: [{ id: "plot_0", type: "line" }],
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            visible: true,
            linewidth: 8,
            plottype: 2,
            // trackPrice: false, // 是否追踪最新的价格
            // transparency: 100,
            color: "#FC2929"
          }
        },
        // precision: 3,
        inputs: {}
      },
      styles: {
        plot_0: {
          title: " -- output name --",
          histogramBase: 0
        }
      },
      inputs: []
    },
    constructor: function() {
      this.main = function(context, inputCallback) {
        this._context = context;
        this._input = inputCallback;
        console.log(PineJS);
        const v = PineJS.Std.close(this._context);
        console.log(v);
        // return [v];
        return [0];
      };
    }
  },
  {
    name: "my_study",
    metainfo: {
      _metainfoVersion: 40,
      id: "my_study@tv-basicstudies-1",
      scriptIdPart: "",
      name: "my_study",
      description: "My Study",

      // This description will be displayed on the chart
      shortDescription: "My Study",

      is_hidden_study: false,
      is_price_study: true,
      isCustomIndicator: true,

      plots: [{ id: "plot_0", type: "line" }, { id: "plot_1", type: "line" }],
      area: [{ name: "plot_0" }, { name: "plot_1" }],
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            visible: true,

            // Plot line width.
            linewidth: 2,

            // Plot type:
            //    1 - Histogramm
            //    2 - Line
            //    3 - Cross
            //    4 - Area
            //    5 - Columns
            //    6 - Circles
            //    7 - Line With Breaks
            //    8 - Area With Breaks
            plottype: 2,

            // Show price line?
            trackPrice: false,

            // Plot transparency, in percent.
            transparency: 40,

            // Plot color in #RRGGBB format
            color: "#0000FF"
          },
          plot_1: {
            linestyle: 0,
            visible: true,

            // Plot line width.
            linewidth: 2,

            // Plot type:
            //    1 - Histogramm
            //    2 - Line
            //    3 - Cross
            //    4 - Area
            //    5 - Columns
            //    6 - Circles
            //    7 - Line With Breaks
            //    8 - Area With Breaks
            plottype: 2,

            // Show price line?
            trackPrice: false,

            // Plot transparency, in percent.
            transparency: 40,

            // Plot color in #RRGGBB format
            color: "#00FF00"
          }
        },

        // Area default style
        areaBackground: {
          backgroundColor: "#FF0000",
          fillBackground: true,
          transparency: 80
        },

        // Precision of the study's output values
        // (quantity of digits after the decimal separator).
        precision: 2,

        inputs: {}
      },
      styles: {
        plot_0: {
          // Output names will be displayed in the Style window
          title: "-- output name 1 --",
          histogramBase: 0
        },
        plot_1: {
          title: "-- output name 2 --",
          histogramBase: 0
        }
      },
      inputs: []
    },

    constructor: function() {
      this.init = function(context, inputCallback) {
        this._context = context;
        this._input = inputCallback;
      };

      this.main = function(context, inputCallback) {
        this._context = context;
        this._input = inputCallback;

        // You can use following built-in functions in PineJS.Std object:
        //    open, high, low, close
        //    hl2, hlc3, ohlc4
        var o = PineJS.Std.open(this._context);
        var c = PineJS.Std.close(this._context);
        var diff = Math.abs(o - c) / 2;
        return [Math.min(o, c) - diff, Math.max(o, c) + diff];
      };
    }
  },
  {
    name: "my-study1",
    metainfo: {
      _metainfoVersion: 40,
      id: "my-study1@tv-basicstudies-1",
      scriptIdPart: "",
      name: "my-study1",
      description: "my-study1",
      shortDescription: "different line color",
      is_hidden_study: false,
      is_price_study: false,
      isCustomIndicator: true,
      plots: [
        {
          id: "plot_0",
          type: "line"
        },
        {
          id: "plot_1",
          type: "colorer",
          target: "plot_0",
          palette: "paletteId1"
        }
      ],
      palettes: {
        paletteId1: {
          colors: {
            0: {
              name: "First color"
            },
            1: {
              name: "Second color"
            }
          }
        }
      },
      defaults: {
        palettes: {
          paletteId1: {
            colors: {
              0: {
                color: "red",
                width: 1,
                style: 0
              },
              1: {
                color: "blue",
                width: 3,
                style: 1
              }
            }
          }
        },
        styles: {},
        precision: 4,
        inputs: {}
      },
      styles: {
        plot_0: {
          title: "Equity value",
          histogramBase: 0
        }
      },
      inputs: []
    },
    constructor: function() {
      this.main = function(context, inputCallback) {
        this._context = context;
        this._input = inputCallback;

        var value = Math.random() * 200;

        return [value, value > 100 ? 0 : 1];
      };
    }
  },

  // {
  //   name: 'custom-arrow',
  //   metainfo: {
  //     "_metainfoVersion": 42,
  //     "id": 'custom-arrow@tv-basicstudies-2',
  //     "scriptIdPart": '',
  //     "name": 'custom-arrow',
  //     "description": 'custom arrow',
  //     "shortDescription": 'custom arrow',
  //     "is_hidden_study": false,
  //     "is_price_study": true,
  //     "isCustomIndicator": true,
  //     "plots": [{ "id": 'plot_0', type: 'circles'}, { id: 'plot_1', type: 'circles' }],
  //     "defaults": {
  //       styles: {
  //         'plot_0': {
  //           linestyle: 0,
  //           visible: true,
  //           // linewidth: 8,
  //           plottype: 6,
  //           color: '#FC2929',
  //         },
  //         'plot_0': {
  //           linestyle: 0,
  //           visible: true,
  //           // linewidth: 8,
  //           plottype: 6,
  //           color: '#FC2929',
  //         },
  //       },
  //       // precision: 3,
  //       inputs: {},
  //     },
  //     styles: {
  //       // 'plot_0': {
  //       //   title: ' -- output name --',
  //       //   histogramBase: 0,
  //       // },
  //     },
  //     inputs: [],
  //   },
  //   constructor: function () {
  //     this.init = function (context, inputCallback) {
  //       this.high = 0;
  //       this.low = null;
  //     };
  //     this.main = function (context, inputCallback) {
  //       this._context = context;
  //       this._input = inputCallback;

  //       const high = PineJS.Std.high(this._context);
  //       const low = PineJS.Std.low(this._context);

  //       if (high > this.high) this.high = high;
  //       if (low < this.low || !this.low) this.low = low;

  //       // return [v];
  //       console.log(this.high, this.low);
  //       return [this.high, this.low];
  //     };
  //   },
  // },
];

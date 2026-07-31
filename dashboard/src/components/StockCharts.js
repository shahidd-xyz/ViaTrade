import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";

import "./StockCharts.css";

const API = "http://localhost:8090/auth/upstox";

const StockChart = ({ instrumentKey }) => {
  const chartContainerRef = useRef(null);

  const chartRef = useRef(null);

  const candleSeriesRef = useRef(null);

  const volumeSeriesRef = useRef(null);

  const resizeObserver = useRef(null);

  const [timeFrame, setTimeFrame] = useState("1M");

  const getDateRange = useCallback(() => {
    const today = new Date();
    const from = new Date(today);

    switch (timeFrame) {
      case "1D":
        from.setDate(today.getDate() - 1);
        break;

      case "1W":
        from.setDate(today.getDate() - 7);
        break;

      case "1M":
        from.setMonth(today.getMonth() - 1);
        break;

      case "3M":
        from.setMonth(today.getMonth() - 3);
        break;

      case "6M":
        from.setMonth(today.getMonth() - 6);
        break;

      case "1Y":
        from.setFullYear(today.getFullYear() - 1);
        break;

      default:
        from.setMonth(today.getMonth() - 1);
    }

    return {
      from: from.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
    };
  }, [timeFrame]);

  const initializeChart = () => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
    }

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,

      height: 520,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#ffffff",
        },

        textColor: "#444",
      },

      grid: {
        vertLines: {
          color: "#f1f3f5",
        },

        horzLines: {
          color: "#f1f3f5",
        },
      },

      crosshair: {
        mode: CrosshairMode.Normal,
      },

      rightPriceScale: {
        borderColor: "#ddd",
      },

      timeScale: {
        borderColor: "#ddd",

        timeVisible: true,

        secondsVisible: false,
      },
    });

    candleSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: "#2d6a4f",

      downColor: "#d90429",

      borderVisible: false,

      wickUpColor: "#2d6a4f",

      wickDownColor: "#d90429",
    });

    volumeSeriesRef.current = chartRef.current.addHistogramSeries({
      color: "#90caf9",

      priceFormat: {
        type: "volume",
      },

      priceScaleId: "",
    });

    volumeSeriesRef.current.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,

        bottom: 0,
      },
    });
  };

  const fetchChartData = useCallback(async () => {
    console.log("Fetching chart...");

    try {
      const { from, to } = getDateRange();

      const response = await axios.get(`${API}/history`, {
        params: {
          instrument_key: instrumentKey,
          interval: "day",
          from,
          to,
        },
      });

      candleSeriesRef.current.setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [instrumentKey, getDateRange]);

  useEffect(() => {
    initializeChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    resizeObserver.current = new ResizeObserver((entries) => {
      if (!entries.length) return;

      const { width, height } = entries[0].contentRect;

      chartRef.current?.applyOptions({
        width,

        height,
      });

      chartRef.current?.timeScale().fitContent();
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="card shadow-sm border-0 stock-chart-card">
      <div className="card-header bg-white border-0">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center">
          <h5 className="fw-bold mb-3 mb-lg-0">Price Chart</h5>

          <div className="btn-group chart-timeframe" role="group">
            {["1D", "1W", "1M", "3M", "6M", "1Y"].map((item) => (
              <button
                key={item}
                className={`btn btn-sm ${
                  timeFrame === item ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setTimeFrame(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-body">
        <div ref={chartContainerRef} className="chart-container" />
      </div>
    </div>
  );
};

export default StockChart;

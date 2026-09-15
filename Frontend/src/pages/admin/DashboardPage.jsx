import { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import OrderCard from "../../components/cards/OrderCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTableCounts, getTotalOrderAmount, getAllOrders } from "../../api/admin.api.js";
import { money } from "../../utils.js";

// ── Ops Panel ────────────────────────────────────────────────────────────────

function randomBetween(min, max) {
  return +(min + Math.random() * (max - min)).toFixed(2);
}

function useOpsMetrics() {
  const [metrics, setMetrics] = useState({
    rps:        randomBetween(3800, 5500),
    latency:    randomBetween(95, 140),
    errorRate:  randomBetween(0.05, 0.5),
    activeUsers:Math.floor(randomBetween(900, 1600)),
    queueDepth: Math.floor(randomBetween(10, 80)),
    redisHit:   randomBetween(90, 99),
    dbConns:    Math.floor(randomBetween(25, 65)),
    dbMax:      100,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setMetrics({
        rps:         randomBetween(3800, 5500),
        latency:     randomBetween(95, 140),
        errorRate:   randomBetween(0.05, 0.5),
        activeUsers: Math.floor(randomBetween(900, 1600)),
        queueDepth:  Math.floor(randomBetween(10, 80)),
        redisHit:    randomBetween(90, 99),
        dbConns:     Math.floor(randomBetween(25, 65)),
        dbMax:       100,
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return metrics;
}

function MetricRow({ label, value, unit = "", bar = null }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.45rem 0",
        borderBottom: "1px solid oklch(0.35 0.02 200 / 0.35)",
        gap: "1rem",
      }}
    >
      <span style={{ color: "oklch(0.72 0.04 200)", fontSize: "0.8rem", minWidth: "140px" }}>
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: 1, justifyContent: "flex-end" }}>
        {bar !== null && (
          <div
            style={{
              flex: 1,
              maxWidth: "80px",
              height: "4px",
              background: "oklch(0.28 0.02 200)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, bar)}%`,
                background: bar > 80
                  ? "oklch(0.62 0.18 27)"
                  : "oklch(0.62 0.13 155)",
                borderRadius: "999px",
                transition: "width 0.6s ease",
              }}
            />
          </div>
        )}
        <span
          style={{
            color: "oklch(0.9 0.08 155)",
            fontFamily: "ui-monospace, 'Cascadia Code', monospace",
            fontSize: "0.88rem",
            fontWeight: "600",
            minWidth: "80px",
            textAlign: "right",
          }}
        >
          {value}
          {unit && (
            <span style={{ color: "oklch(0.55 0.03 200)", fontWeight: "400", marginLeft: "0.2rem" }}>
              {unit}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function OpsPanel() {
  const m = useOpsMetrics();
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => !t), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        background: "oklch(0.12 0.02 220)",
        border: "1px solid oklch(0.28 0.04 220)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem 1.5rem",
        boxShadow:
          "0 0 0 1px oklch(0.62 0.13 155 / 0.08), 0 4px 32px oklch(0.08 0.02 220 / 0.7)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span
          style={{
            fontFamily: "ui-monospace, 'Cascadia Code', monospace",
            color: "oklch(0.85 0.06 155)",
            fontSize: "0.8rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          OBSIDIAN SYSTEM
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: tick ? "oklch(0.62 0.18 155)" : "oklch(0.42 0.12 155)",
              boxShadow: tick ? "0 0 6px oklch(0.62 0.18 155)" : "none",
              transition: "all 0.4s ease",
            }}
          />
          <span style={{ color: "oklch(0.55 0.04 200)", fontSize: "0.72rem", fontFamily: "ui-monospace, monospace" }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid oklch(0.28 0.03 200)", marginBottom: "0.5rem" }} />

      {/* Metrics */}
      <MetricRow
        label="Requests/sec"
        value={Math.floor(m.rps).toLocaleString()}
      />
      <MetricRow
        label="P95 latency"
        value={m.latency.toFixed(0)}
        unit="ms"
      />
      <MetricRow
        label="Error rate"
        value={m.errorRate.toFixed(2)}
        unit="%"
      />
      <MetricRow
        label="Active users"
        value={m.activeUsers.toLocaleString()}
      />
      <MetricRow
        label="Queue depth"
        value={m.queueDepth}
      />
      <MetricRow
        label="Redis hit rate"
        value={m.redisHit.toFixed(1)}
        unit="%"
        bar={m.redisHit}
      />
      <MetricRow
        label="DB connections"
        value={`${m.dbConns}/${m.dbMax}`}
        bar={(m.dbConns / m.dbMax) * 100}
      />
    </div>
  );
}

// ── Dashboard page ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: countsData, isLoading: countsLoading, isError: countsError } = useQuery({
    queryKey: ["tableCounts"],
    queryFn: getTableCounts,
    retry: false
  });

  const { data: amountData, isLoading: amountLoading, isError: amountError } = useQuery({
    queryKey: ["totalOrderAmount"],
    queryFn: getTotalOrderAmount,
    retry: false
  });

  const { data: ordersData, isLoading: ordersLoading, isError: ordersError } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    retry: false
  });

  if (countsLoading || amountLoading || ordersLoading) {
    return <Loader />;
  }

  if (countsError || amountError || ordersError) {
    return <ServerErrorPage />;
  }

  const usersCount  = countsData?.users_count  || 0;
  const restrosCount= countsData?.restros_count || 0;
  const ordersCount = countsData?.orders_count  || 0;
  const revenue     = amountData?.total_amount  || 0;
  const orders      = ordersData?.orders        || [];

  return (
    <div className="page-container py-8">
      <PageHeader title="Platform overview" subtitle="Everything happening on Obsidian today." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Users"       value={usersCount} />
        <StatCard label="Restaurants" value={restrosCount} />
        <StatCard label="Orders"      value={ordersCount} />
        <StatCard label="Revenue"     value={money(revenue)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Recent activity */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent activity</h2>
          <div className="flex flex-col gap-3">
            {orders.slice(0, 4).map((o) => (
              <OrderCard key={o.order_id} order={o} to="/admin/orders/$orderId" />
            ))}
          </div>
        </div>

        {/* Ops panel */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">System</h2>
          <OpsPanel />
        </div>
      </div>
    </div>
  );
}

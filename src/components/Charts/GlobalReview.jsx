'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ViewAllButton from '../Common/ViewAllButton';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const GlobalReview = ({ timeFilter = null }) => {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setError(null);
        setLoading(true);
        const base = `${import.meta.env.VITE_BASE_URL}/api/v2/dashboard/merchant/kyc/analytics`;
        const params = new URLSearchParams({ organizationId: 'b1f714c5-96ae-4064-91d3-bd46403dbdf8' });
        if (timeFilter) params.set('time', timeFilter);
        const url = `${base}?${params.toString()}`;
        const res = await axios.post(url);
        setAnalytics(res.data?.data || null);
      } catch (e) {
        setError('Failed to load analytics');
        setAnalytics(null);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [timeFilter]);

  const isGeoMatchCountry = (geo, countryName) => {
    if (!countryName || !geo?.properties) return false;
    const target = countryName.toString().trim().toLowerCase();
    const props = geo.properties;
    const names = [props.NAME, props.name, props.NAME_LONG, props.ADMIN, props.FORMAL_EN]
      .filter(Boolean)
      .map((n) => n.toString().trim().toLowerCase());

    if (names.some((n) => n === target || n.includes(target) || target.includes(n))) {
      return true;
    }

    const iso3ByCountry = {
      pakistan: 'PAK',
    };
    const iso3 = (props.ISO_A3 || '').toString().trim().toUpperCase();
    if (iso3 && iso3ByCountry[target] && iso3 === iso3ByCountry[target]) return true;

    return false;
  };

  const handleMouseEnter = (geo, evt) => {
    if (!analytics) return;
    if (!isGeoMatchCountry(geo, analytics.country)) return;

    setTooltip({
      name: geo.properties.NAME || geo.properties.name || 'Unknown Country',
      success: analytics.verifiedRequests || 0,
      failed: analytics.failedRequests || 0,
    });
    setTooltipPos({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseMove = (evt) => {
    setTooltipPos({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="bg-[#FFFFFF0D] rounded-xl p-5 h-full relative">
      <div className="flex items-center justify-between w-full pb-6 relative">
        <h3 className="text-[#F9FAFB] font-semibold text-lg">Global Review</h3>
        <ViewAllButton href='/global-kyc'/>
      </div>
      <div className="w-full h-[130px] sm:h-[260px] leading-none relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/20 rounded-md">
            <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-[#FF842D] animate-spin"></div>
            <p className="mt-3 text-xs text-white/80">Loading…</p>
          </div>
        )}
        <ComposableMap
          projectionConfig={{ scale: 230 }}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            margin: 0,
            paddingTop: 0,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.id !== '010' && geo.properties.ISO_A3 !== 'ATA')
                .map((geo) => {
                  const active = analytics && isGeoMatchCountry(geo, analytics.country);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: active ? '#FF842D' : '#3E3E3E',
                          stroke: '#000',
                          strokeWidth: 0.5,
                          cursor: active ? 'pointer' : 'default',
                        },
                        hover: {
                          fill: active ? '#FF842D' : '#3E3E3E',
                          cursor: active ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: '#FF842D',
                        },
                      }}
                    />
                  );
                })
            }
          </Geographies>
        </ComposableMap>

        {tooltip && (
          <div
            className="text-sm text-white px-3 py-2 rounded-md shadow"
            style={{
              position: 'fixed',
              top: tooltipPos.y - 80,
              left: tooltipPos.x + 10,
              backgroundColor: '#3D3D3D',
              zIndex: 1000,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <div className="text-xs max-w-max font-medium bg-gradient-to-r from-[#FF842D] to-[#FF2D55] bg-clip-text text-transparent">
              {tooltip.name}
            </div>
            <div className="text-white text-xs whitespace-nowrap mt-1">
              Success: <span className="text-[#1EA51F]">{tooltip.success}</span>
            </div>
            <div className="text-white text-xs whitespace-nowrap">
              Failed: <span className="text-[#FF2D55]">{tooltip.failed}</span>
            </div>
          </div>
        )}

        {/* {error && (
          <div className="absolute bottom-2 left-2 text-xs text-red-400">{error}</div>
        )} */}
      </div>
    </div>
  );
};

export default GlobalReview;

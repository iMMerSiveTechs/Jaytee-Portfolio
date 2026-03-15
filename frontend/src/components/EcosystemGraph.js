import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Layers, Hammer, User } from 'lucide-react';

const nodes = [
  {
    id: 'jaytee',
    label: 'JayTee',
    desc: 'The operator at the center. Systems strategist, product thinker, builder.',
    icon: User,
    color: '#ffffff',
    x: 50,
    y: 50,
    center: true,
    status: 'Active',
    statusColor: '#34d399',
  },
  {
    id: 'nemurium',
    label: 'Nemurium',
    desc: 'The larger immersive ecosystem — the umbrella where products, systems, and tools live and compound.',
    icon: Globe,
    color: '#8b5cf6',
    x: 50,
    y: 10,
    status: 'Live',
    statusColor: '#34d399',
  },
  {
    id: 'immersivetech',
    label: 'iMMerSiveTechs',
    desc: 'Dedicated immersive technology layer. Spatial computing and XR tooling direction.',
    icon: Layers,
    color: '#00f0ff',
    x: 15,
    y: 75,
    status: 'In Progress',
    statusColor: '#f59e0b',
  },
  {
    id: 'vibeforge',
    label: 'VibeForge Studios',
    desc: 'The builder engine. Strategy turns to shipped product under real conditions.',
    icon: Hammer,
    color: '#3b82f6',
    x: 85,
    y: 75,
    status: 'Live',
    statusColor: '#34d399',
  },
];

const connections = [
  { from: 'jaytee', to: 'nemurium' },
  { from: 'jaytee', to: 'immersivetech' },
  { from: 'jaytee', to: 'vibeforge' },
];

export function EcosystemGraph() {
  const [hovered, setHovered] = useState(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative w-full" style={{ minHeight: '320px' }}>
      {/* SVG connections */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: 'none' }}
      >
        {connections.map((conn, i) => {
          const from = nodes.find((n) => n.id === conn.from);
          const to = nodes.find((n) => n.id === conn.to);
          const isHighlighted = hovered === conn.from || hovered === conn.to;
          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isHighlighted ? to.color : 'rgba(255,255,255,0.08)'}
              strokeWidth={isHighlighted ? 0.4 : 0.2}
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: 'easeInOut' }}
              style={{ transition: 'stroke 300ms, stroke-width 300ms' }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const Icon = node.icon;
        const isActive = hovered === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isActive ? 20 : 10,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-default transition-all duration-300"
              style={{
                background: isActive ? `${node.color}15` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? `${node.color}40` : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isActive ? `0 0 20px ${node.color}15` : 'none',
              }}
            >
              <Icon size={14} style={{ color: node.color }} />
              <span
                className="text-xs font-semibold whitespace-nowrap"
                style={{ color: isActive ? node.color : 'rgba(255,255,255,0.7)' }}
              >
                {node.label}
              </span>
              {node.status && (
                <span
                  className="flex items-center gap-1"
                  style={{ marginLeft: '4px' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: node.statusColor }} />
                  <span className="text-[0.55rem] font-medium" style={{ color: node.statusColor, opacity: 0.8 }}>
                    {node.status}
                  </span>
                </span>
              )}
            </div>
            {/* Tooltip */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 px-3 py-2 rounded-lg text-xs max-w-[180px] text-center"
                style={{
                  background: 'rgba(15,17,21,0.95)',
                  border: `1px solid ${node.color}25`,
                  color: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {node.desc}
                {node.status && (
                  <div className="flex items-center gap-1.5 mt-1.5 pt-1.5" style={{ borderTop: `1px solid ${node.color}15` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: node.statusColor }} />
                    <span className="text-[0.55rem] font-medium" style={{ color: node.statusColor }}>{node.status}</span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

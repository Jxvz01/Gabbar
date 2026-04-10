import React from 'react';

export const SystemBoot = ({ progress, bootStats }) => (
  <div className="boot-screen">
    <div className="boot-content">
      <div className="boot-label">INITIALIZING_GABBAR_CORE</div>
      <div className="boot-bar-container">
        <div className="boot-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="boot-stats">
        <span>STATUS: {progress < 100 ? 'LINKING_NODES' : 'READY'}</span>
        <span>LATENCY: {bootStats.ping}ms</span>
        <span>LOAD: {bootStats.load}%</span>
      </div>
      <span className="percent-v6">{progress}%</span>
    </div>
  </div>
);

/**
 * Generate 10 template variations for each wedding card section
 * Each template uses descriptive CSS variable names for AI clarity
 */

const fs = require('fs');
const path = require('path');

// Color theme definitions - each with distinct palette
const COLOR_THEMES = [
  {
    name: 'Royal Burgundy',
    vars: { '--bg-page': '#1a0505', '--bg-card': '#2b0a0a', '--accent-gold': '#c9a84c', '--accent-gold-light': '#e8c97a', '--c-ivory': '#f5e6c7', '--text-muted': '#a08575' }
  },
  {
    name: 'Emerald Garden',
    vars: { '--bg-page': '#0a1f1a', '--bg-card': '#1a3a2f', '--accent-gold': '#d4af37', '--accent-gold-light': '#f4d03f', '--c-ivory': '#f0ead6', '--text-muted': '#8fa89e' }
  },
  {
    name: 'Midnight Blue',
    vars: { '--bg-page': '#0a1628', '--bg-card': '#1a2f4a', '--accent-gold': '#c9b037', '--accent-gold-light': '#e8d47a', '--c-ivory': '#e8f0f8', '--text-muted': '#7a8fa8' }
  },
  {
    name: 'Blush Romance',
    vars: { '--bg-page': '#2a1a1f', '--bg-card': '#3a2a2f', '--accent-gold': '#d4a8a8', '--accent-gold-light': '#f4c8c8', '--c-ivory': '#f8e8e8', '--text-muted': '#a88a8a' }
  },
  {
    name: 'Forest Moss',
    vars: { '--bg-page': '#0f1a0f', '--bg-card': '#1a2a1a', '--accent-gold': '#a8b868', '--accent-gold-light': '#c8d888', '--c-ivory': '#e8f0e0', '--text-muted': '#7a8a6a' }
  },
  {
    name: 'Plum Velvet',
    vars: { '--bg-page': '#1a0a1a', '--bg-card': '#2a1a2a', '--accent-gold': '#c98ac9', '--accent-gold-light': '#e8aae8', '--c-ivory': '#f8e8f8', '--text-muted': '#a07aa0' }
  },
  {
    name: 'Ocean Teal',
    vars: { '--bg-page': '#0a1a1f', '--bg-card': '#1a2f3a', '--accent-gold': '#68b8c8', '--accent-gold-light': '#88d8e8', '--c-ivory': '#e0f0f8', '--text-muted': '#6a8a9a' }
  },
  {
    name: 'Warm Amber',
    vars: { '--bg-page': '#1f1a0a', '--bg-card': '#3a2f1a', '--accent-gold': '#d4b068', '--accent-gold-light': '#f4d088', '--c-ivory': '#f8f0e0', '--text-muted': '#9a8a6a' }
  },
  {
    name: 'Slate Silver',
    vars: { '--bg-page': '#0f1218', '--bg-card': '#1a1f2a', '--accent-gold': '#a8b0b8', '--accent-gold-light': '#c8d0d8', '--c-ivory': '#e8eef8', '--text-muted': '#7a808a' }
  },
  {
    name: 'Rose Gold',
    vars: { '--bg-page': '#1f0f14', '--bg-card': '#3a1a24', '--accent-gold': '#d48898', '--accent-gold-light': '#f4a8b8', '--c-ivory': '#f8e0e8', '--text-muted': '#9a6a7a' }
  }
];

const SECTIONS = ['cover', 'hero', 'lovestory', 'scratch', 'countdown', 'music', 'gallery', 'venue', 'rsvp', 'events', 'dresscode'];

// Base templates for each section type (simplified structure)
const BASE_TEMPLATES = {
  hero: {
    fields: [
      { key: 'brideFamily', type: 'text', label: "Bride's Family", required: true },
      { key: 'groomFamily', type: 'text', label: "Groom's Family", required: true },
      { key: 'brideName', type: 'text', label: 'Bride Name', required: true },
      { key: 'groomName', type: 'text', label: 'Groom Name', required: true },
      { key: 'date', type: 'text', label: 'Wedding Date & Time', required: true },
      { key: 'venue', type: 'text', label: 'Venue', required: true },
      { key: 'hashtag', type: 'text', label: 'Couple Hashtag', required: false }
    ],
    defaults: { brideFamily: 'The Sharma Family', groomFamily: 'The Verma Family', brideName: 'Vanya', groomName: 'Atharv', date: '23rd November 2026', venue: 'The Grand Palace, Delhi', hashtag: '#VanyaWedsAtharv' }
  },
  music: {
    fields: [
      { key: 'footerNote', type: 'text', label: 'Footer Note', required: true },
      { key: 'musicUrl', type: 'text', label: 'Background Music URL', required: false },
      { key: 'musicLabel', type: 'text', label: 'Music Button Tooltip', required: false }
    ],
    defaults: { footerNote: 'Made with love, for our favorite people.', musicUrl: '', musicLabel: 'Play Music' }
  }
};

console.log('Template generation script ready.');
console.log('Sections:', SECTIONS.join(', '));
console.log('Color themes:', COLOR_THEMES.map(t => t.name).join(', '));

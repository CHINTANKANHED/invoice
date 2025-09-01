import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type BilledBy = {
  name: string;
  address: string;
  email?: string;
  phone?: string;
  logo?: string;
};

export type Settings = {
  subscribe: any;
  currency: string;
  billedBy: BilledBy;
};

const KEY = 'invoice_settings_v1';

const defaultSettings: Settings = {
  currency: 'USD',
  billedBy: {
    name: 'Anujit',
    address: 'D 901 MSR Seasons',
    email: '',
    phone: ''
  },
  subscribe: undefined
};

function createSettingsStore() {
  const { subscribe, set, update } = writable<Settings>(defaultSettings);

  function load() {
    if (!browser) return;
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        set(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse settings from localStorage', e);
      }
    }
  }

  function persist(value: Settings) {
    if (!browser) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }

  return {
    subscribe,
    set: (v: Settings) => {
      set(v);
      persist(v);
    },
    update: (fn: (curr: Settings) => Settings) => {
      update((curr) => {
        const next = fn(curr);
        persist(next);
        return next;
      });
    },
    load
  };
}

export const settingsStore = createSettingsStore();

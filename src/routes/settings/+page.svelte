<script lang="ts">
  import { settingsStore } from '$lib/stores/settings';

let errors = {
    currency: '',
    name: '',
    address: '',
    email: '',
    phone: ''
  };
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const phoneRegex = /^[0-9]{7,10}$/; 


  function validate(): boolean {
    errors = {
      currency: $settingsStore.currency ? '' : 'Currency is required',
      name: $settingsStore.billedBy.name.trim() ? '' : 'Name is required',
      address: $settingsStore.billedBy.address.trim() ? '' : 'Address is required',
      email: emailRegex.test(($settingsStore.billedBy.email ?? '').trim()) ? '' : 'Email is required',
      phone: phoneRegex.test(($settingsStore.billedBy.phone ?? '').trim()) ? '' : 'Phone is required'
    };

    return Object.values(errors).every((e) => !e);
  }

  function save() {
    if (!validate()) {
      alert('Please fill all required fields.');
      return;
    }

    settingsStore.set($settingsStore);
    alert('Settings saved');
  }

  function reset() {
    settingsStore.set({
      currency: 'USD',
      billedBy: { name: '', address: '', email: '', phone: '' },
      subscribe: undefined
    });
    errors = {
      currency: '',
      name: '',
      address: '',
      email: '',
      phone: ''
    };
  }
</script>

<style>
  .page { max-width:700px; margin:24px auto }
  input, textarea, select { width:100%; padding:8px; margin-bottom:4px }
  label { font-weight:bold; margin-top:10px; display:block; }
  .error { color:red; font-size:0.9em; margin-top:-4px; margin-bottom:8px; }
  button { padding:8px 12px; border-radius:6px; margin-right:8px; }
</style>

<div class="page">
  <h2>Settings</h2>

  <label for="currency">Currency</label>
  <select bind:value={$settingsStore.currency}>
    <option value="USD">USD ($)</option>
    <option value="EUR">EUR (€)</option>
    <option value="INR">INR (₹)</option>
    <option value="GBP">GBP (£)</option>
    <option value="AUD">AUD</option>
  </select>
  {#if errors.currency}<div class="error">{errors.currency}</div>{/if}

  <h3>Billed By</h3>

  <label for="Name">Name</label>
  <input bind:value={$settingsStore.billedBy.name} placeholder="Company or your name" />
  {#if errors.name}<div class="error">{errors.name}</div>{/if}

  <label for="Address">Address</label>
  <textarea rows={3} bind:value={$settingsStore.billedBy.address} placeholder="Address"></textarea>
  {#if errors.address}<div class="error">{errors.address}</div>{/if}

  <label for="Email">Email</label>
  <input type="email" bind:value={$settingsStore.billedBy.email} placeholder="Email" />
  {#if errors.email}<div class="error">{errors.email}</div>{/if}

  <label for="Phone">Phone</label>
  <input bind:value={$settingsStore.billedBy.phone} placeholder="Phone" />
  {#if errors.phone}<div class="error">{errors.phone}</div>{/if}


  <div style="margin-top:10px;display:flex;gap:8px">
    <button on:click={save}>Save</button>
    <button on:click={reset}>Reset</button>
  </div>
</div>

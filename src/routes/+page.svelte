<script lang="ts">
  import { onMount } from 'svelte';
  import { settingsStore } from '$lib/stores/settings';
  import { generateInvoicePDF } from '$lib/utils/pdf';
  import { convertToINR } from '$lib/api/currency';

  type Item = { id: string; Name: string; qty: number; rate: number };

  
  let number = 1;
  let date = new Date().toLocaleDateString();
  let billTo = '';
  let paymentTerms = '';
  let dueDate = '';
  let poNumber = '';

  let fromWho = '';
  let billToOptional = '';
  let notes = '';
  let terms ='';
  let discount =0;
  let taxPercent = 0;
  let amountPaid = 0;
  let balanceDue = 0;
  let items: Item[] = [{ id: uid(), Name: '', qty: 1, rate: 0 }];

  let convertedToINR =' ';
  let converting = false;
  let apiData: any = null;

  function uid() {
    return Math.random().toString(36).slice(2,9);
  }

  function addLine() {
    items = [...items, { id: uid(), Name: '', qty: 1, rate: 0 }];
  }

  function removeLine(id: string) {
    items = items.filter(i => i.id !== id);
  }

  $: subtotal = items.reduce((s, it) => s + (it.qty * it.rate), 0);
  $: taxAmount = Number(((subtotal * (taxPercent/100))||0).toFixed(2));
  $: total = Number((subtotal + taxAmount).toFixed(2));
  $: balanceDue = total - amountPaid;
  

  async function handleDownloadPDF() {
    const invoiceData = {
      number, date, paymentTerms, dueDate, poNumber, fromWho, billTo, billToOptional, notes, taxPercent, subtotal, discount, taxAmount, total, amountPaid,
      balanceDue, terms,
      items: items.map(i => ({ Name: i.Name, qty: i.qty, rate: i.rate })),
      currency: $settingsStore.currency,
      billedBy: $settingsStore.billedBy
    };
    await generateInvoicePDF(invoiceData);
  }

  async function handleConvertToINR() {
    converting = true;
    try {
      const resp = await convertToINR(total, $settingsStore.currency);
      apiData=resp;
      convertedToINR = new Intl.NumberFormat('en-IN', {
				style: 'currency',
				currency: 'INR',
				maximumFractionDigits: 2
			}).format(resp.converted);
    } catch (err) {
      console.error(err);
      alert('Conversion failed (see console)');
    } finally {
      converting = false;
    }
  }
  

  onMount(() => {});
</script>

<!-- <style>
  .page { max-width:1200px;margin:24px auto;padding:12px;display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px; }
  .panel { background: #fff;
    color: #090404;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold; }
   h2 {
    text-align: right;
    margin-bottom: 16px;
  }
  input, textarea, select {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  table { width:100%; border-collapse: collapse; margin-top:12px }
  th, td { border:1px solid #eee; padding:8px; text-align:left }
  .totals {
    margin-top: 16px;
    text-align: right;
  }
  .totals div {
    margin-bottom: 4px;
  }
  .link {
    color: #2cb77c;
    cursor: pointer;
  }
  button { padding:8px 12px; border-radius:6px; cursor:pointer }
</style> -->

<style>

  .invoice {
    max-width: 1100px;
    margin: 24px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }

  h2 {
    text-align: center;
    margin-bottom: 24px;
  }

  /* Top Section (Billed by / Bill to) */
  .header-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  .logo-box {
    border: 2px dashed #ccc;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    border-radius: 6px;
    background: #fdfdfd;
    font-size: 14px;
    color: #777;
  }

  .info-box label {
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
  }

  input, textarea, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
  }

  textarea {
    resize: vertical;
  }

  /* Items Table */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
  }

  th, td {
    border: 1px solid #eee;
    padding: 10px;
    text-align: left;
  }

  thead {
    background: #0f3b76;
    color: #fff;
  }

  tbody tr:nth-child(even) {
    background: #f9f9f9;
  }

  .add-item-btn {
    margin-top: 10px;
    padding: 8px 14px;
    background: #2cb77c;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
  }

  /* Totals Section */
  .totals-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .totals-box {
    min-width: 260px;
    text-align: right;
    font-size: 14px;
  }

  .totals-box div { margin-bottom: 6px; }

  .totals-box strong { font-size: 16px; }

  /* Notes / Terms */
  .extra-section {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  /* Actions Panel */
  .actions-panel {
    margin-top: 30px;
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fafafa;
  }

  .actions-panel h3 { margin-bottom: 12px; }

  .actions-panel button {
    padding: 10px 14px;
    border: none;
    border-radius: 6px;
    background: #0f3b76;
    color: white; cursor: pointer; font-weight: 600;
  }

  .actions-panel button + button { margin-top: 10px; background: #2cb77c;}
  .link { color: #2cb77c; font-size: 14px; cursor: pointer; }

  /* Responsive */
  @media (max-width: 768px) {
    .header-section,
    .extra-section {
      grid-template-columns: 1fr;
    }
    .totals-section {
      justify-content: center;
    }
    .totals-box {
      text-align: center;
    }
  }
</style>

    <div class="invoice">
      <h2>Invoice</h2>
      <div class="header-section">
    <!-- Left: Billed By -->
    <div>
      <div class="logo-box">+ Add Your Logo</div>
      <div><strong>Billed by:</strong> {$settingsStore.billedBy.name}</div>
      <div>{$settingsStore.billedBy.address}</div>
      <div>{$settingsStore.billedBy.email}</div>
      <div>{$settingsStore.billedBy.phone}</div>
      </div>

       <div>
      <div class="info-box">
        <label for="Invoice">Invoice #</label>
        <input type="number" bind:value={number} />
      </div>
      <div class="info-box">
        <label for="Date">Date</label>
        <input type="date" bind:value={date} />
      </div>
      <div class="info-box">
        <label for="Payment Terms">Payment Terms</label>
        <input bind:value={paymentTerms} />
      </div>
      <div class="info-box">
        <label for="Due Date">Due Date</label>
        <input type="date" bind:value={dueDate} />
      </div>
      <div class="info-box">
        <label for="PO Number">PO Number</label>
        <input bind:value={poNumber} />
      </div>
    </div>
  </div>

      <div class="info-box" style="margin-bottom:20px;">
    <label for="bill To">Bill To</label>
    <input bind:value={billTo} placeholder="Client name / company" />
      </div>

      <!-- <table>
        <thead style="background:#0f3b76;color:white;">
          <tr><th>Item</th><th style="width:80px">Qty</th><th style="width:120px">Rate ({$settingsStore.currency})</th><th style="width:120px">Amount</th><th style="width:50px"></th></tr>
        </thead>
        <tbody>
          {#each items as it (it.id)}
            <tr>
              <td><input bind:value={it.Name} placeholder="Name" /></td>
              <td><input type="number" bind:value={it.qty} min="0" /></td>
              <td><input type="number" bind:value={it.rate} step="0.01" min="0" /></td>
              <td style="text-align:right">{(it.qty*it.rate).toFixed(2)}</td>
              <td style="text-align:center"><button on:click={() => removeLine(it.id)}>✕</button></td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div style="margin-top:10px"><button on:click={addLine}>+ Add Item</button></div> -->

      <table>
    <thead>
      <tr>
        <th>Item</th>
        <th style="width:80px">Qty</th>
        <th style="width:120px">Rate ({$settingsStore.currency})</th>
        <th style="width:120px">Amount</th>
        <th style="width:50px"></th>
      </tr>
    </thead>
    <tbody>
      {#each items as it (it.id)}
        <tr>
          <td><input bind:value={it.Name} placeholder="Name" /></td>
          <td><input type="number" bind:value={it.qty} min="0" /></td>
          <td><input type="number" bind:value={it.rate} step="0.01" min="0" /></td>
          <td style="text-align:right">{(it.qty*it.rate).toFixed(2)}</td>
          <td style="text-align:center"><button on:click={() => removeLine(it.id)}>✕</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
  <button class="add-item-btn" on:click={addLine}>+ Add Item</button>

      <div class="totals-section">
    <div class="totals-box">
      <div>Subtotal: {subtotal.toFixed(2)}</div>
      <div>Tax %: <input type="number" bind:value={taxPercent} style="width:60px" /> (Tax: {taxAmount.toFixed(2)})</div>
      <div><strong>Total: {total.toFixed(2)}</strong></div>
    </div>
  </div>

     <div class="extra-section">
    <div>
      <label for="Notes">Notes</label>
      <textarea bind:value={notes} rows={4} placeholder="Notes"></textarea>
    </div>
    <div>
      <label for="Terms">Terms</label>
      <textarea bind:value={terms} rows={4} placeholder="Terms and conditions - late fees, payment methods, delivery schedule"></textarea>
    </div>
  </div>

    <div class="totals-section" style="margin-top:20px;">
    <div class="totals-box">
      <div>+ Discount: <input type="number" bind:value={discount} style="width:80px;" /></div>
      <div>+ Tax: <input type="number" bind:value={taxPercent} style="width:80px;" /></div>
      <div><strong>Total: {total.toFixed(2)}</strong></div>
      <div>Amount Paid: <input type="number" bind:value={amountPaid} style="width:80px;" /></div>
      <div><strong>Balance Due: {balanceDue.toFixed(2)}</strong></div>
    </div>
  </div>

    <div class="actions-panel">
      <h3>Actions</h3>  
      <div style="display:flex;flex-direction:column;gap:8px"></div>
        <button on:click={handleDownloadPDF}>⬇️ Download PDF</button>
        <button on:click={handleConvertToINR} disabled={converting}>{converting ? 'Converting...' : `Show total in INR (from ${$settingsStore.currency})`}</button>
        {#if convertedToINR}<div> {convertedToINR}</div>{/if}
        {#if apiData}
	          <h3>JSON</h3>
	          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        {/if}
         <div style="margin-top:20px;">
      <label for="Theme">Theme</label>
      <select>
        <option>Classic</option>
        <option>Modern</option>
      </select>
      </div>
        <div style="margin-top:12px"><strong>Currency:</strong> {$settingsStore.currency}</div>
        <div style="margin-top:16px;" class="link">Save Default</div>
        <div style="margin-top:8px"><small>Change default currency & billed-by: <a href="/settings">$settingsStore</a></small></div>
      </div>
    </div>

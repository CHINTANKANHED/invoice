<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	const { data, children } = $props<{
		data: { user: { email: string } | null };
		children: any;
	}>();

	async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		await invalidateAll(); 
		goto('/auth/signin');
	}
</script>
<!-- Header -->
<nav style="background:#fff;border-bottom:1px solid #eee;padding:12px 20px">
  <div style="max-width:1200px;margin:0 auto;display:flex;gap:14px;align-items:center">
     <!-- Left Logo -->
    <div style="display:flex;align-items:center;gap:6px;font-weight:bold;font-size:18px;">
      <div style="width:28px;height:28px;background:linear-gradient(135deg,#2cb77c,#0f3b76);border-radius:4px;"></div>
      <span>Invoice-Generator<span style="color:#777;font-weight:normal"></span></span>
    </div>
    <!-- Right Nav -->
    <div style="display:flex;align-items:center;gap:20px;font-size:15px;">
    <a href="/">Home</a>
    <a href="/settings">Settings</a>
    <a href="/about">About</a>
    <a href="/guide" >Invoicing Guide</a>
    <div style="display:flex;align-items:center;gap:14px;">
        {#if data.user}
          <!-- ✅ Logged-in state -->
          <a href="/dashboard" style="font-weight:bold;">Dashboard</a>
          <button
            onclick={logout}
            style="background:#e63946;color:#fff;padding:6px 14px;border-radius:4px;font-weight:bold;border:0;cursor:pointer;"
          >
            Logout
          </button>
        {:else}
          <!-- ✅ Logged-out state -->
          <a
            href="/auth/signin"
            style="background:#2cb77c;color:#fff;padding:6px 14px;border-radius:4px;font-weight:bold;"
          >Sign In</a>

          <a
            href="/auth/signup"
            style="background:#2cb77c;color:#fff;padding:6px 14px;border-radius:4px;font-weight:bold;"
          >Sign Up</a>
        {/if}
      </div>
    </div>
  </div>
</nav>

<!-- Main Content -->
<main style="min-height:70vh;">
  {@render children?.()}
</main>

<!-- Footer -->
<footer style="background:#f9f9f9;border-top:1px solid #eee;padding:30px 20px;margin-top:40px;">
  <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:40px;">
    
    <!-- Left Column -->
    <div>
      <h4 style="margin-bottom:10px;">USE INVOICE GENERATOR</h4>
      <ul style="list-style:none;padding:0;margin:0;line-height:1.8;">
        <li><a href="/invoice-template">Invoice Template</a></li>
        <li><a href="/credit-note-template">Credit Note Template</a></li>
        <li><a href="/quote-template">Quote Template</a></li>
        <li><a href="/purchase-order-template">Purchase Order Template</a></li>
      </ul>
    </div>

    <!-- Right Column -->
    <div>
      <h4 style="margin-bottom:10px;">RESOURCES</h4>
      <ul style="list-style:none;padding:0;margin:0;line-height:1.8;">
        <li><a href="/guide">Invoicing Guide</a></li>
        <li><a href="/help">Help</a></li>
        <li><a href="/signin">Sign In</a></li>
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/release-notes">Release Notes</a></li>
        <li><a href="/developer-api">Developer API</a></li>
      </ul>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div style="max-width:1200px;margin:40px auto 0;display:flex;flex-direction:column;align-items:center;gap:10px;font-size:14px;color:#666;">
    <div>© 2025 Invoice-Generator.com</div>
    
    <!-- Social Icons (placeholder text, can swap to SVGs/icons) -->
    <div style="display:flex;gap:12px;font-size:18px;">
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#">📘</a>
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#">𝕏</a>
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#">▶️</a>
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#">💼</a>
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#">🌐</a>
    </div>

    <!-- Legal -->
    <div style="display:flex;gap:14px;">
      <a href="/terms">Terms of Service</a>
      <a href="/privacy">Privacy Policy</a>
      <a href="/cookies">Cookie Settings</a>
    </div>
  </div>
</footer>

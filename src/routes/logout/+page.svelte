<!-- src/routes/dashboard/+page.svelte (example) -->
<script lang="ts">
  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    // after logout, user will be redirected automatically by server
  }
</script>

<button on:click={logout}>
  Logout
</button>

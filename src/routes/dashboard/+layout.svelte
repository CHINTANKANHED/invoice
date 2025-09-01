<script lang="ts">
  import { goto } from "$app/navigation";

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    goto("/signin");
  }
</script>

<!-- <nav class="flex gap-4 p-4 bg-gray-200">
  <a href="/dashboard">Dashboard</a>
  <a href="/profile">Profile</a>
  <button on:click={logout} class="text-red-600">Logout</button>
</nav> -->

<slot /> 

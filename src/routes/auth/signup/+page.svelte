<script lang="ts">
	import { goto } from "$app/navigation";

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let error = '';

	async function signup() {
		try {
			const res = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ firstName, lastName, email, password })
			});

			if (res.ok) {
				// ✅ signup success → redirect to signin
				goto('/auth/signin');
			} else {
				// ❌ failed → show error
				const data = await res.json().catch(() => ({}));
				error = data.error || "Signup failed. Please try again.";
			}
		} catch (err) {
			error = "Network error. Please try again later.";
		}
	}
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-50">
  <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
    <h1 class="text-2xl font-bold mb-4">Create a free account</h1>
    {#if error}<p class="text-red-500">{error}</p>{/if}
    <input class="w-full border p-2 mb-2 rounded" type="text" bind:value={firstName} placeholder="First Name" />
    <input class="w-full border p-2 mb-2 rounded" type="text" bind:value={lastName} placeholder="Last Name" />
    <input class="w-full border p-2 mb-2 rounded" type="email" bind:value={email} placeholder="Email" />
    <input class="w-full border p-2 mb-4 rounded" type="password" bind:value={password} placeholder="Password" />
    <button on:click={signup} class="w-full bg-green-600 text-white p-2 rounded">Sign Up</button>
    <p class="mt-4 text-sm">Already have an account? <a href="/signin" class="text-green-600">Sign In</a></p>
  </div>
</div>

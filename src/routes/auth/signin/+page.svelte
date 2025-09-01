<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";

  let email = '';
  let password = '';
  let error = '';
  let success = '';
  
  // async function login() {
  //   authLoading.set(true); // 🔹 start loading
  //   error = '';
  // }
 async function signin(e: Event) {
    e.preventDefault(); // stop native form submit

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      await invalidateAll();
      goto('/dashboard'); // ✅ redirect after success
    } else {
      error = data.error || "Failed to sign in";
    }
  }

  //   if (!res.ok) {
  //     error = data.error;
  //     success = '';
  //   } else {
  //     error = '';
  //     success = 'Sign in successful!';
  //     alert("✅ Sign in successful!");
  //     localStorage.setItem('token', data.token);
  //     window.location.href = '/dashboard';
  //   }
  // }


  function signinWithGoogle() {
    window.location.href = '/api/auth/google';
  }
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
  <!-- Logo + Title -->
  <div class="flex items-center mb-6">
    <img src="/logo.svg" alt="Invoice Logo" class="h-10 w-10 mr-2" />
    <h1 class="text-2xl font-bold text-gray-800">
      Invoice-Generator<span class="text-green-600">.com</span>
    </h1>
  </div>

  <!-- Sign In Card -->
  <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
    <h2 class="text-xl font-semibold text-center mb-1">Sign In</h2>
    <p class="text-gray-500 text-center mb-6">Welcome back!</p>

    {#if error}
      <p class="text-red-500 text-sm mb-3">{error}</p>
    {/if}

    <!-- ✅ Wrap inputs inside a form -->
    <form method="POST" action="/api/signin" class="flex flex-col gap-4">
      <!-- Email -->
      <label for="Email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        bind:value={email}
        placeholder="Enter your email"
        class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
        required
      />

      <!-- Password -->
      <div class="flex justify-between items-center mb-1">
        <label for="Password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
        type="password"
        bind:value={password}
        placeholder="Enter your password"
        class="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
        required
      />
      <br>
        <a href="/forgot-password" class="text-sm text-green-600 hover:underline">Forgot password?</a>
      </div>
      

      <!-- Keep me logged in -->
      <div class="flex items-center mb-4">
        <input id="remember" type="checkbox" class="h-4 w-4 text-green-600 border-gray-300 rounded" checked />
        <label for="remember" class="ml-2 block text-sm text-gray-700">Keep me logged in</label>
      </div>

      <!-- Sign In Button -->
      <button on:click={signin}
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md font-medium"
      >
        Sign In
      </button>
    </form>

    <!-- Sign Up Link -->
    <p class="mt-6 text-sm text-center text-gray-600">
      Don’t have an account?
      <a href="/auth/signup" class="text-green-600 font-medium hover:underline">Sign Up</a>
    </p>
  </div>
</div>

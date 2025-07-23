<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="min-h-screen">
    <!-- Navigation Bar -->
    <nav class="bg-primary px-6 py-4 shadow-lg">
      <div
        class="container mx-auto flex max-w-7xl items-center justify-between"
      >
        <div class="flex items-center">
          <img
            src="~/assets/shadows-logo.svg"
            alt="Shadows"
            class="h-6 w-auto"
          />
        </div>
        <a
          href="https://github.com/jcz530/shadows"
          title="View on Github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-foreground transition-colors hover:text-primary-foreground/80"
        >
          <Github class="h-6 w-6" />
        </a>
      </div>
    </nav>

    <div class="container mx-auto max-w-7xl px-4 py-8">
      <!-- Page Content -->
      <slot />
    </div>

    <!-- Additional Content -->
    <div class="container mx-auto max-w-7xl px-4 py-8 text-center">
      <p class="text-muted-foreground">
        Want to nerd out some more on Box Shadows? Take a read of 
        <a 
          href="https://joeczubiak.com/box-shadows/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-purple-600 hover:text-purple-700 underline"
        >
          this
        </a>
      </p>
    </div>

    <!-- Footer -->
    <footer class="w-full">
      <div class="bg-purple-600 py-4">
        <div class="flex items-center justify-center gap-4 text-white">
          <Button
            class="hover:bg-purple-700 hover:text-white"
            variant="ghost"
            href="https://github.com/jcz530/shadows"
            target="_blank"
            rel="noopener"
          >
            <Github class="h-4 w-4" />
          </Button>
          <Button
            class="hover:bg-purple-700 hover:text-white"
            variant="ghost"
            href="https://joeczubiak.com?ref=shadows"
            target="_blank"
            rel="noopener"
          >
            <span class="text-xs uppercase">Built by</span>
            <img
              class="d-inline"
              style="height: 1em"
              src="https://joeczubiak.com/images/joe-czubiak-logo.svg"
              width="35"
              height="14"
              alt="Joe Czubiak logo"
            />
          </Button>
        </div>
      </div>
      <div class="bg-purple-700 py-4">
        <div class="flex items-center justify-center gap-1 text-white">
          <span class="font-light"
            >2021 - {{ new Date().getFullYear() }} —
          </span>
          Shadows: A CSS Box Shadow Generator
        </div>
      </div>
    </footer>
  </div>
</template>

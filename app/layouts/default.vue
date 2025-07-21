<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="min-h-screen">
    <!-- Navigation Bar -->
    <nav class="bg-primary px-6 py-4 shadow-lg">
      <div
        class="container mx-auto max-w-7xl flex items-center justify-between"
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
          class="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
        >
          <Github class="w-6 h-6" />
        </a>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Page Content -->
      <slot />
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
            <Github class="w-4 h-4" />
          </Button>
          <Button
            class="hover:bg-purple-700 hover:text-white"
            variant="ghost"
            href="https://joeczubiak.com?ref=shadows"
            target="_blank"
            rel="noopener"
          >
            <span class="uppercase text-xs">Built by</span>
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
        <div class="flex items-center justify-center text-white gap-1">
          <span class="font-light"
            >2021 - {{ new Date().getFullYear() }} —
          </span>
          Shadows: A CSS Box Shadow Generator
        </div>
      </div>
    </footer>
  </div>
</template>

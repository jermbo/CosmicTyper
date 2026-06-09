# CosmicTyper - Development Guide

## Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher (or yarn)
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/jermbo/CosmicTyper.git
cd CosmicTyper

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:7777
```

The development server includes hot module reloading (HMR), so changes reflect immediately in the browser.

## Development Workflow

### Project Structure

```
CosmicTyper/
├── src/                    # Source code
│   ├── components/        # Reusable Svelte components
│   ├── views/            # Page-level components
│   ├── store/            # State management
│   ├── types/            # TypeScript type definitions
│   ├── App.svelte        # Root component
│   └── main.js           # Entry point
│
├── public/               # Static assets
│   ├── index.html       # HTML template
│   └── [assets]         # Images, fonts, etc.
│
├── docs/                # Documentation
├── tests/               # Test files (post-modernization)
├── .eslintrc           # ESLint configuration
├── .prettierrc          # Prettier configuration
├── package.json        # Dependencies & scripts
├── rollup.config.js    # Build configuration
└── README.md           # Project README
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with watch mode
npm start               # Start production server

# Building
npm run build           # Build for production

# Linting & Formatting
npm run lint            # Check for lint errors
npm run format          # Auto-format code with Prettier

# Testing (post-modernization)
npm test                # Run unit tests
npm run test:watch      # Run tests in watch mode
npm run test:ui         # Run tests with UI
npm run test:coverage   # Generate coverage report

# E2E Testing (post-modernization)
npm run e2e             # Run E2E tests
npm run e2e:ui         # Run E2E tests with UI
```

## Editing Components

### Creating a New Component

1. **Create the file** in appropriate directory:

   ```
   src/components/MyComponent.svelte
   ```

2. **Basic component structure:**

   ```svelte
   <script lang="ts">
   	import type { SvelteComponentTyped } from 'svelte';

   	interface Props {
   		title: string;
   		onComplete?: (data: any) => void;
   	}

   	let { title, onComplete }: Props = $props();
   </script>

   <div class="component">
   	<h2>{title}</h2>
   	<slot />
   </div>

   <style>
   	.component {
   		padding: 1rem;
   	}
   </style>
   ```

3. **Export from index** (if in component subdirectory):

   ```typescript
   // src/components/index.ts
   export { default as MyComponent } from './MyComponent.svelte';
   ```

4. **Use in other components:**

   ```svelte
   <script>
   	import { MyComponent } from '../components';
   </script>

   <MyComponent title="Hello" />
   ```

### Modifying Stores

Stores are in `src/store/`. Example pattern:

```typescript
// src/store/my-store.ts
import { writable } from 'svelte/store';

interface MyState {
	items: string[];
	loading: boolean;
}

export const myStore = writable<MyState>({
	items: [],
	loading: false
});

export function addItem(item: string) {
	myStore.update((state) => ({
		...state,
		items: [...state.items, item]
	}));
}

export function setLoading(loading: boolean) {
	myStore.update((state) => ({
		...state,
		loading
	}));
}
```

### Using Stores in Components

```svelte
<script lang="ts">
	import { myStore, addItem } from '../store/my-store';
</script>

{#if $myStore.loading}
	<p>Loading...</p>
{:else}
	<ul>
		{#each $myStore.items as item}
			<li>{item}</li>
		{/each}
	</ul>
	<button onclick={() => addItem('New Item')}> Add Item </button>
{/if}
```

## Styling

### CSS Approach

- Global styles in `src/App.svelte`
- Component-scoped styles in `<style>` blocks
- CSS Framework: Bulma (CSS variables for theming)

### SCSS/SASS

Styles are processed through Sass. You can use SCSS syntax:

```svelte
<style lang="scss">
	.container {
		padding: 1rem;

		&.dark {
			background: #333;
			color: #fff;
		}
	}
</style>
```

### Class Binding

```svelte
<div class:active={isActive} class:disabled={isDisabled}>Content</div>
```

## API Integration

### HTTP Utilities

```typescript
// src/store/http-utils.ts
import axios from 'axios';

const API_BASE = process.env.API_URL || 'http://localhost:3000/api';

export async function fetchWebLessons() {
	try {
		const response = await axios.get(`${API_BASE}/lessons/web`);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch web lessons:', error);
		throw error;
	}
}

export async function fetchTypingLessons() {
	try {
		const response = await axios.get(`${API_BASE}/lessons/typing`);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch typing lessons:', error);
		throw error;
	}
}
```

### Environment Configuration

Create `.env.local` (not committed):

```
API_URL=http://localhost:3000/api
DEBUG=true
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const isDebug = import.meta.env.VITE_DEBUG === 'true';
```

## Testing

### Unit Testing Pattern

```typescript
// src/store/__tests__/my-store.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { myStore, addItem } from '../my-store';

describe('myStore', () => {
	beforeEach(() => {
		myStore.set({ items: [], loading: false });
	});

	it('adds items to the store', () => {
		addItem('test');

		let state;
		myStore.subscribe((s) => (state = s));

		expect(state.items).toContain('test');
	});
});
```

### Component Testing Pattern

```typescript
// src/components/__tests__/MyComponent.test.ts
import { render, screen, fireEvent } from '@testing-library/svelte';
import MyComponent from '../MyComponent.svelte';

describe('MyComponent', () => {
	it('renders with title prop', () => {
		render(MyComponent, { props: { title: 'Test Title' } });
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	it('calls onComplete when button clicked', async () => {
		const mockOnComplete = vi.fn();
		render(MyComponent, {
			props: {
				title: 'Test',
				onComplete: mockOnComplete
			}
		});

		const button = screen.getByRole('button');
		await fireEvent.click(button);

		expect(mockOnComplete).toHaveBeenCalled();
	});
});
```

## Debugging

### Browser DevTools

1. Open browser DevTools (F12)
2. Check Console for errors/logs
3. Use Svelte DevTools extension for store debugging
4. Use Performance tab for profiling

### VS Code Debugging

**Launch configuration** (.vscode/launch.json):

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "chrome",
			"request": "launch",
			"name": "Launch Chrome",
			"url": "http://localhost:7777",
			"webRoot": "${workspaceFolder}"
		}
	]
}
```

### Console Logging

```typescript
console.log('Info:', value);
console.warn('Warning:', value);
console.error('Error:', error);
console.table(arrayData);
console.time('label');
// ... code
console.timeEnd('label');
```

## Code Style

### ESLint

```bash
npm run lint              # Check
npm run lint -- --fix    # Auto-fix
```

### Prettier

```bash
npm run format            # Format all files
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.svelte`)
- **Functions**: camelCase (`addItem()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **Variables**: camelCase (`itemCount`)
- **Type/Interface**: PascalCase (`MyType`, `MyInterface`)
- **Files**: kebab-case for utilities (`http-utils.ts`)

### TypeScript Best Practices

- Always type function parameters and returns
- Use interfaces for objects with multiple properties
- Avoid `any` type (use `unknown` if necessary)
- Use strict mode: `"strict": true` in tsconfig.json

## Performance Tips

### Optimization Checklist

- [ ] Use keyed each blocks: `{#each items as item (item.id)}`
- [ ] Use reactive declarations for derived state: `$: derived = items.length`
- [ ] Lazy load heavy components
- [ ] Avoid inline functions in templates
- [ ] Use `onMount` for initialization
- [ ] Unsubscribe from stores properly

### Bundle Size

```bash
npm run build
# Check dist/ folder size
ls -lh dist/
```

## Troubleshooting

### Development Server Not Starting

```bash
# Kill any process on port 7777
lsof -i :7777
kill -9 <PID>

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Hot Reload Not Working

1. Check browser cache is disabled
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### TypeScript Errors

```bash
# Check TypeScript
npx svelte-check

# Clear TS cache
rm -rf .svelte-kit/
npm run dev
```

### Build Failures

```bash
# Clear rollup cache
rm -rf dist/

# Rebuild
npm run build
```

## Git Workflow

### Feature Branch

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push and create PR
git push origin feature/my-feature
```

### Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Tests
- `style:` - Formatting
- `chore:` - Dependencies, config

Example:

```
feat: add web lesson completion tracking

- Adds progress persistence to localStorage
- Updates lesson list with completion status
- Adds completion notification
```

## Documentation

### Updating Docs

All documentation is in `/docs` directory:

- `PROJECT_ANALYSIS.md` - Current state
- `ARCHITECTURE.md` - System design
- `MODERNIZATION_ROADMAP.md` - Upgrade plan
- `DEVELOPMENT.md` - This file
- `DEPLOYMENT.md` - Deployment procedures

### Code Comments

Only add comments for non-obvious logic:

```typescript
// Good
// Keyed by ID to prevent re-renders on reorder
const items = $derived(data.sort((a, b) => a.order - b.order));

// Bad
// Loop through items
for (const item of items) {
	// Process item
}
```

## Resources

### Official Docs

- [Svelte](https://svelte.dev)
- [Svelte Docs](https://svelte.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community

- [Discord](https://discord.gg/svelte)
- [GitHub Discussions](https://github.com/sveltejs/svelte/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/svelte)

### Tools

- [Svelte DevTools](https://chrome.google.com/webstore/detail/svelte-devtools/)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

## Contributing

When contributing:

1. Create feature branch from `main`
2. Follow code style guidelines
3. Write/update tests for changes
4. Update documentation
5. Create pull request with description
6. Ensure CI passes
7. Get review approval before merging

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines.

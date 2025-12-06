# 1. Adopt React 19 Async Patterns

Date: 2025-01-XX

## Status

Accepted

## Context

Building async UIs has always been difficult. Navigation hides content behind spinners, search boxes create race conditions as responses arrive out of order, and form submissions require manual state management for every loading flag and error message. Every async operation forces developers to orchestrate the coordination manually.

This isn't a performance problem; it's a coordination problem. React 19 introduces new primitives that solve async coordination declaratively:

- **`useTransition`**: Tracks pending async work automatically
- **`useOptimistic`**: Provides instant feedback during mutations
- **`Suspense`**: Handles loading boundaries declaratively
- **`useDeferredValue`**: Maintains stable UX during rapid updates
- **`use()`**: Makes data fetching declarative
- **Form Actions**: Automatic transition wrapping for form submissions
- **Error Boundaries**: Catch errors from transitions automatically

The UI Kit was using React 19.2.0, making these primitives available. However, components were still using imperative patterns:

- Manual debounce logic in `SearchForm`
- Manual loading states in `Table` mutations
- Manual error handling scattered across components
- No standardized async coordination

## Decision

We will adopt React 19's async coordination primitives throughout the UI Kit:

1. **Replace manual debounce with `useDeferredValue`** in `SearchForm`
   - Removes custom debounce implementation
   - React automatically coordinates updates
   - Input remains responsive while search happens in background

2. **Use `useTransition` and `useOptimistic`** in `Table` component
   - Instant UI updates for create/update/delete operations
   - Automatic pending state tracking
   - Better UX with optimistic updates

3. **Implement Form Actions** in `CreateNewItemModal`
   - Automatic transition wrapping
   - Built-in pending state handling
   - Less boilerplate code

4. **Create reusable async components**:
   - `ErrorBoundary` - Catches errors from transitions
   - `SuspenseFallback` - Standard loading component
   - `useAsyncData` - Utility for declarative data fetching
   - `TableWithSuspense` - Table wrapped with Suspense
   - `TableWithErrorBoundary` - Table wrapped with ErrorBoundary

5. **Maintain backward compatibility**
   - All changes are additive
   - Existing API remains unchanged
   - New components are optional wrappers

## Consequences

**Props**:

- **Less code**: React coordinates async operations automatically
- **Better UX**: Instant feedback through optimistic updates
- **Fewer bugs**: Automatic coordination prevents race conditions
- **Modern approach**: Using latest React capabilities
- **Consistent patterns**: Standardized async handling across components
- **Better developer experience**: Less boilerplate, more declarative code

**Cons**:

- **Learning curve**: Team needs to understand React 19 patterns
- **Migration effort**: Existing code using old patterns needs updating
- **Dependency**: Requires React 19+ (already satisfied)

### Implementation

**Components Updated**:

1. **SearchForm** (`src/ui/SearchForm/SearchForm.tsx`)
   - Replaced manual debounce with `useDeferredValue`
   - Added `useTransition` for submit actions
   - Shows pending state during transitions

2. **Table** (`src/ui/Table/Table.tsx`)
   - Added `useOptimistic` for instant UI updates
   - Wrapped mutations in `useTransition`
   - Automatic pending state tracking

3. **CreateNewItemModal** (`src/ui/Table/CreateNewItemModal/CreateNewItemModal.tsx`)
   - Implemented Form Actions API
   - Automatic transition wrapping
   - Built-in pending state

**New Components**:

1. **ErrorBoundary** (`src/ui/ErrorBoundary/ErrorBoundary.tsx`)
2. **SuspenseFallback** (`src/ui/SuspenseFallback/SuspenseFallback.tsx`)
3. **useAsyncData** (`src/utils/useAsyncData.ts`)
4. **TableWithSuspense** (`src/ui/Table/TableWithSuspense.tsx`)
5. **TableWithErrorBoundary** (`src/ui/Table/TableWithErrorBoundary.tsx`)

**Testing**:

- All new components have comprehensive tests
- Test coverage: 98.86%
- 68 tests, all passing

**Documentation**:

- README updated with React 19 section

### References

- [The next era of React - LogRocket](https://blog.logrocket.com/the-next-era-of-react/)
- [React 19 Documentation](https://react.dev)

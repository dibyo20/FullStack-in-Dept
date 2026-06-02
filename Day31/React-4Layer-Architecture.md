# Frontend Architecture- 4-Layer Model

```
    UI (Presentation Layer)
        ⬇️
    Hooks(Logic Layer)
        ⬇️
    State (Memory Layer)
        ⬇️
    API (Data Layer)
```

## 1) UI (Presentation Layer):- 

    **Responsibility**

    - Render UI
    - Handle form input
    - Trigger actions (`onClick`, `onSubmit`, etc.)
    - Display loading and error states
    - Navigate between routes

    **UI must NOT**

    - Call API directly
    - Access cookies/localStorage
    - Parse tokens
    - Manage global state directly
    - Contain business logic
    - Know backend response structure

## 2) Hooks (Logic Layer):-

    **Responsibility**

    - Recieve intent from UI ("user wants to login")
    - Call the right API function
    - Take the API response and update State
    - Handle loading/error transitions
    - Return a simple interface to the UI (`{ handleLogin, handleRegister, loading, error }`)

    **Hooks must NOT**
    - Render any UI
    - Directly manipulate DOM
    - Contain infrastructure logic (like axios instance setup)
    - Store data themselves - they write into State, not into local variables that persist

## 3) State (Memory Layer):-

    **Responsibility**
    - Hold shared data (`user`, `posts`, etc.)
    - Provide derived/computed values (`isAuthenticated = !!user`)
    - Expose setter functions (`setUser`, `setLoading`, `setError`)
    - Trigger re-renders when data changes

    **State must NOT**
    - Call API functions directly
    - Navigate routes
    - Render UI(it provides a `<Provider>`, but doesn't render any actual UI components)
    - Show alerts/toasts
    - Contain `async` functions or `try/catch` blocks
    - Handle cookies/localStorage directly

## 4) API (Data Layer):-

    **Responsibility**
    - Communicate with backend
    - Send HTTP requests
    - Normalize API responses
    - Normalize API errors

    **API Layer must NOT**
    - Update React State directly
    - Navigate routes
    - Show UI errors
    - Access React hooks
    - Render anything


## If UI talks directly to axios:

    - Every component knows backend structure
    - Backend changes break many files
    - Error handling becomes duplicated

## Common Architecture Mistakes:

    - UI calling API directly
    - API updating React state
    - State handling navigation
    - Hooks manipulating cookies directly
    - Business rules inside components

Every violation increases coupling.
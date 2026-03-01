# Architectural Patterns

## 1. Two-Step Workflow Pattern

Both test types (OMC/MDD and Sieve) follow the same page sequence:

```
Login → Home → Client form (creates sample ID)
             → Test data entry (uses sample ID)
             → Search (lookup by sample ID)
             → Report (display + QR code)
```

Navigation state (sample ID, client info) is passed between steps via React Router's `useLocation` state — not a shared store. Example: `Client.js` POSTs to backend, receives a sample ID, then calls `navigate('/mdd', { state: { sampleId } })`.

## 2. Context API for Auth Only

`frontend/src/context/AppContext.js` exports a single context with `{ user, setUser }`. This is the only global state in the app. All other state is local to components or passed via router state. There is no Redux, Zustand, or similar library.

## 3. Formik + Yup for All Forms

All data-entry pages (Client.js, ClientSe.js, MDD.js, Seive.js) use Formik for form state and Yup schemas for validation. The pattern is:

```js
const validationSchema = Yup.object({ ... });
<Formik initialValues={...} validationSchema={validationSchema} onSubmit={handleSubmit}>
```

Formik-MUI bindings (`formik-material-ui`) are used so MUI `TextField` components receive error/touched state automatically.

## 4. Direct `fetch()` for API Calls

No Axios or HTTP client abstraction layer is used in the frontend despite Axios being installed. All API calls use the native `fetch()` API with `credentials: 'include'` (to send cookies). The backend URL `http://localhost:3001` is repeated inline in every page file.

## 5. Backend: Single-File Express Monolith

All backend logic lives in `backend/server.js`: route definitions, MySQL queries, JWT middleware, QR code generation. There is no controller/service/repository separation. Route handlers call `connection.query()` directly with string-concatenated SQL (no prepared statements or ORM).

## 6. JWT in httpOnly Cookies

Authentication flow (`server.js`):
1. `POST /login` validates credentials, signs a JWT, sets it as an httpOnly cookie
2. `GET /me` verifies the cookie JWT to restore session on page reload
3. Frontend stores user data in `AppContext` after `/me` resolves
4. Protected routes check `req.cookies.token` inline (no shared auth middleware)

## 7. IS383.json Cascading Data

`frontend/src/IS383.json` encodes Indian Standard 383 sieve classifications as nested JSON: `testType → sampleSize → sieveSize → { min, max }`. The Sieve Analysis pages use this to populate cascading dropdowns and validate grading results client-side without an API call.

## 8. QR Code Generation as Side Effect

When a report is generated (`POST /report`, `POST /reportSe` in `server.js`), the backend generates a QR code PNG as a side effect and writes it to `../frontend/src/qrcode.png`. The frontend then reads this static file directly. This couples the backend to the frontend's file structure.

## 9. Toast Notifications as User Feedback

All success/error feedback uses `react-toastify`. The `<ToastContainer>` is mounted once in `App.js` and individual pages call `toast.success(...)` / `toast.error(...)` after API responses. There is no dedicated notification store.

## 10. Mixed UI Library Usage

Both MUI (`@mui/material`) and React Bootstrap (`react-bootstrap`) are used across the codebase. MUI is favored for form inputs and modals; Bootstrap is used for layout (Grid, Container, Row/Col). There is no convention enforcing which to use — check the existing component in a file before adding new UI elements.

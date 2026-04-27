const NotFound = () => (<div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "hsl(var(--muted))" }}>
    <div className="text-center">
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>404</h1>
      <p className="muted-text mb-4" style={{ fontSize: "1.25rem" }}>Oops! Page not found</p>
      <a href="/" style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}>Return to Home</a>
    </div>
  </div>);
export default NotFound;

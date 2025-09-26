export default function DashboardLayout({ children }) {
  return (
    <div>
      {/* <aside style={{ width: 200, background: "#eee" }}>Sidebar</aside> */}
      <main>{children}</main>
    </div>
  );
}

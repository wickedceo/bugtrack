import { useMemo, useState } from "react";
import "./App.css";

type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "Open" | "In Progress" | "Resolved" | "Closed";

type Bug = {
  id: number;
  title: string;
  project: string;
  severity: Severity;
  status: Status;
  reporter: string;
  date: string;
};

const initialBugs: Bug[] = [
  { id: 1001, title: "Login button does not respond", project: "Web App", severity: "Critical", status: "Open", reporter: "Samuel", date: "2026-11-08" },
  { id: 1002, title: "Dashboard layout breaks on mobile", project: "Dashboard", severity: "High", status: "In Progress", reporter: "Samuel", date: "2026-11-07" },
  { id: 1003, title: "Profile image fails to load", project: "User Profile", severity: "Medium", status: "Open", reporter: "Alex", date: "2026-11-06" },
  { id: 1004, title: "Incorrect success notification", project: "Web App", severity: "Low", status: "Resolved", reporter: "Jordan", date: "2026-11-05" },
  { id: 1005, title: "Password reset link expires early", project: "Authentication", severity: "High", status: "In Progress", reporter: "Samuel", date: "2026-11-04" },
];

function App() {
  const [bugs, setBugs] = useState<Bug[]>(initialBugs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

  const [form, setForm] = useState({
    title: "",
    project: "",
    severity: "Medium" as Severity,
    reporter: "Samuel",
  });

  const filteredBugs = useMemo(() => {
    return bugs.filter((bug) => {
      const matchesSearch =
        `${bug.title} ${bug.project} ${bug.reporter}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || bug.status === statusFilter;

      const matchesSeverity =
        severityFilter === "All" || bug.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [bugs, search, statusFilter, severityFilter]);

  const stats = [
    { label: "Total reports", value: bugs.length, icon: "▤", color: "purple" },
    { label: "Open bugs", value: bugs.filter(b => b.status === "Open").length, icon: "◉", color: "orange" },
    { label: "In progress", value: bugs.filter(b => b.status === "In Progress").length, icon: "◷", color: "blue" },
    { label: "Resolved", value: bugs.filter(b => b.status === "Resolved" || b.status === "Closed").length, icon: "✓", color: "green" },
  ];

  function createBug(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newBug: Bug = {
      id: Math.max(1000, ...bugs.map(b => b.id)) + 1,
      title: form.title.trim(),
      project: form.project.trim(),
      severity: form.severity,
      status: "Open",
      reporter: form.reporter.trim() || "Samuel",
      date: new Date().toISOString().slice(0, 10),
    };

    setBugs(previous => [newBug, ...previous]);
    setForm({ title: "", project: "", severity: "Medium", reporter: "Samuel" });
    setShowForm(false);
  }

  function changeStatus(id: number, status: Status) {
    setBugs(previous =>
      previous.map(bug => bug.id === id ? { ...bug, status } : bug)
    );
    setSelectedBug(null);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">B</span>
          <span>bugtrack<span className="brand-dot">.</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace">
          <span className="workspace-icon">W</span>
          <span><strong>Wicked Studio</strong><small>Personal workspace</small></span>
          <span className="chevron">⌄</span>
        </div>

        <div className="nav-label">MENU</div>
        <nav>
          <a className="nav-item active" href="#dashboard"><span>▦</span> Overview</a>
          <a className="nav-item" href="#reports"><span>▤</span> Bug reports <span className="nav-count">{bugs.length}</span></a>
          <a className="nav-item" href="#reports"><span>◷</span> Activity</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>
            <strong>Need a hand?</strong>
            <p>Keep your projects running smoothly.</p>
            <a href="mailto:support@example.com">Contact support ↗</a>
          </div>
          <div className="user-profile">
            <div className="avatar">US</div>
            <div><strong>Ugoeke Samuel</strong><small>Administrator</small></div>
            <span className="chevron">···</span>
          </div>
        </div>
      </aside>

      <section className="main-area" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Overview</div>
          <div className="top-actions">
            <span className="live-indicator"><i /> All systems operational</span>
            <button className="icon-button" aria-label="Notifications">♧</button>
            <div className="avatar small-avatar">US</div>
          </div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">MONDAY, NOVEMBER 9, 2026</div>
              <h1>Good to see you, Samuel <span>✦</span></h1>
              <p>Here's what's happening with your bug reports today.</p>
            </div>
            <button className="primary-button" onClick={() => setShowForm(true)}>
              <span>＋</span> New bug report
            </button>
          </section>

          <section className="stats-grid">
            {stats.map(stat => (
              <article className="stat-card" key={stat.label}>
                <div className="stat-top">
                  <span>{stat.label}</span>
                  <span className={`stat-icon ${stat.color}`}>{stat.icon}</span>
                </div>
                <div className="stat-number">{stat.value.toString().padStart(2, "0")}</div>
                <div className="stat-foot">Current workspace</div>
              </article>
            ))}
          </section>

          <section className="reports-panel" id="reports">
            <div className="panel-heading">
              <div>
                <h2>Bug reports</h2>
                <p>Track, prioritise and resolve reported issues.</p>
              </div>
              <span className="report-total">{filteredBugs.length} reports</span>
            </div>

            <div className="toolbar">
              <div className="search-box">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search bug reports..."
                  aria-label="Search bug reports"
                />
              </div>

              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status">
                <option value="All">All statuses</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>

              <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} aria-label="Filter by severity">
                <option value="All">All priorities</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>BUG DETAILS</th>
                    <th>SEVERITY</th>
                    <th>STATUS</th>
                    <th>REPORTER</th>
                    <th>DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBugs.map(bug => (
                    <tr key={bug.id} onClick={() => setSelectedBug(bug)}>
                      <td>
                        <div className="bug-title">{bug.title}</div>
                        <div className="bug-project">#{bug.id} · {bug.project}</div>
                      </td>
                      <td><span className={`pill severity-${bug.severity.toLowerCase()}`}>{bug.severity}</span></td>
                      <td><span className={`pill status-${bug.status.toLowerCase().replace(" ", "-")}`}>{bug.status}</span></td>
                      <td><span className="reporter-avatar">{bug.reporter.slice(0, 1)}</span>{bug.reporter}</td>
                      <td className="date-cell">{bug.date}</td>
                      <td><button className="more-button" aria-label={`View ${bug.title}`}>···</button></td>
                    </tr>
                  ))}
                  {filteredBugs.length === 0 && (
                    <tr><td colSpan={6} className="empty-state">No matching bug reports. Try changing your search or filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer">Showing {filteredBugs.length} of {bugs.length} reports</div>
          </section>

          <footer className="footer">BUGTRACK <span>·</span> BUILT TO MAKE BETTER SOFTWARE.</footer>
        </div>
      </section>

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <form className="modal" onSubmit={createBug} onClick={e => e.stopPropagation()}>
            <div className="modal-heading">
              <div><div className="eyebrow">NEW ISSUE</div><h2>Report a bug</h2></div>
              <button type="button" className="close-button" onClick={() => setShowForm(false)}>×</button>
            </div>
            <label>Bug title<input required maxLength={100} placeholder="What went wrong?" value={form.title} onChange={e => setForm({...form, title: e.target.value})}/></label>
            <label>Project / area<input required maxLength={60} placeholder="e.g. Authentication" value={form.project} onChange={e => setForm({...form, project: e.target.value})}/></label>
            <label>Severity<select value={form.severity} onChange={e => setForm({...form, severity: e.target.value as Severity})}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label>
            <label>Reporter<input maxLength={40} value={form.reporter} onChange={e => setForm({...form, reporter: e.target.value})}/></label>
            <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-button">Create report ↗</button></div>
          </form>
        </div>
      )}

      {selectedBug && (
        <div className="modal-backdrop" onClick={() => setSelectedBug(null)}>
          <section className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-heading">
              <div><div className="eyebrow">BUG #{selectedBug.id}</div><h2>{selectedBug.title}</h2></div>
              <button className="close-button" onClick={() => setSelectedBug(null)}>×</button>
            </div>
            <p className="detail-project">Project: {selectedBug.project}</p>
            <p>Reported by {selectedBug.reporter} on {selectedBug.date}.</p>
            <p>Severity: <strong>{selectedBug.severity}</strong></p>
            <label>Update status
              <select value={selectedBug.status} onChange={e => changeStatus(selectedBug.id, e.target.value as Status)}>
                <option>Open</option><option>In Progress</option><option>Resolved</option><option>Closed</option>
              </select>
            </label>
            <div className="modal-actions"><button className="secondary-button" onClick={() => setSelectedBug(null)}>Close</button></div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;